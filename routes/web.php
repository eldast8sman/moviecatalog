<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function(){
    return redirect('/movies');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/movies', [App\Http\Controllers\PageController::class, 'index'])->name('movies');
Route::get('/movies/my-movies', [App\Http\Controllers\HomeController::class, 'my_movies']);
Route::get('/movies/create', [App\Http\Controllers\HomeController::class, 'create_movie'])->name('create_movie');
Route::get('/movie/{slug}', [App\Http\Controllers\PageController::class, 'single_movie'])->name('singleMovie');