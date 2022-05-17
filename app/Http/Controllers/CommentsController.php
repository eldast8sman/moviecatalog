<?php

namespace App\Http\Controllers;

use App\Models\Movies;
use App\Models\Comments;
use Illuminate\Http\Request;
use App\Http\Resources\CommentsResource;
use App\Http\Requests\StoreCommentsRequest;
use App\Http\Requests\UpdateCommentsRequest;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreCommentsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCommentsRequest $request)
    {
        $data = $request->validated();
        $result = Comments::create($data);
        return new CommentsResource($result);
    }

    public function byMovie(Request $request, $movie_id)
    {
        return CommentsResource::collection(Comments::where('movie_id', $movie_id)->paginate());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function show(Comments $comments, $id)
    {
        $comment = Comments::find($id);
        if($comment){
            return new CommentsResource($comment);
        } else {
            return response("No Comment was found", 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function edit(Comments $comments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCommentsRequest  $request
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCommentsRequest $request, $comment_id)
    {
        $comment = Comments::find($comment_id);
        if($comment){
            $data = $request->validated();
            $comment->comment = $request->comment;
            $comment->save();
            return new CommentsResource($comment);
        } else {
            return response("No Comment was found", 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = Comments::find($id);
        if($comment){
            $comment->delete();
            return new CommentsResource($comment);
        } else {
            return response("Comment Not found", 404);
        }
    }
}
