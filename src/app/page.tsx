import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Verifica SST Cloud</h1>
          </div>
          <nav className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900">
              Iniciar Sesión
            </Link>
            <Link
              href="/registro"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Registrarse
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Cumple con la normativa SST en Ecuador
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Verifica SST Cloud es la plataforma SaaS que ayuda a empresas ecuatorianas
            a cumplir con el Acuerdo Ministerial 196, Decreto Ejecutivo 255 y Decisión Andina 584.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/registro"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Prueba Gratis por 7 Días
            </Link>
            <Link
              href="#planes"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-semibold"
            >
              Ver Planes
            </Link>
          </div>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Lista de Verificación Completa
            </h3>
            <p className="text-gray-600">
              69 verificaciones basadas en el Anexo 1 de la normativa ecuatoriana.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Informes con IA
            </h3>
            <p className="text-gray-600">
              Genera informes técnicos automáticos con análisis de cumplimiento.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Seguridad Empresarial
            </h3>
            <p className="text-gray-600">
              Gestión de usuarios, roles y datos con máxima seguridad.
            </p>
          </div>
        </div>

        {/* Planes de suscripción */}
        <div id="planes" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Planes de Suscripción
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Plan Microempresa */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Microempresa</h3>
                <p className="text-sm opacity-90">1-10 trabajadores</p>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">$15</div>
                <p className="text-gray-600 text-sm mb-6">/mes</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> 1 usuario
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Checklist básico
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Almacenamiento de evidencias
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Acceso a normativa
                  </li>
                </ul>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Seleccionar
                </button>
              </div>
            </div>

            {/* Plan Pequeña */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Pequeña</h3>
                <p className="text-sm opacity-90">11-50 trabajadores</p>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">$35</div>
                <p className="text-gray-600 text-sm mb-6">/mes</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> 3 usuarios
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Informes PDF
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Almacenamiento de evidencias
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Soporte por email
                  </li>
                </ul>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Seleccionar
                </button>
              </div>
            </div>

            {/* Plan Mediana */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-2 border-yellow-400">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Mediana</h3>
                    <p className="text-sm opacity-90">51-200 trabajadores</p>
                  </div>
                  <span className="bg-yellow-700 px-2 py-1 rounded text-xs font-bold">
                    POPULAR
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">$75</div>
                <p className="text-gray-600 text-sm mb-6">/mes</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> 10 usuarios
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Informes con IA
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Asistente SST AI
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Soporte prioritario
                  </li>
                </ul>
                <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-bold">
                  Seleccionar
                </button>
              </div>
            </div>

            {/* Plan Grande */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Grande</h3>
                <p className="text-sm opacity-90">200+ trabajadores</p>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">$150</div>
                <p className="text-gray-600 text-sm mb-6">/mes</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Usuarios ilimitados
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> IA avanzada
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> API de integración
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span> Soporte 24/7
                  </li>
                </ul>
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-blue-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para cumplir con la normativa SST?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Comienza tu prueba gratuita de 7 días sin necesidad de tarjeta de crédito.
          </p>
          <Link
            href="/registro"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-bold"
          >
            Registrarse Ahora
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Verifica SST Cloud</h3>
              <p className="text-sm">
                Plataforma SaaS para cumplimiento de SST en Ecuador.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#planes" className="hover:text-white">
                    Planes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Documentación
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Términos de Servicio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: info@verificasst.com</li>
                <li>Teléfono: +593 2 XXXX XXXX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 Verifica SST Cloud. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
