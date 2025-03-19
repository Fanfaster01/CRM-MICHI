import Link from 'next/link';
import { ArrowRight, BarChart3, Package, DollarSign, ChefHat } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="ml-2 text-xl font-medium text-gray-800">CRM Michi</span>
            </div>
            <div className="flex items-center">
              <Link
                href="/auth/login"
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Administra tu restaurante <span className="text-pink-500">sin complicaciones</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              CRM Michi es la solución completa para administrar tus restaurantes. 
              Control de inventario, finanzas, ventas y más en una sola plataforma.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/auth/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
              >
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#features"
                className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Ver características
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Todo lo que necesitas en un solo lugar</h2>
            <p className="mt-4 text-lg text-gray-600">
              Simplifica la administración de tu restaurante con nuestras herramientas intuitivas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-pink-100 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Control de Inventario</h3>
              <p className="mt-2 text-gray-600">
                Gestiona tus ingredientes y productos con alertas de stock bajo y seguimiento de costos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-pink-100 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Gestión Financiera</h3>
              <p className="mt-2 text-gray-600">
                Controla tus ingresos, gastos y ganancias con reportes detallados y gráficos informativos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-pink-100 flex items-center justify-center mb-4">
                <ChefHat className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Gestión de Personal</h3>
              <p className="mt-2 text-gray-600">
                Administra horarios, turnos y rendimiento de tu equipo de manera efectiva.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-pink-100 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Reportes Avanzados</h3>
              <p className="mt-2 text-gray-600">
                Toma decisiones informadas con análisis detallados de ventas, tendencias y más.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                ¿Listo para optimizar tu restaurante?
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Comienza hoy mismo y transforma la forma en que administras tu negocio.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <Link
                href="/auth/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
              >
                Registrarse gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="ml-2 text-gray-800">CRM Michi</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} CRM Michi. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}