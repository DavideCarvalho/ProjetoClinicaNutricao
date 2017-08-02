<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MedicaControllerTest extends TestCase
{

    use DatabaseTransactions;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetMedicas() {
        $response = $this->get('/api/medicas');
        $response
            ->assertStatus(200)
            ->assertJson([]);
    }

    public function testPostMedicas() {
        $medica = [
            'nome_medica' => 'Juliana',
            'area_medica' => 'Psicóloga'
        ];
        $response = $this->post('/api/medicas', $medica);
        $response->assertStatus(200);
    }

    public function testUpdatetMedica() {
        $medica = [
            'nome_medica' => 'Juliana',
            'area_medica' => 'Psicóloga',
            'login' => 'juliana',
            'senha' => '123'
        ];
        $response = $this->put('/api/medica/1', $medica);
        $response->assertStatus(200);
    }

    public function testDeleteMedica(){
        $response = $this->delete('/api/medica/1');
        $response->assertStatus(200);
    }

    // public function testUpdateMedica() {

    // }
}
