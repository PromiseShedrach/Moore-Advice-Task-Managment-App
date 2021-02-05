<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//header parameters to allow external server to access
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization, Accept, X-Requested-With');



Route::post('login', [App\Http\Controllers\HomeController::class, 'login']);
Route::post('register', [App\Http\Controllers\HomeController::class, 'register']);
Route::get('tasks', [App\Http\Controllers\TaskController::class, 'index']);
Route::post('add', [App\Http\Controllers\TaskController::class, 'store']);
Route::post('delete', [App\Http\Controllers\TaskController::class, 'destroy']);
