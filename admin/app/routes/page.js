"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const INITIAL_ROUTES = [
  { id: "RT001", from: "Nagpur",    to: "Pune",        stops: 2, distance: 710, duration: "12h 30m", active: true  },
  { id: "RT002", from: "Mumbai",    to: "Nashik",      stops: 1, distance: 167, duration: "3h 45m",  active: true  },
  { id: "RT003", from: "Delhi",     to: "Jaipur",      stops: 2, distance: 280, duration: "5h 30m",  active: true  },
  { id: "RT004", from: "Bangalore", to: "Hyderabad",   stops: 1, distance: 570, duration: "10h 15m", active: true  },
  { id: "RT005", from: "Ahmedabad", to: "Udaipur",     stops: 3, distance: 260, duration: "6h 20m",  active: false },
  { id: "RT006", from: "Chennai",   to: "Bangalore",   stops: 1, distance: 350, duration: "6h 10m",  active: true  },
  { id: "RT007", from: "Kolkata",   to: "Bhubaneswar", stops: 2, distance: 440, duration: "8h 45m",  active: true  },
  { id: "RT008", from: "Indore",    to: "Bhopal",      stops: 1, distance: 190, duration: "4h 5m",   active: true  },
  { id: "RT009", from: "Lucknow",   to: "Varanasi",    stops: 2, distance: 320, duration: "7h 30m",  active: false },
  { id: "RT010", from: "Surat",     to: "Mumbai",      stops: 1, distance: 280, duration: "5h 20m",  active: true  },
];

const STATS = [
  { label: "Total Routes",    value: "245", icon: "location_on",  bg: "#FEF2F2", color: "#B91C1C", change: "+12%", comp: "vs last month", up: true  },
  { label: "Active Routes",   value: "218", icon: "play_circle",  bg: "#ECFDF5", color: "#059669", change: "+8%",  comp: "vs last month", up: true  },
  { label: "Inactive Routes", value: "27",  icon: "pause_circle", bg: "#F8FAFC", color: "#64748B", change: "-5%",  comp: "vs last month", up: false },
  { label: "Total Cities",    value: "89",  icon: "map",          bg: "#F5F3FF", color: "#7C3AED" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Toggle({ active, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 38, height: 20, borderRadius: 10,
        backgroundColor: active ? "#22C55E" : "#EF4444",
        position: "relative", cursor: "pointer",
        transition: "background-color 200ms ease",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute",
        top: 2,
        left: active ? 19 : 2,
        width: 16, height: 16, borderRadius: "50%",
        backgroundColor: "#fff",
        transition: "left 200ms ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
      }} />
    </div>
  );
}

const TH = {
  padding: "0.625rem 1rem",
  textAlign: "left",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "#94A3B8",
  textTransform: "uppercase",
  backgroundColor: "#F8FAFC",
  borderBottom: "1px solid #E2E8F0",
  whiteSpace: "nowrap",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RoutesPage() {
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const toggleActive = (id) => {
    setRoutes((prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r));
  };

  const filtered = routes.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.id.toLowerCase().includes(q) || r.from.toLowerCase().includes(q) || r.to.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All Status" || (statusFilter === "Active" ? r.active : !r.active);
    return matchSearch && matchStatus;
  });

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Routes</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
            Bus Routes
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
            Manage bus routes, cities, and route information.
          </p>
        </div>
        <Link href="/routes/new" style={{
          display: "inline-flex", alignItems: "center", gap: "0.375rem",
          padding: "0.5625rem 1.125rem",
          backgroundColor: "#B91C1C", color: "#fff",
          border: "none", borderRadius: 8,
          fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 17 }}>add</span>
          Add New Route
        </Link>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        {STATS.map((s) => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 12,
            padding: "1rem 1.25rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            border: "1px solid #F1F5F9",
            display: "flex", alignItems: "center", gap: "0.875rem",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              backgroundColor: s.bg, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 500, marginBottom: "0.125rem" }}>{s.label}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</div>
              {s.change && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", marginTop: "0.2rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 12, color: s.up ? "#16A34A" : "#DC2626" }}>
                    {s.up ? "arrow_upward" : "arrow_downward"}
                  </span>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: s.up ? "#16A34A" : "#DC2626" }}>{s.change}</span>
                  <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>{s.comp}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #F1F5F9", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid #F1F5F9" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
            <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 17, color: "#94A3B8", pointerEvents: "none" }}>search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by route ID, city name..."
              style={{
                width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: "1px solid #E2E8F0", borderRadius: 8,
                fontSize: "0.8125rem", color: "#0F172A",
                backgroundColor: "#F8FAFC", outline: "none",
              }}
            />
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "0.4375rem 0.75rem",
              border: "1px solid #E2E8F0", borderRadius: 8,
              fontSize: "0.8125rem", color: "#475569",
              backgroundColor: "#fff", cursor: "pointer", outline: "none",
            }}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          {/* Sort */}
          <select style={{
            padding: "0.4375rem 0.75rem",
            border: "1px solid #E2E8F0", borderRadius: 8,
            fontSize: "0.8125rem", color: "#475569",
            backgroundColor: "#fff", cursor: "pointer", outline: "none",
          }}>
            <option>Sort by: Latest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: Distance ↑</option>
            <option>Sort by: Distance ↓</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Route ID", "From City", "To City", "Stops", "Distance (KM)", "Duration", "Status", "Actions"].map((h) => (
                  <th key={h} style={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => (
                <tr
                  key={r.id}
                  style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F8FAFC" : "none" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FAFAFA"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  {/* Route ID */}
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>
                    <Link
                      href={`/routes/${r.id}/edit`}
                      style={{ color: "#B91C1C", textDecoration: "none", display: "inline-block" }}
                    >
                      {r.id}
                    </Link>
                  </td>

                  {/* From */}
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#475569" }}>
                    <Link href={`/routes/${r.id}/edit`} style={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}>
                      {r.from}
                    </Link>
                  </td>

                  {/* To */}
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#475569" }}>
                    <Link href={`/routes/${r.id}/edit`} style={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}>
                      {r.to}
                    </Link>
                  </td>

                  {/* Stops */}
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#64748B", textAlign: "center" }}>{r.stops}</td>

                  {/* Distance */}
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#64748B" }}>{r.distance}</td>

                  {/* Duration */}
                  <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", color: "#64748B", whiteSpace: "nowrap" }}>{r.duration}</td>

                  {/* Status — Toggle + badge */}
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Toggle active={r.active} onToggle={() => toggleActive(r.id)} />
                      <span style={{
                        fontSize: "0.75rem", fontWeight: 600,
                        color: r.active ? "#166534" : "#991B1B",
                        backgroundColor: r.active ? "#DCFCE7" : "#FEE2E2",
                        padding: "0.2rem 0.5rem", borderRadius: 4,
                      }}>
                        {r.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Link href={`/routes/${r.id}/edit`} style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 30, height: 30, borderRadius: 6,
                        border: "1px solid #E2E8F0", backgroundColor: "#fff",
                        color: "#64748B", textDecoration: "none",
                        transition: "all 150ms",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#F1F5F9"; e.currentTarget.style.color = "#0F172A"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#64748B"; }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>edit</span>
                      </Link>
                      <button style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 30, height: 30, borderRadius: 6,
                        border: "1px solid #FEE2E2", backgroundColor: "#FFF5F5",
                        color: "#B91C1C", cursor: "pointer",
                        transition: "all 150ms",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#FEE2E2"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FFF5F5"; }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          padding: "0.875rem 1.25rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid #F1F5F9", flexWrap: "wrap", gap: "0.75rem",
        }}>
          <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>Showing 1 to 10 of 245 routes</span>

          <div style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
            </button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} style={{
                width: 30, height: 30, borderRadius: 6,
                border: n === 1 ? "none" : "1px solid #E2E8F0",
                backgroundColor: n === 1 ? "#B91C1C" : "#fff",
                color: n === 1 ? "#fff" : "#475569",
                fontSize: "0.8125rem", fontWeight: n === 1 ? 700 : 400,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>{n}</button>
            ))}
            <span style={{ fontSize: "0.875rem", color: "#94A3B8", padding: "0 0.125rem" }}>...</span>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", color: "#475569", fontSize: "0.8125rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>25</button>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
