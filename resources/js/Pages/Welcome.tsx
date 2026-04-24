import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
                                    auth
                                }: PageProps) {

    return (
        <>
            <Head title="Bienvenido" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">

                <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md text-center">

                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Bienvenido a Ecommerce
                    </h1>

                    <div className="flex justify-center gap-4">

                        {auth.user ? (

                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Dashboard
                            </Link>

                        ) : (

                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                    </div>

                </div>

            </div>
        </>
    );
}
