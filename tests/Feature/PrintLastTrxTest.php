<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PrintLastTrxTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testPrint()
    {
        $reponse = $this->actingAs(User::first())
            ->json('GET', '/parkingTransaction/search', ['gate_out_id' => 2]);

        $reponse->assertJson(['gate_out_id' => 2]);
    }
}
