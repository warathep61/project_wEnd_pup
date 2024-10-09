<?php

use App\Http\Controllers\ApexController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/apex', [ApexController::class, 'index']);
Route::get('/apex/{id}', [ApexController::class, 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post("apex", [ApexController::class, 'store']);
    Route::put("apex/{id}", [ApexController::class, 'update']);
    Route::delete("apex/{id}", [ApexController::class, 'destroy']);
});