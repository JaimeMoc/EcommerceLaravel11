<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(): Response
    {
        $items = array_values(session()->get('cart', []));

        $total = array_reduce($items, function (float $carry, array $item): float {
            return $carry + (float) $item['subtotal'];
        }, 0.0);

        return Inertia::render('Cart/Index', [
            'items' => $items,
            'total' => $total,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function add(Product $product): RedirectResponse
    {
        $cart = session()->get('cart', []);
        $productId = (string) $product->id;

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity']++;
            $cart[$productId]['subtotal'] = $cart[$productId]['quantity'] * (float) $cart[$productId]['price'];
        } else {
            $cart[$productId] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'quantity' => 1,
                'subtotal' => (float) $product->price,
                'image' => $product->image,
            ];
        }

        session()->put('cart', $cart);

        return redirect()->back()->with('success', 'Producto agregado al carrito.');
    }

    public function remove(int $productId): RedirectResponse
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('cart', $cart);

            return redirect()->back()->with('success', 'Producto eliminado del carrito.');
        }

        return redirect()->back()->with('error', 'El producto no existe en el carrito.');
    }

    public function checkout(): RedirectResponse
    {
        if (empty(session()->get('cart', []))) {
            return redirect()->route('cart.index')->with('error', 'El carrito está vacío.');
        }

        session()->forget('cart');

        return redirect()->route('cart.index')->with('success', 'Compra realizada con éxito.');
    }
}
