<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);

        $items = [];
        $total = 0;

        foreach ($cart as $productId => $quantity) {
            $product = Product::find($productId);

            if (!$product) {
                continue;
            }

            $subtotal = $product->price * $quantity;
            $total += $subtotal;

            $items[] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $quantity,
                'subtotal' => $subtotal,
            ];
        }

        return Inertia::render('Cart/Index', [
            'items' => $items,
            'total' => $total,
        ]);
    }

    public function add(Request $request, Product $product)
    {
        $cart = $request->session()->get('cart', []);

        if (!isset($cart[$product->id])) {
            $cart[$product->id] = 0;
        }

        $cart[$product->id]++;

        $request->session()->put('cart', $cart);

        return redirect()->back();
    }

    public function remove(Request $request, Product $product)
    {
        $cart = $request->session()->get('cart', []);

        unset($cart[$product->id]);

        $request->session()->put('cart', $cart);

        return redirect()->back();
    }
}
