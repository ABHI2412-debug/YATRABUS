"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const BUSES = [
  { plate: "MH 31 AB 1234", type: "Volvo AC (Sleeper)",     seats: 40, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true  }, status: "Active",         serviced: "12 Aug 2026", busStyle: "silver" },
  { plate: "MH 40 CD 5678", type: "Scania AC (Sleeper)",    seats: 42, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true  }, status: "Active",         serviced: "28 Jul 2026", busStyle: "red"    },
  { plate: "MH 31 EF 9012", type: "Mercedes AC (Seater)",   seats: 49, amenities: { wifi: true,  charging: true,  blanket: false, gps: true  }, status: "In Maintenance", serviced: "02 Sep 2026", busStyle: "silver" },
  { plate: "MH 49 GH 3456", type: "Tata AC (Seater)",       seats: 52, amenities: { wifi: true,  charging: false, blanket: true,  gps: true  }, status: "Active",         serviced: "18 Aug 2026", busStyle: "red"    },
  { plate: "MH 12 IJ 7890", type: "Ashok Leyland (Seater)", seats: 45, amenities: { wifi: true,  charging: true,  blanket: false, gps: false }, status: "Retired",        serviced: "10 Jun 2026", busStyle: "silver" },
  { plate: "MH 31 KL 4321", type: "Volvo AC (Seater)",      seats: 48, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true  }, status: "Active",         serviced: "25 Aug 2026", busStyle: "red"    },
  { plate: "MH 14 MN 6789", type: "BharatBenz (Seater)",    seats: 50, amenities: { wifi: true,  charging: false, blanket: true,  gps: true  }, status: "In Maintenance", serviced: "05 Sep 2026", busStyle: "silver" },
  { plate: "MH 31 OP 2468", type: "Eicher (Seater)",        seats: 45, amenities: { wifi: true,  charging: true,  blanket: false, gps: true  }, status: "Active",         serviced: "30 Aug 2026", busStyle: "red"    },
  { plate: "MH 40 QR 1357", type: "Volvo AC (Sleeper)",     seats: 40, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true  }, status: "Active",         serviced: "16 Aug 2026", busStyle: "silver" },
  { plate: "MH 12 ST 9753", type: "Scania AC (Sleeper)",    seats: 42, amenities: { wifi: true,  charging: true,  blanket: true,  gps: true  }, status: "Active",         serviced: "21 Aug 2026", busStyle: "red"    },
];

const STATS = [
  { label: "Total Buses",    value: "48", icon: "directions_bus", bg: "#EFF6FF", color: "#2563EB", change: "+12%", comp: "vs last month", up: true  },
  { label: "Active Buses",   value: "40", icon: "directions_bus", bg: "#ECFDF5", color: "#059669", change: "+8%",  comp: "vs last month", up: true  },
  { label: "In Maintenance", value: "5",  icon: "build",          bg: "#FFFBEB", color: "#D97706", change: "-17%", comp: "vs last month", up: false },
  { label: "Retired Buses",  value: "3",  icon: "directions_bus", bg: "#FEF2F2", color: "#B91C1C", change: "−0%",  comp: "vs last month", up: null  },
];

const STATUS_MAP = {
  "Active":         { bg: "#F0FDF4", color: "#166534", dot: "#22C55E" },
  "In Maintenance": { bg: "#FFFBEB", color: "#92400E", dot: "#F59E0B" },
  "Retired":        { bg: "#FFF1F2", color: "#991B1B", dot: "#F87171" },
};

const AMENITY_ICONS = [
  { key: "wifi",     icon: "wifi",      color: "#B91C1C" },
  { key: "charging", icon: "bolt",      color: "#B91C1C" },
  { key: "blanket",  icon: "king_bed",  color: "#B91C1C" },
  { key: "gps",      icon: "gps_fixed", color: "#22C55E" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function BusThumbnail({ style }) {
  const isRed = style === "red";
  return (
    <div style={{
      width: 52, height: 36, borderRadius: 6, flexShrink: 0,
      backgroundColor: isRed ? "#FEF2F2" : "#F8FAFC",
      border: `1px solid ${isRed ? "#FEE2E2" : "#E2E8F0"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: 23, color: isRed ? "#B91C1C" : "#94A3B8" }}>directions_bus</span>
    </div>
  );
}

function AmenityIcons({ amenities }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {AMENITY_ICONS.map(({ key, icon, color }) =>
        amenities[key] ? (
          <span key={key} className="material-symbols-outlined" style={{ fontSize: 17, color }}>{icon}</span>
        ) : (
          <span key={key} style={{ fontSize: "0.875rem", color: "#CBD5E1", width: 17, textAlign: "center", display: "inline-block" }}>—</span>
        )
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || { bg: "#F1F5F9", color: "#475569", dot: "#94A3B8" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.375rem",
      padding: "0.25rem 0.625rem", borderRadius: 5,
      backgroundColor: s.bg, color: s.color,
      fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: s.dot, flexShrink: 0, display: "inline-block" }} />
      {status}
    </span>
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

export default function BusesPage() {
  const [search,       setSearch]       = useState("");
  const [typeFilter,   setTypeFilter]   = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filtered = BUSES.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.plate.toLowerCase().includes(q) || b.type.toLowerCase().includes(q);
    const matchType   = typeFilter === "All Types"   || b.type.toLowerCase().includes(typeFilter.toLowerCase());
    const matchStatus = statusFilter === "All Status" || b.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Buses</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
            Bus Fleet
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
            Manage your bus fleet, view details, and keep track of availability.
          </p>
        </div>
        <Link href="/buses/new" style={{
          display: "inline-flex", alignItems: "center", gap: "0.375rem",
          padding: "0.5625rem 1.125rem",
          backgroundColor: "#B91C1C", color: "#fff",
          border: "none", borderRadius: 8,
          fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 17 }}>add</span>
          Add New Bus
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
            <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: s.bg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 500, marginBottom: "0.125rem" }}>{s.label}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</div>
              {s.change && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", marginTop: "0.2rem" }}>
                  {s.up !== null && (
                    <span className="material-symbols-outlined" style={{ fontSize: 12, color: s.up ? "#16A34A" : "#DC2626" }}>
                      {s.up ? "arrow_upward" : "arrow_downward"}
                    </span>
                  )}
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: s.up === true ? "#16A34A" : s.up === false ? "#DC2626" : "#94A3B8" }}>{s.change}</span>
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
          <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
            <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 17, color: "#94A3B8", pointerEvents: "none" }}>search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by registration number, bus type..."
              style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem", color: "#0F172A", backgroundColor: "#F8FAFC", outline: "none" }}
            />
          </div>

          <div style={{ flex: 1 }} />

          {/* All Types */}
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: "0.4375rem 0.75rem", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem", color: "#475569", backgroundColor: "#fff", cursor: "pointer", outline: "none" }}>
            <option>All Types</option>
            <option>Sleeper</option>
            <option>Seater</option>
            <option>AC</option>
          </select>

          {/* All Status */}
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "0.4375rem 0.75rem", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem", color: "#475569", backgroundColor: "#fff", cursor: "pointer", outline: "none" }}>
            <option>All Status</option>
            <option>Active</option>
            <option>In Maintenance</option>
            <option>Retired</option>
          </select>

          {/* Sort */}
          <select style={{ padding: "0.4375rem 0.75rem", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem", color: "#475569", backgroundColor: "#fff", cursor: "pointer", outline: "none" }}>
            <option>Sort by: Latest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: Seats ↑</option>
            <option>Sort by: Seats ↓</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={TH}>Registration Plate #</th>
                <th style={TH}>Bus Type</th>
                <th style={TH}>Seat Count</th>
                <th style={TH}>Amenities</th>
                <th style={TH}>Status</th>
                <th style={TH}>Last Serviced</th>
                <th style={{ ...TH, textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, idx) => (
                <tr
                  key={b.plate}
                  style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F8FAFC" : "none" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FAFAFA"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  {/* Registration */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <Link
                      href={`/buses/${b.plate}/edit`}
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
                    >
                      <BusThumbnail style={b.busStyle} />
                      <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A", transition: "color 150ms" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#B91C1C"}
                        onMouseLeave={e => e.currentTarget.style.color = "#0F172A"}
                      >
                        {b.plate}
                      </span>
                    </Link>
                  </td>

                  {/* Bus Type */}
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#475569" }}>
                    <Link href={`/buses/${b.plate}/edit`} style={{ textDecoration: "none", color: "inherit", fontWeight: 500 }}>
                      {b.type}
                    </Link>
                  </td>

                  {/* Seat Count */}
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#64748B" }}>{b.seats}</td>

                  {/* Amenities */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <AmenityIcons amenities={b.amenities} />
                  </td>

                  {/* Status */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <StatusBadge status={b.status} />
                  </td>

                  {/* Last Serviced */}
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#64748B", whiteSpace: "nowrap" }}>{b.serviced}</td>

                  {/* Actions */}
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                    <Link
                      href={`/buses/${b.plate}/edit`}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.3rem",
                        padding: "0.3rem 0.75rem",
                        border: "1px solid #E2E8F0", borderRadius: 6,
                        backgroundColor: "#fff", color: "#475569",
                        fontSize: "0.8125rem", fontWeight: 500, textDecoration: "none",
                        transition: "all 150ms",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#F1F5F9"; e.currentTarget.style.color = "#0F172A"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#475569"; }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>edit</span>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: "0.875rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F1F5F9", flexWrap: "wrap", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>Showing 1 to 10 of 48 buses</span>
          <div style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
            </button>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} style={{ width: 30, height: 30, borderRadius: 6, border: n === 1 ? "none" : "1px solid #E2E8F0", backgroundColor: n === 1 ? "#B91C1C" : "#fff", color: n === 1 ? "#fff" : "#475569", fontSize: "0.8125rem", fontWeight: n === 1 ? 700 : 400, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</button>
            ))}
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
