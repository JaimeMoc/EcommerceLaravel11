<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class ProductValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_name_is_required(): void
    {
        // Arrange
        $category = Category::factory()->create();
        $data = Product::factory()->make(['category_id' => $category->id])->toArray();
        $data['name'] = '';

        // Act
        $validator = Validator::make($data, Product::validationRules());

        // Assert
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_product_price_must_be_numeric(): void
    {
        // Arrange
        $category = Category::factory()->create();
        $data = Product::factory()->make(['category_id' => $category->id])->toArray();
        $data['price'] = 'no-es-numero';

        // Act
        $validator = Validator::make($data, Product::validationRules());

        // Assert
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('price', $validator->errors()->toArray());
    }

    public function test_product_price_must_be_greater_than_zero(): void
    {
        // Arrange
        $category = Category::factory()->create();
        $data = Product::factory()->make(['category_id' => $category->id])->toArray();
        $data['price'] = 0;

        // Act
        $validator = Validator::make($data, Product::validationRules());

        // Assert
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('price', $validator->errors()->toArray());
    }
}