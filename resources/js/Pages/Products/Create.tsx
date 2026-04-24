import { useForm } from '@inertiajs/react';

export default function Create({ categories }: any) {
    const { data, setData, post, processing } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image: null as File | null,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/products');
    }

    return (
        <form onSubmit={submit} encType="multipart/form-data">
            <h1>Crear producto</h1>

            <input
                placeholder="Nombre"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
            />

            <input
                placeholder="Descripción"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
            />

            <input
                type="number"
                placeholder="Precio"
                value={data.price}
                onChange={e => setData('price', e.target.value)}
            />

            <input
                type="number"
                placeholder="Stock"
                value={data.stock}
                onChange={e => setData('stock', e.target.value)}
            />

            <select
                value={data.category_id}
                onChange={e => setData('category_id', e.target.value)}
            >
                <option value="">Selecciona categoría</option>
                {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <input
                type="file"
                onChange={e =>
                    setData('image', e.target.files?.[0] || null)
                }
            />

            <button disabled={processing}>Guardar</button>
        </form>
    );
}
