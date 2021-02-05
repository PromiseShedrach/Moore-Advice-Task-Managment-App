<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'name', 'user_id'
    ];


    
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucfirst($value);
    }

    
}
