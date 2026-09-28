"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const USERS = [
  { id: "U10023", name: "Rahul Sharma",    email: "rahul.sharma@gmail.com",  phone: "+91 98765 43210", registered: "12 Jan 2025", bookings: 14, status: "Active",  color: "#4F46E5" },
  { id: "U10024", name: "Sneha Patel",     email: "sneha.patel@gmail.com",   phone: "+91 87654 32109", registered: "08 Jan 2025", bookings: 8,  status: "Active",  color: "#D97706" },
  { id: "U10025", name: "Amit Verma",      email: "amit.verma@outlook.com",  phone: "+91 76543 21098", registered: "05 Jan 2025", bookings: 3,  status: "Blocked", color: "#059669" },
  { id: "U10026", name: "Priya Deshmukh",  email: "priya.d@email.com",       phone: "+91 99887 77665", registered: "03 Jan 2025", bookings: 12, status: "Active",  color: "#7C3AED" },
  { id: "U10027", name: "Vikram Singh",    email: "vikram.singh@gmail.com",  phone: "+91 91234 56789", registered: "28 Dec 2024", bookings: 6,  status: "Active",  color: "#B91C1C" },
  { id: "U10028", name: "Neha Gupta",      email: "neha.gupta@icloud.com",   phone: "+91 88776 65544", registered: "22 Dec 2024", bookings: 9,  status: "Blocked", color: "#0D9488" },
  { id: "U10029", name: "Arjun Mehta",     email: "arjun.mehta@gmail.com",   phone: "+91 77665 44332", registered: "18 Dec 2024", bookings: 2,  status: "Active",  color: "#EA580C" },
  { id: "U10030", name: "Kavya Nair",      email: "kavya.nair@email.com",    phone: "+91 99876 55443", registered: "12 Dec 2024", bookings: 5,  status: "Active",  color: "#DB2777" },
  { id: "U10031", name: "Rohit Kulkarni",  email: "rohit.k@outlook.com",     phone: "+91 96655 44321", registered: "07 Dec 2024", bookings: 11, status: "Active",  color: "#2563EB" },
  { id: "U10032", name: "Ananya Reddy",    email: "ananya.reddy@gmail.com",  phone: "+91 95544 33321", registered: "01 Dec 2024", bookings: 4,  status: "Blocked", color: "#9333EA" },
];

const STATS = [
  { label: "Total Users",            value: "12,580", icon: "group",      bg: "#EEF2FF", color: "#4F46E5" },
  { label: "Active Users",           value: "11,240", icon: "person",     bg: "#ECFDF5", color: "#059669", change: "+5.2%",  comp: "vs last month" },
  { label: "Blocked Users",          value: "892",    icon: "person_off", bg: "#FEF2F2", color: "#DC2626" },
  { label: "New Users (This Month)", value: "448",    icon: "person_add", bg: "#F5F3FF", color: "#7C3AED", change: "+12.6%", comp: "vs last month" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ name, color }) {
  const initials = name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
      backgroundColor: color + "18",
      border: `1.5px solid ${color}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ fontSize: "0.75rem", fontWeight: 700, color }}>{initials}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const active = status === "Active";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.25rem",
      padding: "0.25rem 0.625rem", borderRadius: 5,
      backgroundColor: active ? "#DCFCE7" : "#FEE2E2",
      color: active ? "#166534" : "#991B1B",
      fontSize: "0.75rem", fontWeight: 600,
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
        {active ? "check_circle" : "block"}
      </span>
      {status}
    </span>
  );
}

function IconBtn({ icon, title, hoverColor = "#F1F5F9" }) {
  return (
    <button
      title={title}
      style={{
        background: "none", border: "1px solid #E2E8F0",
        borderRadius: 6, cursor: "pointer", padding: "0.3rem",
        color: "#94A3B8", display: "flex", alignItems: "center",
        transition: "all 150ms",
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = hoverColor; e.currentTarget.style.color = "#475569"; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#94A3B8"; }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{icon}</span>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const filtered = USERS.filter((u) => {
    const matchFilter = filter === "All" || u.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q);
    return matchFilter && matchSearch;
  });

  const toggleAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((u) => u.id));
  };
  const toggleOne = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  const FILTERS = [
    { label: `All (12,580)`,   key: "All" },
    { label: `Active (11,240)`, key: "Active" },
    { label: `Blocked (892)`,  key: "Blocked" },
  ];

  const TH = { padding: "0.625rem 1rem", textAlign: "left", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", color: "#94A3B8", textTransform: "uppercase", backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0", whiteSpace: "nowrap" };

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.75rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Users</span>
      </div>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
            User Management
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
            Manage registered users, view details, and control access.
          </p>
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: "0.375rem",
          padding: "0.5625rem 1.125rem",
          backgroundColor: "#B91C1C", color: "#fff",
          border: "none", borderRadius: 8,
          fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 17 }}>add</span>
          Add User
        </button>
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
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.2rem" }}>{s.label}</div>
              {s.change && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", marginTop: "0.2rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 12, color: "#16A34A" }}>arrow_upward</span>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#16A34A" }}>{s.change}</span>
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
        <div style={{ padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid #F1F5F9", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1", minWidth: 240, maxWidth: 380 }}>
            <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 17, color: "#94A3B8", pointerEvents: "none" }}>search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or phone..."
              style={{
                width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: "1px solid #E2E8F0", borderRadius: 8,
                fontSize: "0.8125rem", color: "#0F172A",
                backgroundColor: "#F8FAFC", outline: "none",
              }}
            />
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: "0.4375rem 1rem",
                  borderRadius: 20,
                  border: filter === f.key ? "none" : "1px solid #E2E8F0",
                  backgroundColor: filter === f.key ? "#B91C1C" : "#fff",
                  color: filter === f.key ? "#fff" : "#475569",
                  fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer",
                  transition: "all 150ms",
                  whiteSpace: "nowrap",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div style={{ marginLeft: "auto" }}>
            <select style={{
              padding: "0.4375rem 0.75rem",
              border: "1px solid #E2E8F0", borderRadius: 8,
              fontSize: "0.8125rem", color: "#475569",
              backgroundColor: "#fff", cursor: "pointer", outline: "none",
            }}>
              <option>Sort by: Latest</option>
              <option>Sort by: Oldest</option>
              <option>Sort by: Name A-Z</option>
              <option>Sort by: Most Bookings</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...TH, width: 44, paddingRight: 0 }}>
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    style={{ cursor: "pointer", accentColor: "#B91C1C", width: 15, height: 15 }}
                  />
                </th>
                <th style={TH}>User</th>
                <th style={TH}>Email</th>
                <th style={TH}>Phone</th>
                <th style={TH}>Registered On</th>
                <th style={TH}>Total Bookings</th>
                <th style={TH}>Status</th>
                <th style={{ ...TH, textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, idx) => {
                const isSelected = selected.includes(u.id);
                return (
                  <tr
                    key={u.id}
                    style={{
                      borderBottom: idx < filtered.length - 1 ? "1px solid #F8FAFC" : "none",
                      backgroundColor: isSelected ? "#FEF2F2" : "transparent",
                      transition: "background-color 100ms",
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = "#FAFAFA"; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    {/* Checkbox */}
                    <td style={{ padding: "0.875rem 0.5rem 0.875rem 1rem", width: 44 }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(u.id)}
                        style={{ cursor: "pointer", accentColor: "#B91C1C", width: 15, height: 15 }}
                      />
                    </td>

                    {/* User */}
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <Link href={`/users/${u.id}`} style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
                        <Avatar name={u.name} color={u.color} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0F172A", transition: "color 150ms" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#B91C1C"}
                            onMouseLeave={e => e.currentTarget.style.color = "#0F172A"}
                          >
                            {u.name}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: 1 }}>#{u.id}</div>
                        </div>
                      </Link>
                    </td>

                    {/* Email */}
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.8125rem", color: "#475569" }}>
                      <Link href={`/users/${u.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {u.email}
                      </Link>
                    </td>

                    {/* Phone */}
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.8125rem", color: "#475569", whiteSpace: "nowrap" }}>
                      <Link href={`/users/${u.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {u.phone}
                      </Link>
                    </td>

                    {/* Registered */}
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.8125rem", color: "#64748B", whiteSpace: "nowrap" }}>{u.registered}</td>

                    {/* Bookings */}
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: 600, color: "#0F172A", textAlign: "center" }}>{u.bookings}</td>

                    {/* Status */}
                    <td style={{ padding: "0.75rem 1rem" }}><StatusBadge status={u.status} /></td>

                    {/* Actions */}
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}>
                        <Link href={`/users/${u.id}`} style={{ textDecoration: "none" }}>
                          <IconBtn icon="visibility" title="View user" />
                        </Link>
                        <IconBtn icon="block" title={u.status === "Active" ? "Block user" : "Unblock user"} hoverColor="#FEF2F2" />
                        <IconBtn icon="delete" title="Delete user" hoverColor="#FEF2F2" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          padding: "0.875rem 1.25rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid #F1F5F9",
          flexWrap: "wrap", gap: "0.75rem",
        }}>
          <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>
            Showing 1 to 10 of 12,580 users
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            {/* Prev */}
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

            <span style={{ fontSize: "0.875rem", color: "#94A3B8", padding: "0 0.25rem" }}>...</span>
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", color: "#475569", fontSize: "0.8125rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>1,258</button>

            {/* Next */}
            <button style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.8125rem", color: "#64748B" }}>Rows per page</span>
            <select style={{
              padding: "0.25rem 0.5rem", border: "1px solid #E2E8F0",
              borderRadius: 6, fontSize: "0.8125rem", color: "#475569",
              backgroundColor: "#fff", cursor: "pointer", outline: "none",
            }}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
