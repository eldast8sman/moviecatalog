<?php

namespace App\Http\Controllers;

use App\Models\Movies;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use App\Http\Resources\MoviesResource;
use App\Http\Requests\StoreMoviesRequest;
use App\Http\Requests\UpdateMoviesRequest;

class MoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MoviesResource::collection(Movies::paginate());
    }

    public function myMovies(Movies $movies, $id){
        $movie = MoviesResource::collection(Movies::where('user_id', $id)->paginate());
        return $movie;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMoviesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMoviesRequest $request)
    {
        $all = $request->all();
        $image = $all['photo'];
        unset($all['photo']);
        if($image instanceof UploadedFile){
            $filename = Str::random()."_".$image->getClientOriginalName();
            $image->move(public_path('img'), $filename);
            $all['photo'] = ('img/'.$filename);
            $movie = Movies::create($all);
            return new MoviesResource($movie);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movies  $movies
     * @return \Illuminate\Http\Response
     */
    public function show(Movies $movies, $slug)
    {
        $movie = Movies::where('slug', $slug)->first();
        return new MoviesResource($movie);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Movies  $movies
     * @return \Illuminate\Http\Response
     */
    public function edit(Movies $movies)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMoviesRequest  $request
     * @param  \App\Models\Movies  $movies
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMoviesRequest $request, $id)
    {
        $movie = Movies::find($id);
        if($movie){
            $movie->update($request->all());
            return new MoviesResource($movie);
        } else {
            return response("Movie Not found", 404);
        }
        //$movies->update($request->all());
        //return new MoviesResource($movies);
        //return response($request->all(), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movies  $movies
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $movie = Movies::find($id);
        if($movie){
            $movie->delete();
            return new MoviesResource($movie);
        } else {
            return response("Movie Not found", 404);
        }
    }
}
