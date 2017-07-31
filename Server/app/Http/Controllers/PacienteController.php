<?php
namespace App\Http\Controllers;

use Request;
use Illuminate\Support\Facades\DB;

class PacienteController extends Controller
{
    public function pegaListaPacientes() {
        $pacientes = DB::table('paciente')->get();
        return $pacientes;
    }

    public function inserePaciente() {
      $paciente = Request::all();
      $id = DB::table('paciente')->insertGetId([
        'nome_paciente' => $paciente['nome_paciente']
      ]);
      return $id;
    }

    public function pegaPaciente($id) {
        $paciente = DB::table('paciente')->where('id', $id)->get();
        $paciente['peso'] = DB::table('medidas')->select('medida_peso', 'dia', 'mes', 'ano')->where('id_paciente', $id)->get();
        $paciente['cintura'] = DB::table('medidas')->select('medida_cintura', 'dia', 'mes', 'ano')->where('id_paciente', $id)->get();
        $paciente['quadril'] = DB::table('medidas')->select('medida_quadril', 'dia', 'mes', 'ano')->where('id_paciente', $id)->get();
        $paciente['observacoes'] = DB::table('observacao')
                                    ->orderBy('observacao.data_observacao', 'desc')
                                    ->join('medica', 'id_medica', '=', 'medica.id')
                                    ->join('paciente', 'id_paciente', '=', 'paciente.id')
                                    ->select('observacao.*', 'medica.nome_medica', 'paciente.nome_paciente')
                                    ->where('id_paciente', $id)->get();
        return $paciente;
    }

    public function adicionaMedidaPaciente($id) {
      $paciente = Request::all();
      $id = DB::table('medidas')->insertGetId(
        [
          'medida_quadril' => $paciente['quadril'],
          'medida_cintura' => $paciente['cintura'],
          'medida_peso' => $paciente['peso'],
          'id_paciente' => $paciente['id'],
          'dia' => $paciente['dia'],
          'mes' => $paciente['mes'],
          'ano' => $paciente['ano']
        ]
      );
      return $id;
    }

    public function adicionaObservacaoPaciente($id) {
      $observacao = Request::all();
      $id = DB::table('observacao') ->InsertGetId(
        [
          'id_paciente' => $observacao['id_paciente'],
          'nm_observacao' => $observacao['nm_observacao'],
          'id_medica' => $observacao['id_medica'],
          'dia_observacao' => $observacao['dia_observacao'],
          'mes_observacao' => $observacao['mes_observacao'],
          'ano_observacao' => $observacao['ano_observacao'],
          'data_observacao' => $observacao['data_observacao']
        ]
      );
      $observacao = DB::table('observacao')
                    ->join('medica', 'id_medica', '=', 'medica.id')
                    ->join('paciente', 'id_paciente', '=', 'paciente.id')
                    ->select('observacao.*', 'medica.nome_medica', 'paciente.nome_paciente')
                    ->where('observacao.id', $id)->get();

      return $observacao;
    }
}
