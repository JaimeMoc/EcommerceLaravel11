<?php

namespace Tests\Feature\Orders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_complete_a_purchase(): void
    {
        // Arrange
        /** @var User $user */
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->for($category)->create(['price' => 150]);

        $cart = [
            $product->id => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'quantity' => 2,
                'subtotal' => (float) $product->price * 2,
                'image' => $product->image,
            ],
        ];

        // Act
        $response = $this->actingAs($user)
            ->withSession(['cart' => $cart])
            ->post('/cart/checkout');

        // Assert
        $response->assertRedirect(route('cart.index'));
        $response->assertSessionHas('success', 'Compra realizada con éxito.');
        $this->assertDatabaseHas('orders', [
            'user_id' => $user->id,
            'total' => 300.00,
            'items_count' => 2,
            'status' => 'completed',
        ]);
    }

    public function test_guest_users_are_redirected_to_login_when_checkouting(): void
    {
        // Arrange
        $category = Category::factory()->create();
        $product = Product::factory()->for($category)->create(['price' => 150]);

        $cart = [
            $product->id => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'quantity' => 1,
                'subtotal' => (float) $product->price,
                'image' => $product->image,
            ],
        ];

        // Act
        $response = $this->withSession(['cart' => $cart])->post('/cart/checkout');

        // Assert
        $response->assertRedirect(route('login'));
        $this->assertDatabaseCount('orders', 0);
    }
}