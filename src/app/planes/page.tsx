"use client";

import { useState } from "react";
import Link from "next/link";
import { PLANES_SUSCRIPCION_PAYPAL } from "@/lib/paypal";

export default function PlanesPage() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    setLoading(true);
    setSelectedPlan(planId);

    try {
      // Obtener empresa ID del usuario (esto debería venir del contexto)
      // Por ahora, redirigir a login si no está autenticado
      const response = await fetch("/api/suscripciones/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empresaId: "empresa-id-aqui", // Esto debería venir del contexto
          planId: planId,
        }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        // Redirigir a PayPal
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error("Error selecting plan:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← Volver
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Planes de Suscripción
          </h2>
          <p className="text-xl text-gray-600">
            Elige el plan perfecto para tu empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(PLANES_SUSCRIPCION_PAYPAL).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                key === "mediana" ? "border-2 border-yellow-400 md:scale-105" : ""
              }`}
            >
              <div
                className={`p-6 text-white ${
                  key === "microempresa"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
                    : key === "pequeña"
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : key === "mediana"
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                        : "bg-gradient-to-r from-purple-500 to-purple-600"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{plan.nombre}</h3>
                    <p className="text-sm opacity-90">
                      {plan.trabajadores_min}-
                      {plan.trabajadores_max === Infinity
                        ? "+"
                        : plan.trabajadores_max}{" "}
                      trabajadores
                    </p>
                  </div>
                  {key === "mediana" && (
                    <span className="bg-white text-yellow-600 px-2 py-1 rounded text-xs font-bold">
                      POPULAR
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${plan.precio_mensual}
                </div>
                <p className="text-gray-600 text-sm mb-6">/mes</p>

                <ul className="space-y-3 mb-6">
                  {plan.caracteristicas.map((caracteristica, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="text-green-600">✓</span>
                      {caracteristica}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(key)}
                  disabled={loading && selectedPlan === key}
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                    key === "microempresa"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : key === "pequeña"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : key === "mediana"
                          ? "bg-yellow-600 text-white hover:bg-yellow-700"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                  } ${loading && selectedPlan === key ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading && selectedPlan === key ? "Procesando..." : "Seleccionar"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparativa de características */}
        <div className="mt-20 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Comparativa de Características
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Característica
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">
                    Microempresa
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">
                    Pequeña
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">
                    Mediana
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">
                    Grande
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">Usuarios</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4">3</td>
                  <td className="text-center py-3 px-4">10</td>
                  <td className="text-center py-3 px-4">Ilimitados</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">Verificaciones</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">Informes PDF</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">IA Incluida</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">Asistente SST AI</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-700">API de Integración</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Soporte</td>
                  <td className="text-center py-3 px-4">Email</td>
                  <td className="text-center py-3 px-4">Email</td>
                  <td className="text-center py-3 px-4">Prioritario</td>
                  <td className="text-center py-3 px-4">24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-2">
                ¿Puedo cambiar de plan?
              </h4>
              <p className="text-gray-600 text-sm">
                Sí, puedes cambiar de plan en cualquier momento. El cambio se
                reflejará en tu próximo ciclo de facturación.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-2">
                ¿Hay prueba gratuita?
              </h4>
              <p className="text-gray-600 text-sm">
                Sí, ofrecemos 7 días de prueba gratuita sin necesidad de tarjeta
                de crédito.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-2">
                ¿Qué métodos de pago aceptan?
              </h4>
              <p className="text-gray-600 text-sm">
                Aceptamos PayPal para pagos internacionales y locales.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-2">
                ¿Hay contrato a largo plazo?
              </h4>
              <p className="text-gray-600 text-sm">
                No, todos nuestros planes son mensuales sin compromiso a largo
                plazo.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
