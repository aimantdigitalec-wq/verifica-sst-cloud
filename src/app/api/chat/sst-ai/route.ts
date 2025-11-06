import { NextRequest, NextResponse } from "next/server";
import { chatWithSSTAI } from "@/lib/deepseek";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mensaje, usuarioId } = body;

    if (!mensaje || !usuarioId) {
      return NextResponse.json(
        { error: "mensaje y usuarioId son requeridos" },
        { status: 400 }
      );
    }

    // Obtener respuesta del asistente
    const respuesta = await chatWithSSTAI(mensaje);

    // Guardar mensaje del usuario
    const supabase = createServerSupabaseClient();

    await supabase.from("mensajes_chat").insert({
      usuario_id: usuarioId,
      contenido: mensaje,
      es_usuario: true,
    });

    // Guardar respuesta del asistente
    await supabase.from("mensajes_chat").insert({
      usuario_id: usuarioId,
      contenido: respuesta,
      es_usuario: false,
    });

    return NextResponse.json({
      success: true,
      respuesta,
    });
  } catch (error) {
    console.error("Error in SST AI chat:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
