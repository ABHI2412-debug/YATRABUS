"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";
import DateRangePicker from "@/components/ui/DateRangePicker";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const PACKAGE_BOOKINGS = [
  {
    id: "PKG10042",
    user: "Amit Sharma",
    phone: "+91 98765 43210",
    initials: "AS",
    color: "#2563EB",
    pkgName: "Kedarnath Yatra",
    duration: "5D/4N",
    region: "Uttarakhand",
    category: "Spiritual",
    catIcon: "temple_hindu",
    thumb: "kedarnath",
    deptDate: "15 Oct 2026",
    deptDay: "Thu",
    travellers: 2,
    amount: "₹ 28,500",
    status: "Confirmed",
  },
  {
    id: "PKG10041",
    user: "Riya Patel",
    phone: "+91 87654 32109",
    initials: "RP",
    color: "#D97706",
    pkgName: "Goa Beach Getaway",
    duration: "4D/3N",
    region: "Goa",
    category: "Domestic",
    catIcon: "landscape",
    thumb: "goa",
    deptDate: "18 Oct 2026",
    deptDay: "Sun",
    travellers: 4,
    amount: "₹ 32,000",
    status: "Pending",
  },
  {
    id: "PKG10040",
    user: "Vikram Kulkarni",
    phone: "+91 99887 66543",
    initials: "VK",
    color: "#059669",
    pkgName: "Dubai Explorer",
    duration: "6D/5N",
    region: "UAE",
    category: "International",
    catIcon: "public",
    thumb: "dubai",
    deptDate: "22 Oct 2026",
    deptDay: "Thu",
    travellers: 2,
    amount: "₹ 78,000",
    status: "Confirmed",
  },
  {
    id: "PKG10039",
    user: "Neha Singh",
    phone: "+91 91234 56789",
    initials: "NS",
    color: "#DC2626",
    pkgName: "Char Dham Yatra",
    duration: "10D/9N",
    region: "Uttarakhand",
    category: "Spiritual",
    catIcon: "temple_hindu",
    thumb: "chardham",
    deptDate: "05 Nov 2026",
    deptDay: "Thu",
    travellers: 6,
    amount: "₹ 1,08,000",
    status: "Cancelled",
  },
  {
    id: "PKG10038",
    user: "Karan Tiwari",
    phone: "+91 98712 34567",
    initials: "KT",
    color: "#0284C7",
    pkgName: "Himachal Highlights",
    duration: "6D/5N",
    region: "Himachal",
    category: "Domestic",
    catIcon: "landscape",
    thumb: "himachal",
    deptDate: "12 Nov 2026",
    deptDay: "Thu",
    travellers: 3,
    amount: "₹ 45,600",
    status: "Confirmed",
  },
  {
    id: "PKG10037",
    user: "Sneha Patil",
    phone: "+91 87654 98721",
    initials: "SP",
    color: "#7C3AED",
    pkgName: "Europe Essentials",
    duration: "8D/7N",
    region: "Europe",
    category: "International",
    catIcon: "public",
    thumb: "europe",
    deptDate: "20 Nov 2026",
    deptDay: "Fri",
    travellers: 2,
    amount: "₹ 1,25,000",
    status: "Pending",
  },
  {
    id: "PKG10036",
    user: "Ananya Rao",
    phone: "+91 90123 45678",
    initials: "AR",
    color: "#EA580C",
    pkgName: "Varanasi Spiritual Tour",
    duration: "4D/3N",
    region: "Uttar Pradesh",
    category: "Spiritual",
    catIcon: "temple_hindu",
    thumb: "varanasi",
    deptDate: "28 Nov 2026",
    deptDay: "Sat",
    travellers: 5,
    amount: "₹ 36,000",
    status: "Confirmed",
  },
  {
    id: "PKG10035",
    user: "Mohit Jain",
    phone: "+91 99876 54321",
    initials: "MJ",
    color: "#0D9488",
    pkgName: "Kerala Backwaters",
    duration: "5D/4N",
    region: "Kerala",
    category: "Domestic",
    catIcon: "landscape",
    thumb: "kerala",
    deptDate: "02 Dec 2026",
    deptDay: "Wed",
    travellers: 2,
    amount: "₹ 41,500",
    status: "Refunded",
  },
  {
    id: "PKG10034",
    user: "Pooja Deshmukh",
    phone: "+91 76543 21098",
    initials: "PD",
    color: "#E11D48",
    pkgName: "Singapore Delight",
    duration: "5D/4N",
    region: "Singapore",
    category: "International",
    catIcon: "public",
    thumb: "singapore",
    deptDate: "10 Dec 2026",
    deptDay: "Thu",
    travellers: 3,
    amount: "₹ 92,000",
    status: "Confirmed",
  },
  {
    id: "PKG10033",
    user: "Siddharth Kumar",
    phone: "+91 98711 22334",
    initials: "SK",
    color: "#16A34A",
    pkgName: "Rajasthan Heritage",
    duration: "6D/5N",
    region: "Rajasthan",
    category: "Domestic",
    catIcon: "landscape",
    thumb: "rajasthan",
    deptDate: "15 Dec 2026",
    deptDay: "Tue",
    travellers: 4,
    amount: "₹ 58,000",
    status: "Pending",
  },
];

const STATS = [
  { label: "Total Bookings", value: "426", icon: "luggage",       bg: "#EFF6FF", color: "#B91C1C", change: "+ 12%", comp: "vs last month", up: true },
  { label: "Confirmed",      value: "298", icon: "check_circle",  bg: "#ECFDF5", color: "#059669", change: "+ 8%",  comp: "vs last month", up: true },
  { label: "Pending",        value: "64",  icon: "schedule",      bg: "#FFFBEB", color: "#D97706", change: "+ 5%",  comp: "vs last month", up: true },
  { label: "Cancelled",      value: "42",  icon: "cancel",        bg: "#FEF2F2", color: "#DC2626", change: "- 3%",  comp: "vs last month", up: false },
  { label: "Refunded",       value: "22",  icon: "restart_alt",   bg: "#F5F3FF", color: "#7C3AED", change: "+ 10%", comp: "vs last month", up: true },
];

const CATEGORY_STYLES = {
  "Spiritual":     { bg: "#FEF3C7", color: "#B45309", icon: "temple_hindu" },
  "Domestic":      { bg: "#CCFBF1", color: "#0F766E", icon: "landscape" },
  "International": { bg: "#E0E7FF", color: "#4338CA", icon: "public" },
};

const STATUS_MAP = {
  "Confirmed": { bg: "#DCFCE7", color: "#166534", dot: "#16A34A" },
  "Pending":   { bg: "#FEF3C7", color: "#92400E", dot: "#D97706" },
  "Cancelled": { bg: "#FEE2E2", color: "#991B1B", dot: "#DC2626" },
  "Refunded":  { bg: "#EDE9FE", color: "#5B21B6", dot: "#7C3AED" },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function PackageBookingsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filtered = PACKAGE_BOOKINGS.filter(b => {
    const matchTab = activeTab === "All" || b.category === activeTab;
    const q = search.toLowerCase();
    const matchSearch = !q || b.id.toLowerCase().includes(q) || b.user.toLowerCase().includes(q) || b.pkgName.toLowerCase().includes(q);
    const matchCat = categoryFilter === "All Categories" || b.category === categoryFilter;
    return matchTab && matchSearch && matchCat;
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
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Package Bookings</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
            Package Bookings
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
            View and manage all holiday package bookings. Search, filter and take action as needed.
          </p>
        </div>
        <Link href="/packages/new" style={{
          display: "inline-flex", alignItems: "center", gap: "0.375rem",
          padding: "0.5625rem 1.125rem",
          backgroundColor: "#B91C1C", color: "#fff",
          border: "none", borderRadius: 8,
          fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
          boxShadow: "0 1px 2px rgba(185,28,28,0.2)"
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 17 }}>add</span>
          New Package Booking
        </Link>
      </div>

      {/* 5 Metric Summary Cards */}
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
              placeholder="Search by booking ID, user name or package..."
              style={{
                width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem",
                color: "#0F172A", backgroundColor: "#F8FAFC", outline: "none"
              }}
            />
          </div>

          {/* Interactive Date Range Picker */}
          <DateRangePicker initialStart="15 Sep 2026" initialEnd="30 Sep 2026" />

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            style={{
              padding: "0.4375rem 0.75rem", border: "1px solid #E2E8F0",
              borderRadius: 8, fontSize: "0.8125rem", color: "#475569",
              backgroundColor: "#fff", cursor: "pointer", outline: "none"
            }}
          >
            <option>All Categories</option>
            <option>Spiritual</option>
            <option>Domestic</option>
            <option>International</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => { setSearch(""); setCategoryFilter("All Categories"); setActiveTab("All"); }}
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

        {/* Category Filter Tabs */}
        <div style={{ padding: "0 1.25rem 0.875rem", display: "flex", gap: "0.5rem", borderBottom: "1px solid #F1F5F9" }}>
          {[
            { label: "All (426)",          key: "All",           icon: null },
            { label: "Spiritual (128)",    key: "Spiritual",     icon: "temple_hindu", color: "#B45309" },
            { label: "Domestic (198)",     key: "Domestic",      icon: "landscape",    color: "#0F766E" },
            { label: "International (100)",key: "International", icon: "public",       color: "#4338CA" },
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
                  border: isSelected && tab.key === "All" ? "none" : isSelected ? `1.5px solid ${tab.color}` : "1px solid #E2E8F0",
                  backgroundColor: isSelected && tab.key === "All" ? "#B91C1C" : isSelected ? "#F8FAFC" : "#fff",
                  color: isSelected && tab.key === "All" ? "#fff" : isSelected ? "#0F172A" : "#64748B",
                  transition: "all 150ms",
                }}
              >
                {tab.icon && (
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: tab.color }}>{tab.icon}</span>
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
                <th style={TH}>User</th>
                <th style={TH}>Package Name</th>
                <th style={TH}>Category</th>
                <th style={TH}>Departure Date</th>
                <th style={TH}>Travellers</th>
                <th style={TH}>Total Amount</th>
                <th style={TH}>Status</th>
                <th style={{ ...TH, textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, idx) => {
                const s = STATUS_MAP[b.status];
                const cat = CATEGORY_STYLES[b.category];
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

                    {/* User */}
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

                    {/* Package Name + Thumbnail */}
                    <td style={{ padding: "0.875rem 0.875rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <div style={{
                          width: 38, height: 34, borderRadius: 6,
                          backgroundColor: "#F1F5F9", display: "flex",
                          alignItems: "center", justifyContent: "center",
                          border: "1px solid #E2E8F0", flexShrink: 0
                        }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18, color: cat.color }}>
                            {cat.icon}
                          </span>
                        </div>
                        <div>
                          <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>{b.pkgName}</div>
                          <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>{b.duration} • {b.region}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td style={{ padding: "0.875rem 0.875rem" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "0.3rem",
                        padding: "0.22rem 0.55rem", borderRadius: 4,
                        backgroundColor: cat.bg, color: cat.color,
                        fontSize: "0.72rem", fontWeight: 600, whiteSpace: "nowrap"
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 13 }}>{cat.icon}</span>
                        {b.category}
                      </span>
                    </td>

                    {/* Departure Date */}
                    <td style={{ padding: "0.875rem 0.875rem", whiteSpace: "nowrap" }}>
                      <div style={{ fontSize: "0.8125rem", color: "#475569" }}>{b.deptDate}</div>
                      <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>{b.deptDay}</div>
                    </td>

                    {/* Travellers */}
                    <td style={{ padding: "0.875rem 0.875rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "#475569", fontWeight: 600 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8" }}>group</span>
                        {b.travellers}
                      </div>
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
                          href={`/package-bookings/${b.id}`}
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
            Showing 1 to 10 of 426 package bookings
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
              43
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
