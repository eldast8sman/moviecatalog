<?php

namespace App\Http\Controllers;

use App\Models\Movies;
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
        $data = $request->validated();
        $result = Movies::create($data);
        return new MoviesResource($result);
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
