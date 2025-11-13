import https from "https";

interface PayPalConfig {
  username: string;
  password: string;
  signature: string;
  mode: "sandbox" | "live";
}

const paypalConfig: PayPalConfig = {
  username: process.env.PAYPAL_API_USERNAME || "",
  password: process.env.PAYPAL_API_PASSWORD || "",
  signature: process.env.PAYPAL_API_SIGNATURE || "",
  mode: (process.env.PAYPAL_MODE as "sandbox" | "live") || "sandbox",
};

if (!paypalConfig.username || !paypalConfig.password || !paypalConfig.signature) {
  console.warn("PayPal credentials not fully configured");
}

// Planes de suscripción con precios en USD
export const PLANES_SUSCRIPCION_PAYPAL = {
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

/**
 * Crear un perfil de suscripción recurrente en PayPal
 */
export async function createRecurringPayment(
  planId: string,
  returnUrl: string,
  cancelUrl: string
): Promise<string> {
  const plan = PLANES_SUSCRIPCION_PAYPAL[planId as keyof typeof PLANES_SUSCRIPCION_PAYPAL];

  if (!plan) {
    throw new Error("Plan no válido");
  }

  const params = {
    METHOD: "SetExpressCheckout",
    VERSION: "204.0",
    USER: paypalConfig.username,
    PWD: paypalConfig.password,
    SIGNATURE: paypalConfig.signature,
    PAYMENTACTION: "Sale",
    RETURNURL: returnUrl,
    CANCELURL: cancelUrl,
    NOSHIPPING: "1",
    ALLOWNOTE: "0",
    BRANDNAME: "Verifica SST Cloud",
    ITEMAMT: plan.precio_mensual.toFixed(2),
    AMT: plan.precio_mensual.toFixed(2),
    CURRENCYCODE: "USD",
    L_NAME0: plan.nombre,
    L_DESC0: `Suscripción ${plan.nombre} - ${plan.numero_usuarios} usuario(s)`,
    L_AMT0: plan.precio_mensual.toFixed(2),
    L_QTY0: "1",
    BILLINGTYPE: "RecurringPayments",
    BILLINGAGREEMENTDESCRIPTION: `Suscripción a ${plan.nombre} de Verifica SST Cloud`,
  };

  return new Promise((resolve, reject) => {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    const options = {
      hostname: "api.sandbox.paypal.com",
      path: "/nvp",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(queryString),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = new URLSearchParams(data);
        const token = response.get("TOKEN");

        if (token) {
          const checkoutUrl =
            paypalConfig.mode === "sandbox"
              ? `https://www.sandbox.paypal.com/checkoutnow?token=${token}`
              : `https://www.paypal.com/checkoutnow?token=${token}`;
          resolve(checkoutUrl);
        } else {
          reject(new Error("No token received from PayPal"));
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(queryString);
    req.end();
  });
}

/**
 * Obtener detalles de la transacción de PayPal
 */
export async function getExpressCheckoutDetails(token: string): Promise<any> {
  const params = {
    METHOD: "GetExpressCheckoutDetails",
    VERSION: "204.0",
    USER: paypalConfig.username,
    PWD: paypalConfig.password,
    SIGNATURE: paypalConfig.signature,
    TOKEN: token,
  };

  return new Promise((resolve, reject) => {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    const options = {
      hostname: "api.sandbox.paypal.com",
      path: "/nvp",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(queryString),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = new URLSearchParams(data);
        resolve(Object.fromEntries(response));
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(queryString);
    req.end();
  });
}

/**
 * Crear un acuerdo de facturación recurrente
 */
export async function createBillingAgreement(token: string): Promise<string> {
  const params = {
    METHOD: "CreateBillingAgreement",
    VERSION: "204.0",
    USER: paypalConfig.username,
    PWD: paypalConfig.password,
    SIGNATURE: paypalConfig.signature,
    TOKEN: token,
  };

  return new Promise((resolve, reject) => {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    const options = {
      hostname: "api.sandbox.paypal.com",
      path: "/nvp",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(queryString),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = new URLSearchParams(data);
        const billingAgreementId = response.get("BILLINGAGREEMENTID");

        if (billingAgreementId) {
          resolve(billingAgreementId);
        } else {
          reject(new Error("No billing agreement ID received"));
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(queryString);
    req.end();
  });
}
