<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProtectedRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_users_are_redirected_from_private_routes(): void
    {
        // Arrange

        // Act
        $response = $this->get('/cart');

        // Assert
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_access_private_routes(): void
    {
        // Arrange
        /** @var User $user */
        $user = User::factory()->create();

        // Act
        $response = $this->actingAs($user)->get('/cart');

        // Assert
        $response->assertOk();
    }
}