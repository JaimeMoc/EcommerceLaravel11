import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type Category = {
    id: number;
    name: string;
    description?: string | null;
};

type CategoriesIndexProps = {
    categories: Category[];
};

export default function Index({ categories }: CategoriesIndexProps) {
    const { data, setData, post, processing } = useForm({
        name: '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/categories');
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Categorías
            </h1>

            <form
                onSubmit={submit}
                className="mb-8 rounded-lg border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
                <label
                    htmlFor="category-name"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                    Nueva categoría
                </label>
                <input
                    id="category-name"
                    placeholder="Nombre de la categoría"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-3 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Guardar
                </button>
            </form>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {categories.map(category => (
                    <article
                        key={category.id}
                        className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                    >
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            {category.name}
                        </h2>
                        <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">
                            {category.description || 'Sin descripción disponible.'}
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
                            >
                                Eliminar
                            </button>
                        </div>
                    </article>
                ))}

                {categories.length === 0 && (
                    <div className="col-span-full rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        No hay categorías registradas.
                    </div>
                )}
            </div>
        </div>
    );
}
