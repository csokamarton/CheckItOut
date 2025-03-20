<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource("users",UserController::class);

Route::apiResource("schedule", ScheduleController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get("/scheduleComposer/{user}", [ScheduleController::class, 'scheduleComposer'])
->name("schedule.compose")->middleware('auth:sanctum');

Route::get('/task/today/{user}', [TaskController::class, 'todaysTasks'])->middleware('auth:sanctum');