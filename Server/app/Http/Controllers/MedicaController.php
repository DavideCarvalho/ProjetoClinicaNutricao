<?php
namespace App\Http\Controllers;

use Request;
use Illuminate\Support\Facades\DB;

class MedicaController extends Controller
{
  public function pegaListaMedicas() {
    $medicas = DB::table('medica')->get();
    return $medicas;
  }

  public function adicionaMedica() {
    $medica = Request::all();
    $id = DB::table('medica')->insertGetId(
      [
        'nome_medica' => $medica['nome_medica'],
        'area_medica' => $medica['area_medica']
      ]
    );
    return $id;
  }

  public function deletaMedica($id) {
    $id = DB::table('medica')->where('id', '=', $id)->delete();
    return $id;
  }

  public function updateMedica($id) {
    $medica = Request::all();
    DB::table('medica')->where('id', $id)->update([
      'nome_medica' => $medica['nome_medica'],
      'area_medica' => $medica['area_medica']
    ]);
  }

}
