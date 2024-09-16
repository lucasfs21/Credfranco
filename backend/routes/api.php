<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommissionToReceiveController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommissionController;

Route::get('/commissions', [CommissionController::class, 'index']);

Route::post('/commissions', [CommissionController::class, 'store']);

Route::delete('/commissions/{id}', [CommissionController::class, 'destroy']);

Route::put('/commissions/{id}', [CommissionController::class, 'update']);

Route::get('/commissions/user/{userId}', [CommissionController::class, 'showByUser']);

Route::get('/commissions-to-receive', [CommissionToReceiveController::class, 'index']);

Route::get('/users/commercial', [UserController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

