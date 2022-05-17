$ = jQuery;

const BASE_URL = "http://127.0.0.1:8000/";
const API_URL = BASE_URL+"api/";

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

if($("#movies")){
    $.ajax({
        type: "GET",
        url: API_URL+"movies",
        data: "",
        success: function(data){
            if(data.data.length >= 1){
                const output = ''
                $.each(data.data, function(key, val){
                    output += '<div class="col-lg-3 col-md-6 col-sm-12">';
                    output +=       '<div class="card">';
                    output +=           '<div class="card-header"><h4 class="card-title">'+val.name+'</h4></div>';
                    output +=           '<div class="card-body">';
                    output +=               '<div class="col-12" style="height: 300px; background-image('+BASE_URL+'img/'+val.photo+'); background-repeat: no-repeat; background-position: top-center; background-size: cover"></div>';
                    output +=               '<div class="col-12" style="height=: 350px; overflow: auto">';
                    output +=                   '<p class="m-2 text-center"><strong>Release Date: </strong>'+val.release_date+'</p>';
                    output +=                   '<p class="m-2"><a href="movie/'+val.slug+'" class="btn btn-success btn-lg btn-block">More Details</a></p>'
                    output +=               '</div>';
                    output +=           '</div>';
                    output +=       '</div>';
                    output += '</div>'
                })
            } else {
                $("#movies").html('<p class="text-danger text-center">No Movie Data has been uploaded yet</p>');
            }
        },
        error: function(data){
            console.log(data.responseText);
        }
    })
}