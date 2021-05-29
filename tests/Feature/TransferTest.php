<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Wallet;
use App\Transfer;

class TransferTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     *
     * @return void
     */

    public function testPostTransfer()
    {
       //$this->withoutExceptionHandling();
        $wallet = factory(Wallet::class)->create();
        $transfer = factory(Transfer::class)->create();

        $response= $this->json('POST','/api/transfer',[
            'descripcion'=>$transfer->descripcion,
            'amount'=>$transfer->amount,
            'wallet_id'=>$wallet->id
        ]);
        $response->assertJsonStructure([
                            'id','descripcion','amount','wallet_id'
                        ])->assertStatus(201);

                $this->assertDatabaseHas('transfers', [
                    'descripcion'=>$transfer->descripcion,
                    'amount'=>$transfer->amount,
                    'wallet_id'=>$wallet->id
                ]);
                $this->assertDatabaseHas('wallets',[
                    'id'=>$wallet->id,
                    'money'=>$wallet->money + $transfer->amount
                ]);

    }

}
