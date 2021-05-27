<?php

use Faker\Generator as Faker;

$factory->define(App\Wallet::class, function (Faker $faker) {
    return [
        'money'=>$faker->numberBetween($min=500,$max=900)
    ];
});
