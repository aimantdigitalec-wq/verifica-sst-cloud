"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Mensaje {
  id: string;
  contenido: string;
  es_usuario: boolean;
  creado_en: string;
}

export default function AsistenteAIPage() {
  const [user, setUser] = useState<any>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [inputMensaje, setInputMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        window.location.href = "/login";
        return;
      }

      setUser(currentUser);
      setLoading(false);

      // Cargar mensajes anteriores
      const { data: mensajesData } = await supabase
        .from("mensajes_chat")
        .select("*")
        .eq("usuario_id", currentUser.id)
        .order("creado_en", { ascending: true })
        .limit(50);

      if (mensajesData) {
        setMensajes(mensajesData);
      }
    };

    setLoading(true);
    loadUser();
  }, []);

  useEffect(() => {
    // Scroll al final cuando hay nuevos mensajes
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const handleEnviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMensaje.trim() || !user) return;

    setEnviando(true);

    try {
      // Agregar mensaje del usuario localmente
      const nuevoMensajeUsuario: Mensaje = {
        id: Date.now().toString(),
        contenido: inputMensaje,
        es_usuario: true,
        creado_en: new Date().toISOString(),
      };

      setMensajes((prev) => [...prev, nuevoMensajeUsuario]);
      setInputMensaje("");

      // Enviar al servidor
      const response = await fetch("/api/chat/sst-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensaje: inputMensaje,
          usuarioId: user.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const nuevoMensajeAsistente: Mensaje = {
          id: (Date.now() + 1).toString(),
          contenido: data.respuesta,
          es_usuario: false,
          creado_en: new Date().toISOString(),
        };

        setMensajes((prev) => [...prev, nuevoMensajeAsistente]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Cargando asistente...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Asistente SST AI
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Experto en Seguridad y Salud Ocupacional
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Volver
          </Link>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Mensajes */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 mb-6 overflow-y-auto max-h-[500px]">
          {mensajes.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg mb-4">
                👋 ¡Hola! Soy tu asistente SST AI
              </p>
              <p className="mb-4">
                Puedo ayudarte con preguntas sobre:
              </p>
              <ul className="text-left inline-block space-y-2 text-sm">
                <li>✓ Normativa SST en Ecuador</li>
                <li>✓ Cumplimiento de obligaciones</li>
                <li>✓ Procedimientos de trabajo seguro</li>
                <li>✓ Requisitos de comités paritarios</li>
                <li>✓ Y mucho más...</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              {mensajes.map((mensaje) => (
                <div
                  key={mensaje.id}
                  className={`flex ${
                    mensaje.es_usuario ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      mensaje.es_usuario
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{mensaje.contenido}</p>
                    <p
                      className={`text-xs mt-1 ${
                        mensaje.es_usuario
                          ? "text-blue-100"
                          : "text-gray-600"
                      }`}
                    >
                      {new Date(mensaje.creado_en).toLocaleTimeString("es-ES")}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleEnviarMensaje} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMensaje}
              onChange={(e) => setInputMensaje(e.target.value)}
              placeholder="Escribe tu pregunta aquí..."
              disabled={enviando}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={enviando || !inputMensaje.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
            >
              {enviando ? "Enviando..." : "Enviar"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Consejo: Sé específico en tus preguntas para obtener mejores respuestas
          </p>
        </form>
      </main>
    </div>
  );
}
