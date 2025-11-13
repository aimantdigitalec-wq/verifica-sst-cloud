"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [empresa, setEmpresa] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      if (user) {
        // Obtener empresa del usuario
        const { data: userData } = await supabase
          .from("usuarios")
          .select("empresa_id")
          .eq("id", user.id)
          .single();

        if (userData?.empresa_id) {
          const { data: empresaData } = await supabase
            .from("empresas")
            .select("*")
            .eq("id", userData.empresa_id)
            .single();

          setEmpresa(empresaData);
        }
      }

      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            {empresa && (
              <p className="text-gray-600 text-sm mt-1">{empresa.razon_social}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Link
              href="/planes"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Planes
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/";
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido al Dashboard
          </h2>
          {empresa && (
            <p className="text-gray-600 mb-6">{empresa.razon_social}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Verificaciones
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">0/69</p>
              <p className="text-gray-600 text-sm">Completadas</p>
              <Link
                href="/verificaciones"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Ir a Verificaciones
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Reportes</h3>
              <p className="text-3xl font-bold text-green-600 mb-2">0</p>
              <p className="text-gray-600 text-sm">Generados</p>
              <Link
                href="/reportes"
                className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Ver Reportes
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Asistente IA
              </h3>
              <p className="text-3xl font-bold text-purple-600 mb-2">24/7</p>
              <p className="text-gray-600 text-sm">Disponible</p>
              <Link
                href="/asistente-ai"
                className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
              >
                Abrir Asistente
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Suscripción
              </h3>
              <p className="text-3xl font-bold text-orange-600 mb-2">
                {empresa?.plan_suscripcion || "Plan"}
              </p>
              <p className="text-gray-600 text-sm">Actual</p>
              <Link
                href="/planes"
                className="mt-4 inline-block px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
              >
                Ver Planes
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ✅ Características Disponibles
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Lista de verificación (Anexo 1)</li>
                <li>✓ Carga de evidencias</li>
                <li>✓ Generación de informes con IA</li>
                <li>✓ Asistente SST AI 24/7</li>
                <li>✓ Gestión de usuarios</li>
                <li>✓ Suscripciones con PayPal</li>
              </ul>
            </div>
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🚀 Próximas Características
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Exportación en PDF y Excel</li>
                <li>✓ Matriz de riesgos personalizada</li>
                <li>✓ Auditoría interna automática</li>
                <li>✓ Integración API</li>
                <li>✓ Análisis predictivo</li>
                <li>✓ Soporte multiidioma</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
