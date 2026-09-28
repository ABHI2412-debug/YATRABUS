import AdminShell from "@/components/layout/AdminShell";

export const metadata = { title: "Login — VedBus Admin" };

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-sidebar-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="admin-card"
        style={{ width: "100%", maxWidth: 400, padding: "2rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            VedBus Admin
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginTop: 4 }}>
            Sign in to your admin panel
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label className="admin-label">Email</label>
            <input className="admin-input" type="email" placeholder="admin@vedbus.in" />
          </div>
          <div>
            <label className="admin-label">Password</label>
            <input className="admin-input" type="password" placeholder="••••••••" />
          </div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
