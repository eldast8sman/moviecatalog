$ = jQuery;

const BASE_URL = "http://127.0.0.1:8000/api/";

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
        url: BASE_URL+"movies",
        data: "",
        success: function(data){
            console.log(data);
        },
        error: function(data){
            console.log(data.responseText);
        }
    })
}