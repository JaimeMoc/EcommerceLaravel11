import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    image?: string | null;
};

type CartPageProps = {
    items: CartItem[];
    total: number;
    success?: string;
    error?: string;
};

const currencyFormatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
});

function resolveProductImage(image?: string | null): string | null {
    if (!image) {
        return null;
    }

    return image.startsWith('http') ? image : `/storage/${image}`;
}

export default function CartIndex({ items, total, success, error }: CartPageProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Carrito de compras
                </h2>
            }
        >
            <Head title="Carrito" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {success && (
                        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-700/40 dark:bg-emerald-900/30 dark:text-emerald-200">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-700/40 dark:bg-rose-900/30 dark:text-rose-200">
                            {error}
                        </div>
                    )}

                    {items.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <p className="text-slate-700 dark:text-slate-200">Tu carrito está vacío.</p>
                            <Link
                                href="/dashboard"
                                className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                            >
                                Ir al Dashboard
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                {items.map(item => {
                                    const imageUrl = resolveProductImage(item.image);

                                    return (
                                        <article
                                            key={item.id}
                                            className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-md sm:grid-cols-[96px_1fr_auto] sm:items-center dark:border-slate-700 dark:bg-slate-800"
                                        >
                                            <div className="overflow-hidden rounded-md bg-slate-100 dark:bg-slate-700/50">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.name}
                                                        className="h-24 w-full object-cover sm:w-24"
                                                    />
                                                ) : (
                                                    <div className="flex h-24 w-full items-center justify-center text-xs text-slate-500 dark:text-slate-400 sm:w-24">
                                                        Sin imagen
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.name}</h3>
                                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                                    Precio: {currencyFormatter.format(item.price)}
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                                    Cantidad: {item.quantity}
                                                </p>
                                                <p className="mt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                                    Subtotal: {currencyFormatter.format(item.subtotal)}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => router.delete(`/cart/remove/${item.id}`)}
                                                className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
                                            >
                                                Quitar
                                            </button>
                                        </article>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-900">
                                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Total: {currencyFormatter.format(total)}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => router.post('/cart/checkout')}
                                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
                                >
                                    Comprar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
