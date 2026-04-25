<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'El carrito está vacío.');
        }

        $total = collect($cart)->sum('subtotal');
        $itemsCount = collect($cart)->sum('quantity');

        $order = Order::create([
            'user_id' => $request->user()->id,
            'total' => $total,
            'items_count' => $itemsCount,
            'status' => 'completed',
        ]);

        Log::info('audit.purchase_completed', [
            'action' => 'purchase_completed',
            'user_id' => $request->user()->id,
            'resource_id' => $order->id,
            'order_id' => $order->id,
            'total' => $order->total,
            'items_count' => $order->items_count,
            'occurred_at' => now()->toDateTimeString(),
        ]);

        session()->forget('cart');

        return redirect()->route('cart.index')->with('success', 'Compra realizada con éxito.');
    }
}