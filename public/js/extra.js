const BASE_URL = "http://127.0.0.1:8000/";
const API_URL = BASE_URL+"api/";

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content'),
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
    }
});

if($("#all_movies").length){
    $.ajax({
        type: "GET",
        url: API_URL+"movies",
        data: "",
        success: function(data){
            if(data.data.length >= 1){
                var output = ''
                $.each(data.data, function(key, val){
                    output += '<div class="col-lg-3 col-md-6 col-sm-12">';
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
                    output += '<div class="col-lg-3 col-md-6 col-sm-12">';
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

$("#movie_submit").on("click", function(){
    //preventDefault(e);
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
                            window.location = BASE_URL+"my-movies";
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

/*function beforeSubmitMovie(){
    $(".errormsg").remove();
    $(".outcome").remove();

    var name = $("input#name");
    var description = $("textarea#description");
    var release_date = $("input#release_date");
    var rating = $("select#rating");
    var ticket_price = $("input#ticket_price");
    var country = $("input#country");
    var genre = $("textarea#genre");

    if((name.val() == "") || (description.val() == "") || (release_date.val() == "")
    || (rating.val() == "") || (ticket_price.val() == "") || (country.val() == "")
    || (genre.val() == "")){
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
        return false;
    }

    if($("input#fileupload").val() != ""){
        var file = document.getElementById("fileupload").files[0];
        
        if((file.type != "image/png") && (file.type != "image/jpeg") && (file.type != "image/jpg")) {
            $("input#fileupload").after('<div class="errormsg">Wrong File Format <br />The File must be in JPEG, JPG or PNG format</div>');
            
            return false;
        }	
    }
}
    
    function onProgressMovie(event,position,total,percentComplete){
        $("button#movie_submit").html("Uploading at "+percentComplete+"%");
    }

    function afterSuccessMovie(response){
        console.log(response);
    }

    function errorMovie(data){
        var result = "oopsie"+data.status+" "+data.statusType+" "+data.responseText;
		console.log(result);
    }

    $("form#create_movie").trigger("submit", function(){
        preventDefault();
        $(this).ajaxSubmit({
            beforeSubmit: beforeSubmitMovie,
            uploadProgress: onProgressMovie,
            dataType: "json",
            success: afterSuccessMovie,
            error: errorMovie,
            resetForm: false
        });
        return false;
        console.log("submitted");
        return false;
    });*/
