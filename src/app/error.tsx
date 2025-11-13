"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">¡Algo salió mal!</h1>
        <p className="text-gray-600 mb-6">
          Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.
        </p>
        <button
          onClick={() => reset()}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
