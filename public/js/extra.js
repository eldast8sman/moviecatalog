const BASE_URL = "http://127.0.0.1:8000/";
const API_URL = BASE_URL+"api/";

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content'),
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
    }
});

function number_format (number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

if($("#all_movies").length){
    $.ajax({
        type: "GET",
        url: API_URL+"movies",
        data: "",
        success: function(data){
            if(data.data.length >= 1){
                var output = ''
                $.each(data.data, function(key, val){
                    output += '<div class="col-lg-3 col-md-6 col-sm-12 mb-3">';
                    output +=       '<div class="card">';
                    output +=           '<div class="card-header"><h4 class="card-title">'+val.name+'</h4></div>';
                    output +=           '<div class="card-body">';
                    output +=               '<div class="col-12" style="height: 300px; background-image: url('+BASE_URL+val.photo+'); background-repeat: no-repeat; background-position: top center; background-size: cover"></div>';
                    output +=               '<div class="col-12" style="height=: 350px; overflow: auto">';
                    output +=                   '<p class="m-2 text-center"><strong>Release Date: </strong>'+val.release_date+'</p>';
                    output +=                   '<p class="m-2"><a href="movie/'+val.slug+'" class="btn btn-success btn-lg btn-block">More Details</a></p>'
                    output +=               '</div>';
                    output +=           '</div>';
                    output +=       '</div>';
                    output += '</div>'
                })
                $("#all_movies").html(output);
            } else {
                $("#all_movies").html('<p class="text-danger text-center">No Movie Data has been uploaded yet</p>');
            }
        },
        error: function(data){
            console.log(data.responseText);
        }
    })
}

if($("#my_movies").length){
    var user_id = $("div#user-id").text();
    $.ajax({
        type: "GET",
        url: API_URL+"movies/by-user/"+user_id,
        data: "",
        success: function(data){
            if(data.data.length >= 1){
                var output = ''
                $.each(data.data, function(key, val){
                    output += '<div class="col-lg-3 col-md-6 col-sm-12 mb-3">';
                    output +=       '<div class="card">';
                    output +=           '<div class="card-header"><h4 class="card-title">'+val.name+'</h4></div>';
                    output +=           '<div class="card-body">';
                    output +=               '<div class="col-12" style="height: 300px; background-image: url('+BASE_URL+val.photo+'); background-repeat: no-repeat; background-position: top center; background-size: cover"></div>';
                    output +=               '<div class="col-12" style="height=: 350px; overflow: auto">';
                    output +=                   '<p class="m-2 text-center"><strong>Release Date: </strong>'+val.release_date+'</p>';
                    output +=                   '<p class="m-2"><a href="'+BASE_URL+'movie/'+val.slug+'" class="btn btn-success btn-lg btn-block">More Details</a></p>'
                    output +=               '</div>';
                    output +=           '</div>';
                    output +=       '</div>';
                    output += '</div>'
                })
                $("#my_movies").html(output);
            } else {
                $("#all_movies").html('<p class="text-danger text-center">No Movie Data has been uploaded yet</p>');
            }
        },
        error: function(data){
            console.log(data.responseText);
        }
    })
}

if($("#movie_slug").length){
    var slug = $("div#movie_slug").text();
    $.ajax({
        type: "GET",
        url: API_URL+"movies/"+slug,
        data: "json",
        success: function(response){
            var movie = response.data;
            $("h3#movie_name").html(movie.name);
            var img = '<img src="'+BASE_URL+movie.photo+'" alt="'+movie.name+'" style="width:100%; height:auto; margin:0 auto">'
            $("div#movie_image").html(img);
            $("td#movie_rel_date").html(movie.release_date);
            $("td#movie_rating").html(movie.rating+'/5');
            var formatted = number_format (movie.ticket_price, '2', '.', ',');
            $("td#movie_ticket_price").html(formatted);
            $("td#movie_country").html(movie.country);
            $("td#movie_genre").html(movie.genre);
            $("td#movie_description").html(movie.description);
            $("input#comments_movies_id").val(movie.id);

            if(movie.comments.length > 0){
                var comments = movie.comments;
                var movieComments = ""
                $.each(comments, function(key, comment){
                    movieComments += '<p class="mb-4">';
                    movieComments +=    comment.comment+'<br />';
                    movieComments +=    '<strong>'+comment.name+'</strong> at <i>'+comment.created_at+'</i>';
                    movieComments += '</p>'
                });
                $("div#all_comments").html(movieComments);
            }

            $("button#comments_submit").on("click", function(){
                $("button#comments_submit").html('Submitting...');
                $(".errormsg").remove();
                var movies_id = $("input#comments_movies_id").val();
                var user_id = $("input#comments_user_id").val();
                var name = $("inpt#comments_name");
                var comments = $("textarea#comments_comment");

                if((movies_id != "") && (user_id != "") && (name.val() != "") && (comments.val() != "")){
                    var fd = new FormData(document.querySelector("#add_comment"));

                    $.ajax({
                        type: "POST",
                        url: API_URL+"comments",
                        data: fd,
                        dataType: "json",
                        processData: false,
                        contentType: false,
                        success: function(response){
                            $("button#comments_submit").html('Add Comment');
                            alert('Comment Added');
                            comments.empty();
                            var data = response.data;
                            var output = '<p class="mb-4">';
                            output +=       data.comment+'<br />';
                            output +=       '<strong>'+data.name+'</strong> at <i>'+data.created_at+'</i>';
                            output +=    '</p>';
                            $("div#all_comments").append(output);
                        },
                        error: function(data){
                            console.log(data.responseText);
                            alert("Comment was not Saved");
                        }
                    })
                } else {
                    if(movies_id == ""){
                        $("button#comments_submit").after('<div class="errormsg text-danger">The Movie is not loaded yet</div>')
                    }
                    if(user_id == ""){
                        $("button#comments_submit").after('<div class="errormsg text-danger">The User Details not loaded</div>');
                    }
                    if(name.val() == ""){
                        $(name).after('<div class="errormsg text-danger">Your Name has to be provided</div>');
                    }
                    if(comments.val() == ""){
                        $(comments).after('<div class="errormsg text-danger">You CANNOT drop an empty comment</div>');
                    }
                    return false;
                }
            });
        },
        error: function(data){
            //alert("This Movie does not exist in our Database");
            console.log(data.responseText);
        }
    })
}

$("#movie_submit").on("click", function(){
    $(".errormsg").remove();
    var name = $("input#name");
    var description = $("textarea#description");
    var release_date = $("input#release_date");
    var rating = $("select#rating");
    var ticket_price = $("input#ticket_price");
    var country = $("input#country");
    var genre = $("textarea#genre");
    var files = $('#fileupload')[0].files;
    
    if((name.val() != "") && (description.val() != "") && (release_date.val() != "")
    && (rating.val() != "") && (ticket_price.val() != "") && (country.val() != "")
    && (genre.val() != "")  && (files.length > 0)){
       
        var file = files[0];
        if((file.type == "image/png") || (file.type == "image/jpeg") || (file.type == "image/jpg")){
            if(file.size <= 204800){
                $("button#movie_submit").html("Uploading...");
                
                var fd = new FormData(document.querySelector("#create_movie"));

                $.ajax({
                    type: "POST",
                    url: API_URL+"movies",
                    data: fd,
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    success: function(response){
                        if(response.data){
                            alert("Upload successful");
                            window.location = BASE_URL+"movies/my-movies";
                        } else {
                            alert(response.error);
                        }
                    },
                    error: function(data){
                        console.log(data.responseText);
                    }
                })
                return false;
            } else {
                $("button#movie_submit").after('<div class="errormsg text-danger">Uploaded File must not be more than 200KB</div>');
            }
        } else {
            $("button#movie_submit").after('<div class="errormsg text-danger">Wrong File Format</div>');
        }
    } else {
        if(name.val() == ""){
            name.after('<div class="text-danger errormsg">Please drop the Name of the Movie</div>');
        }
        if(description.val() == ""){
            description.after('<div class="text-danger errormsg">Please drop a description of the Movie</div>');
        }
        if(release_date.val() == ""){
            release_date.after('<div class="errormsg text-danger">The Movie must have a release date</div>');
        }
        if(rating.val() == ""){
            rating.after('<div class="text-danger errormsg">You just select a rating for the Movie</div>');
        }
        if(ticket_price.val() == ""){
            ticket_price.after('<div class="errormsg text-danger">The Ticket Price must be given</div>');
        }
        if(country.val() == ""){
            country.after('<div class="errormsg text-danger">The Country must be provided</div>');
        }
        if(genre.val() == ""){
            genre.after('<div class="errormsg text-danger">The Movie Genre must be provided</div>');
        }
        if(files.length < 1){
            $("input#fileupload").after('<div class="errormsg text-danger">Please upload a Photo for the Movie</div>')
        }
        $("button#movie_submit").after('<div class="errormsg text-danger">You must fill all fields</div>');
    }
    return false;
})