<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class UserValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_email_must_be_valid(): void
    {
        // Arrange
        $user = User::factory()->make();
        $data = [
            'name' => $user->name,
            'email' => 'correo-invalido',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        // Act
        $validator = Validator::make($data, User::registrationRules());

        // Assert
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('email', $validator->errors()->toArray());
    }

    public function test_user_password_must_have_minimum_length(): void
    {
        // Arrange
        $user = User::factory()->make();
        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => '1234567',
            'password_confirmation' => '1234567',
        ];

        // Act
        $validator = Validator::make($data, User::registrationRules());

        // Assert
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('password', $validator->errors()->toArray());
    }
}