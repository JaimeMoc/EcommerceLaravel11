<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $products = Product::latest()->take(8)->get();

        return Inertia::render('Dashboard', [
            'products' => $products,
        ]);
    }
}
