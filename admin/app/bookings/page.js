"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";
import DateRangePicker from "@/components/ui/DateRangePicker";

// ── Dynamic Bookings State ───────────────────────────────────────────────────

const STATS = [
  { label: "Total Bookings", value: "1,248", icon: "confirmation_number", bg: "#EFF6FF", color: "#2563EB", change: "+ 12%", comp: "vs last month", up: true },
  { label: "Confirmed",      value: "892",   icon: "check_circle",          bg: "#ECFDF5", color: "#059669", change: "+ 8%",  comp: "vs last month", up: true },
  { label: "Pending",        value: "124",   icon: "schedule",              bg: "#FFFBEB", color: "#D97706", change: "+ 5%",  comp: "",              up: true },
  { label: "Cancelled",      value: "142",   icon: "cancel",                bg: "#FEF2F2", color: "#DC2626", change: "- 3%",  comp: "",              up: false },
  { label: "Refunded",       value: "90",    icon: "restart_alt",           bg: "#F5F3FF", color: "#7C3AED", change: "+ 2%",  comp: "",              up: true },
];

const STATUS_MAP = {
  "Confirmed": { bg: "#DCFCE7", color: "#166534", dot: "#16A34A" },
  "Pending":   { bg: "#FEF3C7", color: "#92400E", dot: "#D97706" },
  "Cancelled": { bg: "#FEE2E2", color: "#991B1B", dot: "#DC2626" },
  "Refunded":  { bg: "#EDE9FE", color: "#5B21B6", dot: "#7C3AED" },
};

// ── Page Component ────────────────────────────────────────────────────────────

export default function BusBookingsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [routeFilter, setRouteFilter] = useState("All Routes");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("adminToken") || localStorage.getItem("token") || ""}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          const colors = ["#2563EB", "#D97706", "#059669", "#DC2626", "#0284C7", "#7C3AED", "#16A34A", "#EA580C", "#0D9488", "#E11D48"];
          const formatted = data.map((b, i) => {
             const tripDate = b.trip?.departureDatetime ? new Date(b.trip.departureDatetime) : new Date();
             const userName = b.user?.name || "Guest";
             return {
                id: "BK" + b.id.substring(0, 6).toUpperCase(), // Display shortened ID
                realId: b.id,
                user: userName,
                phone: b.user?.phone || "N/A",
                initials: userName.substring(0, 2).toUpperCase(),
                color: colors[i % colors.length],
                from: b.trip?.route?.originCity || "Unknown",
                to: b.trip?.route?.destinationCity || "Unknown",
                via: (b.trip?.route?.waypoints || []).join(", ") || "-",
                date: tripDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
                day: tripDate.toLocaleDateString("en-GB", { weekday: "short" }),
                seats: b.seatNumbers || [],
                amount: `₹ ${Number(b.totalAmount || 0).toLocaleString()}`,
                status: b.status || "Pending"
             };
          });
          setBookings(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filtered = bookings.filter(b => {
    const matchTab = activeTab === "All" || b.status === activeTab;
    const q = search.toLowerCase();
    const matchSearch = !q || b.id.toLowerCase().includes(q) || b.user.toLowerCase().includes(q) || b.phone.includes(q);
    const matchRoute = routeFilter === "All Routes" || `${b.from} → ${b.to}`.includes(routeFilter);
    return matchTab && matchSearch && matchRoute;
  });

  const TH = {
    padding: "0.625rem 0.875rem",
    textAlign: "left",
    fontSize: "0.6875rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: "#94A3B8",
    textTransform: "uppercase",
    backgroundColor: "#F8FAFC",
    borderBottom: "1px solid #E2E8F0",
    whiteSpace: "nowrap",
  };

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Bookings</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
            Bus Bookings
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
            View and manage all bus ticket bookings. Search, filter and take action as needed.
          </p>
        </div>
        <button style={{
          display: "inline-flex", alignItems: "center", gap: "0.375rem",
          padding: "0.5625rem 1.125rem",
          backgroundColor: "#fff", color: "#0F172A",
          border: "1px solid #E2E8F0", borderRadius: 8,
          fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 17 }}>download</span>
          Export
        </button>
      </div>

      {/* 5 Stats Cards Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        {STATS.map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 12, padding: "1rem 1.125rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9",
            display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              backgroundColor: s.bg, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 500, marginBottom: "0.15rem" }}>{s.label}</div>
              <div style={{ fontSize: "1.375rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.02em" }}>{s.value}</div>
              {s.change && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", marginTop: "0.25rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 12, color: s.up ? "#16A34A" : "#DC2626" }}>
                    {s.up ? "arrow_upward" : "arrow_downward"}
                  </span>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: s.up ? "#16A34A" : "#DC2626" }}>{s.change}</span>
                  {s.comp && <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>{s.comp}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9", overflow: "hidden" }}>
        
        {/* Filters Top Bar */}
        <div style={{ padding: "1rem 1.25rem 0.75rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Search Box */}
          <div style={{ position: "relative", flex: 1, minWidth: 260 }}>
            <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 17, color: "#94A3B8", pointerEvents: "none" }}>search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by booking ID, name or phone number..."
              style={{
                width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem",
                color: "#0F172A", backgroundColor: "#F8FAFC", outline: "none"
              }}
            />
          </div>

          {/* Interactive Date Range Picker */}
          <DateRangePicker initialStart="15 Sep 2026" initialEnd="30 Sep 2026" />

          {/* Route Dropdown */}
          <select
            value={routeFilter}
            onChange={e => setRouteFilter(e.target.value)}
            style={{
              padding: "0.4375rem 0.75rem", border: "1px solid #E2E8F0",
              borderRadius: 8, fontSize: "0.8125rem", color: "#475569",
              backgroundColor: "#fff", cursor: "pointer", outline: "none"
            }}
          >
            <option>All Routes</option>
            <option>Nagpur → Pune</option>
            <option>Pune → Mumbai</option>
            <option>Nagpur → Hyderabad</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => { setSearch(""); setRouteFilter("All Routes"); setActiveTab("All"); }}
            style={{
              display: "flex", alignItems: "center", gap: "0.3rem",
              padding: "0.4375rem 0.75rem", border: "1px solid #E2E8F0",
              borderRadius: 8, backgroundColor: "#fff", color: "#475569",
              fontSize: "0.8125rem", cursor: "pointer"
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>refresh</span>
            Clear Filters
          </button>
        </div>

        {/* Tab Badges */}
        <div style={{ padding: "0 1.25rem 0.875rem", display: "flex", gap: "0.5rem", borderBottom: "1px solid #F1F5F9" }}>
          {[
            { label: `All (${bookings.length})`,       key: "All",       color: "#B91C1C", bg: "#B91C1C" },
            { label: `Confirmed (${bookings.filter(b=>b.status==="Confirmed").length})`,   key: "Confirmed", dot: "#16A34A" },
            { label: `Pending (${bookings.filter(b=>b.status==="Pending").length})`,     key: "Pending",   dot: "#D97706" },
            { label: `Cancelled (${bookings.filter(b=>b.status==="Cancelled").length})`,   key: "Cancelled", dot: "#DC2626" },
            { label: `Refunded (${bookings.filter(b=>b.status==="Refunded").length})`,     key: "Refunded",  dot: "#7C3AED" },
          ].map(tab => {
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.375rem 0.75rem", borderRadius: 20,
                  fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                  border: isSelected && tab.key === "All" ? "none" : isSelected ? `1.5px solid ${tab.dot}` : "1px solid #E2E8F0",
                  backgroundColor: isSelected && tab.key === "All" ? "#B91C1C" : isSelected ? "#F8FAFC" : "#fff",
                  color: isSelected && tab.key === "All" ? "#fff" : isSelected ? "#0F172A" : "#64748B",
                  transition: "all 150ms",
                }}
              >
                {tab.dot && (
                  <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: tab.dot, display: "inline-block" }} />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Data Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={TH}>Booking ID</th>
                <th style={TH}>User Details</th>
                <th style={TH}>Route</th>
                <th style={TH}>Travel Date</th>
                <th style={TH}>Seats</th>
                <th style={TH}>Total Amount</th>
                <th style={TH}>Status</th>
                <th style={{ ...TH, textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "#64748B" }}>
                    Loading bookings...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "#64748B" }}>
                    No bookings found.
                  </td>
                </tr>
              ) : filtered.map((b, idx) => {
                const s = STATUS_MAP[b.status] || STATUS_MAP["Pending"];

                return (
                  <tr
                    key={b.id}
                    style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F8FAFC" : "none" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FAFAFA"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {/* Booking ID */}
                    <td style={{ padding: "0.875rem 0.875rem", fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A", whiteSpace: "nowrap" }}>
                      {b.id}
                    </td>

                    {/* User Details */}
                    <td style={{ padding: "0.875rem 0.875rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: "50%",
                          backgroundColor: `${b.color}15`, border: `1.5px solid ${b.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.72rem", fontWeight: 700, color: b.color, flexShrink: 0
                        }}>
                          {b.initials}
                        </div>
                        <div>
                          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0F172A" }}>{b.user}</div>
                          <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>{b.phone}</div>
                        </div>
                      </div>
                    </td>

                    {/* Route */}
                    <td style={{ padding: "0.875rem 0.875rem" }}>
                      <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0F172A" }}>
                        {b.from} <span style={{ color: "#B91C1C" }}>→</span> {b.to}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>Via {b.via}</div>
                    </td>

                    {/* Travel Date */}
                    <td style={{ padding: "0.875rem 0.875rem", whiteSpace: "nowrap" }}>
                      <div style={{ fontSize: "0.8125rem", color: "#475569" }}>{b.date}</div>
                      <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>{b.day}</div>
                    </td>

                    {/* Seats */}
                    <td style={{ padding: "0.875rem 0.875rem" }}>
                      <span style={{
                        display: "inline-block", padding: "0.2rem 0.5rem", borderRadius: 4,
                        backgroundColor: "#F1F5F9", color: "#475569", fontSize: "0.75rem", fontWeight: 600
                      }}>
                        {b.seats.join(", ")}
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td style={{ padding: "0.875rem 0.875rem", fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>
                      {b.amount}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "0.875rem 0.875rem" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "0.35rem",
                        padding: "0.25rem 0.625rem", borderRadius: 5,
                        backgroundColor: s.bg, color: s.color,
                        fontSize: "0.72rem", fontWeight: 600, whiteSpace: "nowrap"
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: s.dot, display: "inline-block" }} />
                        {b.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "0.875rem 0.875rem" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}>
                        <Link
                          href={`/bookings/${b.realId}`}

                          style={{
                            display: "inline-flex", alignItems: "center", gap: "0.25rem",
                            padding: "0.3rem 0.625rem", borderRadius: 6,
                            border: "1px solid #E2E8F0", backgroundColor: "#fff",
                            color: "#475569", fontSize: "0.75rem", fontWeight: 500,
                            textDecoration: "none"
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>visibility</span>
                          View
                        </Link>
                        <button style={{
                          width: 28, height: 28, borderRadius: 6,
                          border: "1px solid #E2E8F0", backgroundColor: "#fff",
                          color: "#94A3B8", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div style={{
          padding: "0.875rem 1.25rem", display: "flex", alignItems: "center",
          justifyContent: "space-between", borderTop: "1px solid #F1F5F9",
          flexWrap: "wrap", gap: "0.75rem"
        }}>
          <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
            Showing {filtered.length} bookings
          </span>

          <div style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
            </button>
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                style={{
                  width: 30, height: 30, borderRadius: 6,
                  border: n === 1 ? "none" : "1px solid #E2E8F0",
                  backgroundColor: n === 1 ? "#B91C1C" : "#fff",
                  color: n === 1 ? "#fff" : "#475569",
                  fontSize: "0.8125rem", fontWeight: n === 1 ? 700 : 400,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                }}
              >
                {n}
              </button>
            ))}
            <span style={{ color: "#94A3B8", fontSize: "0.875rem" }}>...</span>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", color: "#475569", fontSize: "0.8125rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              125
            </button>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
