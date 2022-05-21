@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
            <div class="card rounded">
                <div class="card-header">
                    <h3 id="movie_name" class="text-center"></h3>
                </div>
                <div class="card-body">
                    <div class="col-lg-10 col-md-12 mx-auto my-3" id="movie_image"></div>
                    <div class="col-12 text-justify p-3" id="details">
                        <table class="table table-striped">
                            <tr>
                                <th scope="row">Release Date</th>
                                <td id="movie_rel_date"></td>
                            </tr>
                            <tr>
                                <th scop="row">Rating</th>
                                <td id="movie_rating"></td>
                            </tr>
                            <tr>
                                <th scope="row">Ticket Price</th>
                                <td id="movie_ticket_price"></td>
                            </tr>
                            <tr>
                                <th scope="country">Country</th>
                                <td id="movie_country"></td>
                            </tr>
                            <tr>
                                <th scope="row">Genre</th>
                                <td id="movie_genre"></td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td id="movie_description"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="movie_slug" style="display: none">{{$slug}}</div>
@endsection