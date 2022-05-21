<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'movies_id', 'name', 'comment'];

    public function movie(){
        return $this->belongsTo(Movies::class);
    }
}
