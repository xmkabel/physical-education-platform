<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RatingExam extends Model
{
     protected $fillable = [
        'user_id',
        'exam_no',
        'score'
     ];
     public function user(){
        return $this->belongsTo(User::class);
     }
}
