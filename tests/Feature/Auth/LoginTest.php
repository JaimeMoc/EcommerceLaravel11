<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_successfully(): void
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        // Assert
        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_user_cannot_login_with_incorrect_credentials(): void
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->from('/login')->post('/login', [
            'email' => $user->email,
            'password' => 'credenciales-incorrectas',
        ]);

        // Assert
        $this->assertGuest();
        $response->assertRedirect('/login');
        $response->assertSessionHasErrors('email');
    }
}