<?php

namespace App\Models;

use Spatie\Sluggable\HasSlug;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Sluggable\SlugOptions;

class Movies extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = ['user_id', 'name', 'slug', 'description', 'release_date', 'rating', 'ticket_price', 'country', 'genre', 'photo'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }
}
