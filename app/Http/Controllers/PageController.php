<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(){
        return view('movies');
    }

    public function single_movie($slug){
        return view('single_movie', ['slug' => $slug]);
    }
}
