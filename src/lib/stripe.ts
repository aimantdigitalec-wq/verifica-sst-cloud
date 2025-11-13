import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-10-29.clover",
});

// Planes de suscripción
export const PLANES_SUSCRIPCION = {
  microempresa: {
    nombre: "Microempresa",
    trabajadores_min: 1,
    trabajadores_max: 10,
    precio_mensual: 15,
    numero_usuarios: 1,
    caracteristicas: [
      "1 usuario",
      "Checklist básico",
      "Almacenamiento de evidencias",
      "Acceso a normativa",
    ],
  },
  pequeña: {
    nombre: "Pequeña",
    trabajadores_min: 11,
    trabajadores_max: 50,
    precio_mensual: 35,
    numero_usuarios: 3,
    caracteristicas: [
      "3 usuarios",
      "Informes PDF automáticos",
      "Almacenamiento de evidencias",
      "Acceso a normativa",
      "Soporte por email",
    ],
  },
  mediana: {
    nombre: "Mediana",
    trabajadores_min: 51,
    trabajadores_max: 200,
    precio_mensual: 75,
    numero_usuarios: 10,
    caracteristicas: [
      "10 usuarios",
      "Informes con IA incluida",
      "Almacenamiento ilimitado",
      "Asistente SST AI",
      "Exportación a Excel",
      "Soporte prioritario",
    ],
  },
  grande: {
    nombre: "Grande",
    trabajadores_min: 201,
    trabajadores_max: Infinity,
    precio_mensual: 150,
    numero_usuarios: Infinity,
    caracteristicas: [
      "Usuarios ilimitados",
      "IA avanzada",
      "Almacenamiento ilimitado",
      "Asistente SST AI avanzado",
      "API de integración",
      "Soporte 24/7",
      "Auditoría de seguridad",
    ],
  },
};
