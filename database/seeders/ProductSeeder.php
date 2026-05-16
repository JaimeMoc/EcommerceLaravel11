<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Laptop HP',
            'description' => 'Laptop para oficina',
            'price' => 15000,
            'category_id' => 1
        ]);

        Product::create([
            'name' => 'Mouse Logitech',
            'description' => 'Mouse inalámbrico',
            'price' => 600,
            'category_id' => 1
        ]);

        Product::create([
            'name' => 'Playera Nike',
            'description' => 'Playera deportiva',
            'price' => 500,
            'category_id' => 2
        ]);

        Product::create([
            'name' => 'Sofá moderno',
            'description' => 'Sofá color gris',
            'price' => 9000,
            'category_id' => 3
        ]);
    }
}