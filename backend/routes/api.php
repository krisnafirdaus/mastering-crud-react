<?php

use App\Http\Controllers\Api\CourseOutlineController;
use App\Http\Controllers\Api\LabNoteController;
use Illuminate\Support\Facades\Route;

Route::get('/course-outline', CourseOutlineController::class);
Route::apiResource('/lab-notes', LabNoteController::class);