<?php

use Faker\Generator as Faker;

$factory->define(App\Transfer::class, function (Faker $faker) {
    return [
        'descripcion'=>$faker->text($max=200),
        'amount'=>$faker->numberBetween($min=10,$max=90),
        'wallet_id'=>$faker->unique()->randomNumber($nbDigits = 2),
    ];
});
