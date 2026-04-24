import { useForm } from '@inertiajs/react';

export default function Index({ categories }: any) {
    const { data, setData, post, processing } = useForm({
        name: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/categories');
    }

    return (
        <div>
            <h1>Categorías</h1>

            <form onSubmit={submit}>
                <input
                    placeholder="Nombre de la categoría"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                />
                <button disabled={processing}>Guardar</button>
            </form>

            <ul>
                {categories.map((category: any) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
}
