<?php

use Illuminate\Http\Request;

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

// endpoints /api/myEndPoint

header('Access-Control-Allow-Origin: *');
header( 'Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE' );

Route::get('/medicas', 'MedicaController@pegaListaMedicas');
Route::post('/medicas', 'MedicaController@adicionaMedica');
Route::delete('/medicas/{id}', 'MedicaController@deletaMedica');

Route::get('/pacientes', 'PacienteController@pegaListaPacientes');
Route::post('/pacientes', 'PacienteController@inserePaciente');
Route::get('/paciente/{id}', 'PacienteController@pegaPaciente');
Route::post('/paciente/{id}/medida', 'PacienteController@adicionaMedidaPaciente');
Route::post('/paciente/{id}/observacao', 'PacienteController@adicionaObservacaoPaciente');
