import { Link, router } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    price: number;
    image?: string | null;
};

type ProductsIndexProps = {
    products: Product[];
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

export default function Index({ products }: ProductsIndexProps) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Productos
                </h1>

                <Link
                    href="/products/create"
                    className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                    Crear Producto
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
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

                            <h2 className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                                {product.name}
                            </h2>
                            <p className="mt-2 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                {currencyFormatter.format(product.price)}
                            </p>

                            <div className="mt-5 grid grid-cols-2 gap-2">
                                <Link
                                    href={`/products/${product.id}/edit`}
                                    className="rounded-md border border-slate-300 px-3 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                                >
                                    Editar
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => router.delete(`/products/${product.id}`)}
                                    className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    );
                })}

                {products.length === 0 && (
                    <div className="col-span-full rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        No hay productos registrados.
                    </div>
                )}
            </div>
        </div>
    );
}
