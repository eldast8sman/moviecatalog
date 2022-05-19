@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Add Movie</div>

                <div class="card-body">
                    <form id="create_movie" method="POST" id="create_movie" enctype="multipart/form-data" onSubmit="return false">
                        <input type="hidden" name="user_id" value="{{Auth::user()->id}}">
                        <p>
                            <input type="text" name="name" id="name" class="form-control" placeholder="Movie Name" autofocus required>
                        </p>
                        <p>
                            <textarea name="description" id="description" class="form-control" rows="5" placeholder="Movie Description" required></textarea>
                        </p>
                        <p>
                            <label for="release_date">Release Date</label>
                            <input type="date" name="release_date" id="release_date" class="form-control" required>
                        </p>
                        <p>
                            <select class="form-control" name="rating" id="rating" required>
                                <option value="">--Rating--</option>
                                @for($i=1; $i<=5; $i++)
                                    <option value="{{$i}}">{{$i}}</option>
                                @endfor
                            </select>
                        </p>
                        <p>
                            <input type="text" name="ticket_price" id="ticket_price" class="form-control" placeholder="Ticket Price" required>
                        </p>
                        <p>
                            <input type="text" name="country" id="country" class="form-control" placeholder="Country" required>
                        </p>
                        <p>
                            <textarea name="genre" class="form-control" id="genre" placeholder="Genre" required></textarea>
                        </p>
                        <p>
                            <input type="file" name="photo" accept="image/jpg, image/jpeg, image/png" required class="form-control" id="fileupload">
                        </p>
                        <p class="col-lg-6 col-md-9 col-sm-12">
                            <button class="btn btn-primary" type="submit" id="movie_submit">Submit</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection