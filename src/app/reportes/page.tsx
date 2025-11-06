"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Informe {
  id: string;
  titulo: string;
  porcentaje_cumplimiento: number;
  fecha_generacion: string;
  contenido: string;
}

export default function ReportesPage() {
  const [user, setUser] = useState<any>(null);
  const [empresa, setEmpresa] = useState<any>(null);
  const [informes, setInformes] = useState<Informe[]>([]);
  const [loading, setLoading] = useState(true);
  const [generando, setGenerando] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        setUser(currentUser);

        if (!currentUser) {
          window.location.href = "/login";
          return;
        }

        const { data: userData } = await supabase
          .from("usuarios")
          .select("empresa_id")
          .eq("id", currentUser.id)
          .single();

        if (userData?.empresa_id) {
          const { data: empresaData } = await supabase
            .from("empresas")
            .select("*")
            .eq("id", userData.empresa_id)
            .single();

          setEmpresa(empresaData);

          const { data: informesData } = await supabase
            .from("informes")
            .select("*")
            .eq("empresa_id", userData.empresa_id)
            .order("fecha_generacion", { ascending: false });

          setInformes(informesData || []);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleGenerarInforme = async () => {
    if (!empresa) return;

    setGenerando(true);

    try {
      const response = await fetch("/api/reportes/generar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empresaId: empresa.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Agregar nuevo informe a la lista
        setInformes((prev) => [data.informe, ...prev]);

        // Mostrar notificación
        alert("Informe generado exitosamente");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Error al generar el informe");
    } finally {
      setGenerando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Cargando reportes...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
            <p className="text-gray-600 text-sm mt-1">
              {empresa?.razon_social}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleGenerarInforme}
              disabled={generando}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
            >
              {generando ? "Generando..." : "Generar Informe"}
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Volver
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {informes.length > 0 ? (
          <div className="space-y-6">
            {informes.map((informe) => (
              <div
                key={informe.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {informe.titulo}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Generado:{" "}
                      {new Date(informe.fecha_generacion).toLocaleDateString(
                        "es-ES"
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {informe.porcentaje_cumplimiento}%
                    </div>
                    <p className="text-sm text-gray-600">Cumplimiento</p>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {informe.contenido.substring(0, 500)}...
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Aquí iría la lógica para descargar PDF
                      alert("Funcionalidad de descarga próximamente");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => {
                      // Aquí iría la lógica para ver detalles
                      alert("Detalles del informe próximamente");
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-6">
              No hay reportes generados aún.
            </p>
            <button
              onClick={handleGenerarInforme}
              disabled={generando}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
            >
              {generando ? "Generando..." : "Generar Primer Informe"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
