import { Link, router } from '@inertiajs/react';

export default function Index({ products }: any) {
    return (
        <div>
            <h1>Productos</h1>

            <Link href="/products/create">Crear producto</Link>

            <ul>
                {products.map((product: any) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}

                        <Link href={`/products/${product.id}/edit`}>
                            Editar
                        </Link>

                        <button
                            onClick={() =>
                                router.delete(`/products/${product.id}`)
                            }
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
