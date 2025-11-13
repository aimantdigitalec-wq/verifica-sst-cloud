export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6" }}>
      <div style={{ backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", padding: "2rem", maxWidth: "28rem", width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#111827", marginBottom: "1rem" }}>
          404
        </h1>
        <p style={{ color: "#4b5563", marginBottom: "1.5rem" }}>
          La página que buscas no existe.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
}
