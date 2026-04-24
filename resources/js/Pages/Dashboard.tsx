import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    price: number;
    image?: string | null;
};

type DashboardProps = {
    products?: Product[];
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

export default function Dashboard() {
    const { products: rawProducts } = usePage<DashboardProps>().props;
    const products = Array.isArray(rawProducts) ? rawProducts : [];

    console.log(products);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                Productos destacados
                            </h3>
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/cart"
                                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                                >
                                    Ver carrito
                                </Link>
                                <Link
                                    href="/products"
                                    className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
                                >
                                    Ver todos
                                </Link>
                            </div>
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {products.map(product => {
                                    const imageUrl = resolveProductImage(product.image);

                                    return (
                                        <article
                                            key={product.id}
                                            className="overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                                        >
                                            <div className="mb-4 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-700/50">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={product.name}
                                                        className="h-48 w-full object-cover object-center"
                                                    />
                                                ) : (
                                                    <div className="flex h-48 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
                                                        Sin imagen
                                                    </div>
                                                )}
                                            </div>

                                            <h4 className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                                                {product.name}
                                            </h4>
                                            <p className="mt-2 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                                {currencyFormatter.format(product.price)}
                                            </p>

                                            <div className="mt-5 grid grid-cols-2 gap-2">
                                                <Link
                                                    href={`/products/${product.id}/edit`}
                                                    className="rounded-md border border-slate-300 px-3 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                                                >
                                                    Ver producto
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => router.post(`/cart/add/${product.id}`)}
                                                    className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
                                                >
                                                    Agregar al carrito
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="col-span-full rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                No hay productos para mostrar en este momento.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
