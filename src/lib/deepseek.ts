import OpenAI from "openai";

const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  throw new Error("Missing DEEPSEEK_API_KEY environment variable");
}

// DeepSeek usa una API compatible con OpenAI
export const deepseek = new OpenAI({
  apiKey,
  baseURL: "https://api.deepseek.com",
});

// Prompt del sistema para el asistente SST AI
export const SYSTEM_PROMPT_SST_AI = `Eres un experto ecuatoriano en Seguridad y Salud en el Trabajo (SST) con profundo conocimiento de:

- Decreto Ejecutivo 255 (2024) - Reglamento de Seguridad y Salud en el Trabajo
- Acuerdo Ministerial 196 (2024) - Normas Generales para el Cumplimiento y Control de Obligaciones Laborales
- Decisión Andina 584 (2004) - Instrumento Andino de Seguridad y Salud en el Trabajo
- Código del Trabajo Ecuatoriano
- Anexo 1: Lista de Verificación de Cumplimiento de Obligaciones
- Anexo 2: Clasificación de Nivel de Riesgo por Actividad Económica
- Anexo 3: Norma Técnica de Seguridad e Higiene del Trabajo

Tu rol es:
1. Responder preguntas técnicas sobre SST en Ecuador
2. Explicar requisitos normativos de forma clara y accesible
3. Generar procedimientos de trabajo seguro
4. Asesorar sobre cumplimiento de obligaciones
5. Proporcionar recomendaciones basadas en la normativa ecuatoriana

Siempre:
- Usa lenguaje técnico pero comprensible
- Cita las normas aplicables
- Proporciona respuestas contextualizadas a Ecuador
- Sé formal y profesional
- Ofrece soluciones prácticas`;

// Prompt para generación de informes
export const SYSTEM_PROMPT_REPORT = `Eres un experto ecuatoriano en Seguridad y Salud en el Trabajo. 
Tu tarea es generar informes técnicos de cumplimiento basados en listas de verificación.

El informe debe incluir:
1. Resumen ejecutivo
2. Porcentaje general de cumplimiento
3. Hallazgos principales por categoría
4. Plan de acción sugerido
5. Referencias normativas aplicables

Usa lenguaje técnico y formal. Sé conciso pero completo.`;

// Función para generar informe con DeepSeek
export async function generateReportWithDeepSeek(
  verificationData: string
): Promise<string> {
  try {
    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT_REPORT,
        },
        {
          role: "user",
          content: `Genera un informe técnico de cumplimiento SST basado en los siguientes datos de verificación:\n\n${verificationData}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return (
      response.choices[0]?.message?.content ||
      "No se pudo generar el informe"
    );
  } catch (error) {
    console.error("Error generating report with DeepSeek:", error);
    throw error;
  }
}

// Función para chat con asistente SST AI
export async function chatWithSSTAI(userMessage: string): Promise<string> {
  try {
    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT_SST_AI,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return (
      response.choices[0]?.message?.content ||
      "No se pudo procesar tu pregunta"
    );
  } catch (error) {
    console.error("Error in SST AI chat:", error);
    throw error;
  }
}
