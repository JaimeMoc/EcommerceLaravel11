import { useForm } from '@inertiajs/react';

export default function Edit({ product, categories }: any) {
    const { data, setData, post, processing } = useForm({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image: null as File | null,
        _method: 'put',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(`/products/${product.id}`);
    }

    return (
        <form onSubmit={submit} encType="multipart/form-data">
            <h1>Editar producto</h1>

            <input
                value={data.name}
                onChange={e => setData('name', e.target.value)}
            />

            <input
                value={data.description}
                onChange={e => setData('description', e.target.value)}
            />

            <input
                type="number"
                value={data.price}
                onChange={e => setData('price', e.target.value)}
            />

            <input
                type="number"
                value={data.stock}
                onChange={e => setData('stock', e.target.value)}
            />

            <select
                value={data.category_id}
                onChange={e => setData('category_id', e.target.value)}
            >
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

            <button disabled={processing}>Actualizar</button>
        </form>
    );
}
