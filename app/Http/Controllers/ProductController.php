<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::with('category')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate(Product::validationRules());

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($data);

        Log::info('audit.product_created', [
            'action' => 'product_created',
            'user_id' => $request->user()?->id,
            'product_id' => $product->id,
            'previous_price' => null,
            'new_price' => $product->price,
            'occurred_at' => now()->toDateTimeString(),
        ]);

        return redirect()->route('products.index');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $previousPrice = $product->price;
        $data = $request->validate(Product::validationRules());

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);

        if ((string) $previousPrice !== (string) $product->price) {
            Log::info('audit.product_price_changed', [
                'action' => 'product_price_changed',
                'user_id' => $request->user()?->id,
                'product_id' => $product->id,
                'previous_price' => $previousPrice,
                'new_price' => $product->price,
                'occurred_at' => now()->toDateTimeString(),
            ]);
        }

        Log::info('audit.product_updated', [
            'action' => 'product_updated',
            'user_id' => $request->user()?->id,
            'product_id' => $product->id,
            'previous_price' => $previousPrice,
            'new_price' => $product->price,
            'occurred_at' => now()->toDateTimeString(),
        ]);

        return redirect()->route('products.index');
    }

    public function destroy(Request $request, Product $product)
    {
        $previousPrice = $product->price;

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        Log::info('audit.product_deleted', [
            'action' => 'product_deleted',
            'user_id' => $request->user()?->id,
            'product_id' => $product->id,
            'previous_price' => $previousPrice,
            'new_price' => null,
            'occurred_at' => now()->toDateTimeString(),
        ]);

        return redirect()->route('products.index');
    }
}
