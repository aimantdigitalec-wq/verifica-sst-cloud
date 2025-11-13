import { NextRequest, NextResponse } from "next/server";
import { createRecurringPayment } from "@/lib/paypal";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { empresaId, planId } = body;

    if (!empresaId || !planId) {
      return NextResponse.json(
        { error: "empresaId y planId son requeridos" },
        { status: 400 }
      );
    }

    // Obtener datos de la empresa
    const supabase = createServerSupabaseClient();

    const { data: empresa, error: fetchError } = await supabase
      .from("empresas")
      .select("*")
      .eq("id", empresaId)
      .single();

    if (fetchError || !empresa) {
      return NextResponse.json(
        { error: "Empresa no encontrada" },
        { status: 404 }
      );
    }

    // Crear URL de retorno
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
    const returnUrl = `${appUrl}/suscripciones/confirmacion?empresaId=${empresaId}&planId=${planId}`;
    const cancelUrl = `${appUrl}/suscripciones/cancelada`;

    // Crear pago recurrente en PayPal
    const checkoutUrl = await createRecurringPayment(
      planId,
      returnUrl,
      cancelUrl
    );

    return NextResponse.json({
      success: true,
      checkoutUrl,
    });
  } catch (error) {
    console.error("Error creating PayPal subscription:", error);
    return NextResponse.json(
      { error: "Error al crear suscripción" },
      { status: 500 }
    );
  }
}
