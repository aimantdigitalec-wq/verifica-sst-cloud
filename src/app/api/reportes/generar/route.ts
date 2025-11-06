import { NextRequest, NextResponse } from "next/server";
import { generateReportWithDeepSeek } from "@/lib/deepseek";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { empresaId } = body;

    if (!empresaId) {
      return NextResponse.json(
        { error: "empresaId es requerido" },
        { status: 400 }
      );
    }

    // Obtener verificaciones de la empresa
    const supabase = createServerSupabaseClient();

    const { data: verificaciones, error: fetchError } = await supabase
      .from("verificaciones")
      .select("*")
      .eq("empresa_id", empresaId);

    if (fetchError) {
      return NextResponse.json(
        { error: "Error al obtener verificaciones" },
        { status: 500 }
      );
    }

    // Preparar datos para el informe
    const verificationData = JSON.stringify(verificaciones, null, 2);

    // Generar informe con DeepSeek
    const reportContent = await generateReportWithDeepSeek(verificationData);

    // Calcular porcentaje de cumplimiento
    const cumpleCount = verificaciones?.filter(
      (v: any) => v.estado === "cumple"
    ).length;
    const noAplicaCount = verificaciones?.filter(
      (v: any) => v.estado === "no-aplica"
    ).length;
    const applicableCount =
      (verificaciones?.length || 0) - noAplicaCount;
    const overallCompliance =
      applicableCount > 0
        ? Math.round((cumpleCount / applicableCount) * 100)
        : 0;

    // Guardar informe en base de datos
    const { data: informe, error: saveError } = await supabase
      .from("informes")
      .insert({
        empresa_id: empresaId,
        titulo: `Informe de Cumplimiento SST - ${new Date().toLocaleDateString("es-ES")}`,
        contenido: reportContent,
        porcentaje_cumplimiento: overallCompliance,
        fecha_generacion: new Date().toISOString(),
      })
      .select()
      .single();

    if (saveError) {
      return NextResponse.json(
        { error: "Error al guardar informe" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      informe,
      porcentajesCumplimiento: {
        general: overallCompliance,
        cumple: cumpleCount,
        noCumple: (verificaciones?.length || 0) - cumpleCount - noAplicaCount,
        noAplica: noAplicaCount,
      },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
