<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\CommentsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('movies', [MoviesController::class, 'index']);
Route::post('movies', [MoviesController::class, 'store']);
Route::get('movies/{slug}', [MoviesController::class, 'show']);
Route::put('movies/{id}', [MoviesController::class, 'update']);
Route::delete('movies/{id}', [MoviesController::class, 'destroy']);
Route::post('comments', [CommentsController::class, 'store']);
Route::get('comments/{id}', [CommentsController::class, 'show']);
Route::get('comments/by-movie/{movie}', [CommentsController::class, 'byMovie']);
Route::put('comments/{id}', [CommentsController::class, 'update']);
Route::delete('comments/{comment}', [CommentsController::class, 'destroy']);
