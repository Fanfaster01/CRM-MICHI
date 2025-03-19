import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <div className="h-12 w-12 rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl font-bold">
            M
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">CRM Michi</h1>
        <p className="text-center text-gray-600 mb-8">
          Sistema de gestión para restaurantes Michi
        </p>
        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="w-full block py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white text-center rounded-md transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/register"
            className="w-full block py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 text-center rounded-md transition-colors"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}