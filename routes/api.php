<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChapterExamController;
use App\Http\Controllers\Api\RatingExamController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('jwt-auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/rating-exams',[RatingExamController::class, 'results'])->middleware('role:admin');
    Route::get('/user-rating-exams',[RatingExamController::class, 'user_results']);
    Route::post('/chapter-exams',[ChapterExamController::class, 'store']);
    Route::get('/chapter-exams',[ChapterExamController::class, 'results'])->middleware('role:admin');
    Route::get("/chapter-exams/is-final-exam-avilable",[ChapterExamController::class, 'isFinalExamAvilable']);




});

Route::post('/rating-exams',[RatingExamController::class, 'store']);
