"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function VerificacionesPage() {
  const [user, setUser] = useState<any>(null);
  const [empresa, setEmpresa] = useState<any>(null);
  const [verificaciones, setVerificaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState("todas");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Obtener usuario actual
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        setUser(currentUser);

        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        // Obtener empresa del usuario
        const { data: userData } = await supabase
          .from("usuarios")
          .select("empresa_id")
          .eq("id", currentUser.id)
          .single();

        if (userData?.empresa_id) {
          // Obtener datos de la empresa
          const { data: empresaData } = await supabase
            .from("empresas")
            .select("*")
            .eq("id", userData.empresa_id)
            .single();

          setEmpresa(empresaData);

          // Obtener verificaciones
          const { data: verificacionesData } = await supabase
            .from("verificaciones")
            .select("*")
            .eq("empresa_id", userData.empresa_id)
            .order("numero", { ascending: true });

          setVerificaciones(verificacionesData || []);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const verificacionesFiltradas =
    filtroCategoria === "todas"
      ? verificaciones
      : verificaciones.filter((v) => v.categoria === filtroCategoria);

  const estadisticas = {
    total: verificaciones.length,
    cumple: verificaciones.filter((v) => v.estado === "cumple").length,
    noCumple: verificaciones.filter((v) => v.estado === "no-cumple").length,
    noAplica: verificaciones.filter((v) => v.estado === "no-aplica").length,
  };

  const porcentajeCumplimiento =
    estadisticas.total > 0
      ? Math.round(
          (estadisticas.cumple /
            (estadisticas.total - estadisticas.noAplica)) *
            100
        )
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Cargando verificaciones...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Verificaciones</h1>
            <p className="text-gray-600 text-sm mt-1">
              {empresa?.razon_social}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Volver al Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">Total</p>
            <p className="text-3xl font-bold text-gray-900">
              {estadisticas.total}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg shadow-md p-6 border border-green-200">
            <p className="text-green-700 text-sm">Cumple</p>
            <p className="text-3xl font-bold text-green-600">
              {estadisticas.cumple}
            </p>
          </div>

          <div className="bg-red-50 rounded-lg shadow-md p-6 border border-red-200">
            <p className="text-red-700 text-sm">No Cumple</p>
            <p className="text-3xl font-bold text-red-600">
              {estadisticas.noCumple}
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg shadow-md p-6 border border-yellow-200">
            <p className="text-yellow-700 text-sm">No Aplica</p>
            <p className="text-3xl font-bold text-yellow-600">
              {estadisticas.noAplica}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200">
            <p className="text-blue-700 text-sm">Cumplimiento</p>
            <p className="text-3xl font-bold text-blue-600">
              {porcentajeCumplimiento}%
            </p>
          </div>
        </div>

        {/* Filtro de categorías */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por categoría:
          </label>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todas">Todas las categorías</option>
            <option value="administrativa">Administrativa</option>
            <option value="tecnica">Técnica</option>
            <option value="talento_humano">Talento Humano</option>
            <option value="servicios">Servicios Permanentes</option>
          </select>
        </div>

        {/* Lista de verificaciones */}
        <div className="space-y-4">
          {verificacionesFiltradas.length > 0 ? (
            verificacionesFiltradas.map((verificacion) => (
              <div
                key={verificacion.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-gray-900">
                        {verificacion.numero}.
                      </span>
                      <h3 className="font-semibold text-gray-900">
                        {verificacion.pregunta}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          verificacion.estado === "cumple"
                            ? "bg-green-100 text-green-800"
                            : verificacion.estado === "no-cumple"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {verificacion.estado === "cumple"
                          ? "✓ Cumple"
                          : verificacion.estado === "no-cumple"
                            ? "✗ No Cumple"
                            : "○ No Aplica"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {verificacion.referencia_normativa}
                    </p>
                    {verificacion.observaciones && (
                      <p className="text-sm text-gray-700 italic">
                        Observaciones: {verificacion.observaciones}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/verificaciones/${verificacion.id}`}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              No hay verificaciones disponibles
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
