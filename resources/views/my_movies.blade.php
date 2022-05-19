@extends('layouts.app')

@section('content')
<div class="container">
    <div class="" id="user-id" style="display: none">{{Auth::user()->id}}</div>
    <div class="row justify-content-center" id="my_movies">
    
    </div>
</div>
@endsection