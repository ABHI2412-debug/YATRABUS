"use client";

export default function Topbar({ onToggleSidebar }) {
  return (
    <header style={{
      height: 64,
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E2E8F0",
      display: "flex",
      alignItems: "center",
      padding: "0 1.5rem",
      gap: "1rem",
      position: "sticky",
      top: 0,
      zIndex: 40,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}>
      {/* Hamburger */}
      <button
        type="button"
        onClick={onToggleSidebar}
        style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 6, color: "#475569", display: "flex", borderRadius: 6
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>menu</span>
      </button>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 420, position: "relative" }}>
        <span className="material-symbols-outlined" style={{
          position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
          fontSize: 18, color: "#94A3B8", pointerEvents: "none",
        }}>search</span>
        <input
          type="text"
          placeholder="Search for bookings, users, routes..."
          style={{
            width: "100%",
            paddingLeft: 36, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            fontSize: "0.8125rem",
            color: "#0F172A",
            backgroundColor: "#F8FAFC",
            outline: "none",
          }}
        />
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Notification bell */}
      <div style={{ position: "relative" }}>
        <button style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 6, color: "#475569", display: "flex", borderRadius: 8,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>notifications</span>
        </button>
        <span style={{
          position: "absolute", top: 2, right: 2,
          width: 16, height: 16, borderRadius: "50%",
          backgroundColor: "#B91C1C", color: "#fff",
          fontSize: "0.625rem", fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          lineHeight: 1,
        }}>3</span>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, backgroundColor: "#E2E8F0" }} />

      {/* Admin profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer" }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #B91C1C, #991B1B)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#fff" }}>person</span>
        </div>
        <div>
          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0F172A", lineHeight: 1.2 }}>Admin</div>
          <div style={{ fontSize: "0.6875rem", color: "#94A3B8", lineHeight: 1.2 }}>Super Admin</div>
        </div>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#94A3B8" }}>expand_more</span>
      </div>
    </header>
  );
}
