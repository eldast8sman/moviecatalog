<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'movie_id' => 'required|exists:\App\Models\Movies,id',
            'user_id' => 'required|exists:\App\Models\User,id',
            'name' => 'required|string|max:1000',
            'comment' => 'required'
        ];
    }
}
