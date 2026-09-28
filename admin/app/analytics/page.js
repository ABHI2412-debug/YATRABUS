"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";
import DateRangePicker from "@/components/ui/DateRangePicker";

// ── Mock Data Sets for Analytics ──────────────────────────────────────────────

const REVENUE_DATA = [
  { date: "1 Sep",  bus: 180000, pkg: 90000 },
  { date: "2 Sep",  bus: 220000, pkg: 110000 },
  { date: "3 Sep",  bus: 220000, pkg: 120000 },
  { date: "4 Sep",  bus: 280000, pkg: 160000 },
  { date: "5 Sep",  bus: 280000, pkg: 150000 },
  { date: "6 Sep",  bus: 360000, pkg: 210000 },
  { date: "7 Sep",  bus: 290000, pkg: 170000 },
  { date: "8 Sep",  bus: 260000, pkg: 140000 },
  { date: "9 Sep",  bus: 280000, pkg: 170000 },
  { date: "10 Sep", bus: 340000, pkg: 220000 },
  { date: "11 Sep", bus: 390000, pkg: 270000 },
  { date: "12 Sep", bus: 300000, pkg: 200000 },
  { date: "13 Sep", bus: 290000, pkg: 190000 },
  { date: "14 Sep", bus: 310000, pkg: 195000 },
  { date: "15 Sep", bus: 360000, pkg: 230000 },
  { date: "16 Sep", bus: 300000, pkg: 200000 },
];

const VOLUME_DATA = [
  { date: "1 Sep",  bus: 95,  pkg: 60 },
  { date: "2 Sep",  bus: 78,  pkg: 60 },
  { date: "3 Sep",  bus: 95,  pkg: 65 },
  { date: "4 Sep",  bus: 120, pkg: 85 },
  { date: "5 Sep",  bus: 105, pkg: 78 },
  { date: "6 Sep",  bus: 125, pkg: 78 },
  { date: "7 Sep",  bus: 98,  pkg: 66 },
  { date: "8 Sep",  bus: 90,  pkg: 65 },
  { date: "9 Sep",  bus: 110, pkg: 72 },
  { date: "10 Sep", bus: 130, pkg: 85 },
  { date: "11 Sep", bus: 168, pkg: 110 },
  { date: "12 Sep", bus: 108, pkg: 85 },
  { date: "13 Sep", bus: 110, pkg: 72 },
  { date: "14 Sep", bus: 110, pkg: 78 },
  { date: "15 Sep", bus: 135, pkg: 95 },
  { date: "16 Sep", bus: 102, pkg: 78 },
];

const TOP_ROUTES = [
  { rank: 1, route: "Nagpur → Pune",   bookings: 428, percentage: 28 },
  { rank: 2, route: "Nagpur → Mumbai", bookings: 312, percentage: 20 },
  { rank: 3, route: "Pune → Nagpur",   bookings: 276, percentage: 18 },
  { rank: 4, route: "Nagpur → Indore", bookings: 189, percentage: 12 },
  { rank: 5, route: "Nagpur → Bhopal", bookings: 142, percentage: 9 },
];

// ── Interactive SVG Revenue Chart ─────────────────────────────────────────────

function InteractiveRevenueChart({ data, filterMode }) {
  const [hoverIndex, setHoverIndex] = useState(10); // default at 11 Sep as shown in screenshot

  const VW = 760, VH = 250;
  const pl = 65, pr = 20, pt = 30, pb = 40;
  const cw = VW - pl - pr, ch = VH - pt - pb;
  const MAX = 500000;

  const getX = (i) => pl + (i / (data.length - 1)) * cw;
  const getY = (v) => pt + ch - (v / MAX) * ch;

  // Build SVG Paths
  const busLine = data.map((d, i) => `${i === 0 ? "M" : "L"}${getX(i).toFixed(1)},${getY(d.bus).toFixed(1)}`).join(" ");
  const pkgLine = data.map((d, i) => `${i === 0 ? "M" : "L"}${getX(i).toFixed(1)},${getY(d.pkg).toFixed(1)}`).join(" ");
  
  const pkgArea = `${pkgLine} L${getX(data.length - 1).toFixed(1)},${(pt + ch).toFixed(1)} L${getX(0).toFixed(1)},${(pt + ch).toFixed(1)} Z`;
  const busArea = `${busLine} L${getX(data.length - 1).toFixed(1)},${(pt + ch).toFixed(1)} L${getX(0).toFixed(1)},${(pt + ch).toFixed(1)} Z`;

  const yTicks = [0, 100000, 200000, 300000, 400000, 500000];

  const activeItem = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="bus-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="pkg-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D9488" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal Gridlines & Y-axis labels */}
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={pl} y1={getY(v).toFixed(1)} x2={VW - pr} y2={getY(v).toFixed(1)} stroke="#F1F5F9" strokeWidth="1.2" />
            <text x={pl - 10} y={getY(v).toFixed(1)} textAnchor="end" dominantBaseline="middle" fontSize="10" fill="#94A3B8" fontWeight="500">
              {v === 0 ? "₹ 0" : `₹ ${v.toLocaleString('en-IN')}`}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => {
          if (i % 2 === 0 || i === data.length - 1) {
            return (
              <text key={i} x={getX(i).toFixed(1)} y={VH - 10} textAnchor="middle" fontSize="9.5" fill="#94A3B8">
                {d.date}
              </text>
            );
          }
          return null;
        })}

        {/* Area Fills */}
        {(filterMode === "combined" || filterMode === "bus") && (
          <path d={busArea} fill="url(#bus-gradient)" />
        )}
        {(filterMode === "combined" || filterMode === "package") && (
          <path d={pkgArea} fill="url(#pkg-gradient)" />
        )}

        {/* Line Plots */}
        {(filterMode === "combined" || filterMode === "package") && (
          <path d={pkgLine} fill="none" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {(filterMode === "combined" || filterMode === "bus") && (
          <path d={busLine} fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Data points */}
        {data.map((d, i) => (
          <g key={i}>
            {(filterMode === "combined" || filterMode === "package") && (
              <circle cx={getX(i)} cy={getY(d.pkg)} r={hoverIndex === i ? 5 : 3.5} fill="#0D9488" stroke="#fff" strokeWidth={1.5} />
            )}
            {(filterMode === "combined" || filterMode === "bus") && (
              <circle cx={getX(i)} cy={getY(d.bus)} r={hoverIndex === i ? 5 : 3.5} fill="#EF4444" stroke="#fff" strokeWidth={1.5} />
            )}
            {/* Transparent hover catcher column */}
            <rect
              x={getX(i) - (cw / data.length) / 2}
              y={pt}
              width={cw / data.length}
              height={ch}
              fill="transparent"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoverIndex(i)}
            />
          </g>
        ))}

        {/* Vertical dashed line at hover */}
        {hoverIndex !== null && (
          <line
            x1={getX(hoverIndex)} y1={pt}
            x2={getX(hoverIndex)} y2={pt + ch}
            stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3,3"
          />
        )}
      </svg>

      {/* Floating Tooltip Card */}
      {activeItem && (
        <div style={{
          position: "absolute",
          top: 15,
          left: `${(hoverIndex / (data.length - 1)) * 70 + 15}%`,
          transform: "translateX(-50%)",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 8,
          padding: "0.625rem 0.875rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          pointerEvents: "none",
          zIndex: 10,
          minWidth: 160
        }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.35rem" }}>
            {activeItem.date} 2026
          </div>
          {(filterMode === "combined" || filterMode === "bus") && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", fontSize: "0.72rem", marginBottom: "0.2rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#64748B" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#EF4444" }} />
                Bus Revenue
              </span>
              <span style={{ fontWeight: 700, color: "#0F172A" }}>₹ {activeItem.bus.toLocaleString('en-IN')}</span>
            </div>
          )}
          {(filterMode === "combined" || filterMode === "package") && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", fontSize: "0.72rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#64748B" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#0D9488" }} />
                Package Revenue
              </span>
              <span style={{ fontWeight: 700, color: "#0F172A" }}>₹ {activeItem.pkg.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Interactive SVG Volume Chart ──────────────────────────────────────────────

function InteractiveVolumeChart({ data, filterMode }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const VW = 760, VH = 220;
  const pl = 40, pr = 20, pt = 20, pb = 35;
  const cw = VW - pl - pr, ch = VH - pt - pb;
  const MAX = 200;

  const groupWidth = cw / data.length;
  const barWidth = Math.min(10, groupWidth * 0.35);

  const getY = (v) => pt + ch - (v / MAX) * ch;
  const yTicks = [0, 50, 100, 150, 200];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg width="100%" viewBox={`0 0 ${VW} ${VH}`}>
        {/* Horizontal Gridlines */}
        {yTicks.map(v => (
          <g key={v}>
            <line x1={pl} y1={getY(v).toFixed(1)} x2={VW - pr} y2={getY(v).toFixed(1)} stroke="#F1F5F9" strokeWidth="1.2" />
            <text x={pl - 8} y={getY(v).toFixed(1)} textAnchor="end" dominantBaseline="middle" fontSize="9.5" fill="#94A3B8">
              {v}
            </text>
          </g>
        ))}

        {/* X labels */}
        {data.map((d, i) => {
          if (i % 2 === 0 || i === data.length - 1) {
            return (
              <text key={i} x={pl + i * groupWidth + groupWidth / 2} y={VH - 10} textAnchor="middle" fontSize="9.5" fill="#94A3B8">
                {d.date}
              </text>
            );
          }
          return null;
        })}

        {/* Grouped Bars */}
        {data.map((d, i) => {
          const cx = pl + i * groupWidth + groupWidth / 2;
          const isHovered = hoverIndex === i;

          return (
            <g
              key={i}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Bus Bar */}
              {(filterMode === "combined" || filterMode === "bus") && (
                <rect
                  x={filterMode === "combined" ? cx - barWidth - 1.5 : cx - barWidth / 2}
                  y={getY(d.bus)}
                  width={barWidth}
                  height={ch - (getY(d.bus) - pt)}
                  fill={isHovered ? "#DC2626" : "#EF4444"}
                  rx={2}
                />
              )}

              {/* Package Bar */}
              {(filterMode === "combined" || filterMode === "package") && (
                <rect
                  x={filterMode === "combined" ? cx + 1.5 : cx - barWidth / 2}
                  y={getY(d.pkg)}
                  width={barWidth}
                  height={ch - (getY(d.pkg) - pt)}
                  fill={isHovered ? "#0F766E" : "#0D9488"}
                  rx={2}
                />
              )}

              {/* Invisible Hover Area */}
              <rect
                x={cx - groupWidth / 2}
                y={pt}
                width={groupWidth}
                height={ch}
                fill="transparent"
              />
            </g>
          );
        })}
      </svg>

      {/* Hover Floating Box */}
      {hoverIndex !== null && (
        <div style={{
          position: "absolute",
          top: -10,
          left: `${((hoverIndex * groupWidth + pl) / VW) * 100}%`,
          transform: "translateX(-50%)",
          backgroundColor: "#0F172A",
          color: "#fff",
          borderRadius: 6,
          padding: "0.35rem 0.6rem",
          fontSize: "0.6875rem",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 10,
          boxShadow: "0 4px 6px rgba(0,0,0,0.15)"
        }}>
          <div><strong>{data[hoverIndex].date}</strong></div>
          {(filterMode === "combined" || filterMode === "bus") && <div>Bus: {data[hoverIndex].bus} bookings</div>}
          {(filterMode === "combined" || filterMode === "package") && <div>Packages: {data[hoverIndex].pkg} bookings</div>}
        </div>
      )}
    </div>
  );
}

// ── Main Analytics Page Component ─────────────────────────────────────────────

export default function AnalyticsPage() {
  const [filterMode, setFilterMode] = useState("combined"); // 'bus' | 'package' | 'combined'
  const [timePeriod, setTimePeriod] = useState("Day"); // 'Day' | 'Week' | 'Month' | 'Year'
  const [volTimePeriod, setVolTimePeriod] = useState("Day");

  const CARD_STYLE = {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #F1F5F9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    padding: "1.25rem 1.5rem",
    marginBottom: "1.25rem",
  };

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Analytics</span>
      </div>

      {/* Header & Date Picker */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
            Analytics
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
            Insights into your bus and holiday package business. Track revenue, bookings and popular routes.
          </p>
        </div>

        {/* Date Range Picker Pop-up */}
        <DateRangePicker initialStart="1 Sep 2026" initialEnd="15 Sep 2026" />
      </div>

      {/* Category Filter Pills (Bus Bookings / Package Bookings / Combined) */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr",
        gap: "0.75rem", marginBottom: "1.25rem"
      }}>
        {/* Bus Bookings */}
        <button
          type="button"
          onClick={() => setFilterMode("bus")}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            padding: "0.75rem", borderRadius: 8, cursor: "pointer",
            border: filterMode === "bus" ? "none" : "1px solid #E2E8F0",
            backgroundColor: filterMode === "bus" ? "#B91C1C" : "#fff",
            color: filterMode === "bus" ? "#fff" : "#475569",
            fontWeight: 600, fontSize: "0.875rem",
            boxShadow: filterMode === "bus" ? "0 2px 4px rgba(185,28,28,0.2)" : "0 1px 2px rgba(0,0,0,0.03)"
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>directions_bus</span>
          Bus Bookings
        </button>

        {/* Package Bookings */}
        <button
          type="button"
          onClick={() => setFilterMode("package")}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            padding: "0.75rem", borderRadius: 8, cursor: "pointer",
            border: filterMode === "package" ? "none" : "1px solid #E2E8F0",
            backgroundColor: filterMode === "package" ? "#B91C1C" : "#fff",
            color: filterMode === "package" ? "#fff" : "#475569",
            fontWeight: 600, fontSize: "0.875rem",
            boxShadow: filterMode === "package" ? "0 2px 4px rgba(185,28,28,0.2)" : "0 1px 2px rgba(0,0,0,0.03)"
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>luggage</span>
          Package Bookings
        </button>

        {/* Combined (Active in Screenshot) */}
        <button
          type="button"
          onClick={() => setFilterMode("combined")}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            padding: "0.75rem", borderRadius: 8, cursor: "pointer",
            border: filterMode === "combined" ? "none" : "1px solid #E2E8F0",
            backgroundColor: filterMode === "combined" ? "#B91C1C" : "#fff",
            color: filterMode === "combined" ? "#fff" : "#475569",
            fontWeight: 600, fontSize: "0.875rem",
            boxShadow: filterMode === "combined" ? "0 2px 4px rgba(185,28,28,0.2)" : "0 1px 2px rgba(0,0,0,0.03)"
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>bar_chart</span>
          Combined
        </button>
      </div>

      {/* 4 KPI Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        
        {/* Total Revenue */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "1.125rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9",
          display: "flex", alignItems: "center", gap: "0.875rem"
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            backgroundColor: "#ECFDF5", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#059669" }}>currency_rupee</span>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Total Revenue</div>
            <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0F172A", margin: "0.15rem 0" }}>₹ 18,42,320</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.6875rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#16A34A" }}>arrow_upward</span>
              <span style={{ fontWeight: 700, color: "#16A34A" }}>+12%</span>
              <span style={{ color: "#94A3B8" }}>vs previous period</span>
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "1.125rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9",
          display: "flex", alignItems: "center", gap: "0.875rem"
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            backgroundColor: "#FEF2F2", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#DC2626" }}>confirmation_number</span>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Total Bookings</div>
            <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0F172A", margin: "0.15rem 0" }}>1,428</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.6875rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#16A34A" }}>arrow_upward</span>
              <span style={{ fontWeight: 700, color: "#16A34A" }}>+18%</span>
              <span style={{ color: "#94A3B8" }}>vs previous period</span>
            </div>
          </div>
        </div>

        {/* Bus Bookings */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "1.125rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9",
          display: "flex", alignItems: "center", gap: "0.875rem"
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            backgroundColor: "#FFFBEB", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#D97706" }}>directions_bus</span>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Bus Bookings</div>
            <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0F172A", margin: "0.15rem 0" }}>892</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.6875rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#16A34A" }}>arrow_upward</span>
              <span style={{ fontWeight: 700, color: "#16A34A" }}>+14%</span>
              <span style={{ color: "#94A3B8" }}>vs previous period</span>
            </div>
          </div>
        </div>

        {/* Package Bookings */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "1.125rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9",
          display: "flex", alignItems: "center", gap: "0.875rem"
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            backgroundColor: "#FEF2F2", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#B91C1C" }}>luggage</span>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Package Bookings</div>
            <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0F172A", margin: "0.15rem 0" }}>536</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.6875rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#16A34A" }}>arrow_upward</span>
              <span style={{ fontWeight: 700, color: "#16A34A" }}>+24%</span>
              <span style={{ color: "#94A3B8" }}>vs previous period</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── SECTION 1: Revenue Over Time Chart ── */}
      <div style={CARD_STYLE}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#059669" }}>currency_rupee</span>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>Revenue Over Time</h3>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Compare revenue from bus bookings and package bookings.</div>
            </div>
          </div>

          {/* Time Selector Pills */}
          <div style={{ display: "flex", border: "1px solid #E2E8F0", borderRadius: 8, padding: 2, backgroundColor: "#F8FAFC" }}>
            {["Day", "Week", "Month", "Year"].map(t => (
              <button
                key={t}
                onClick={() => setTimePeriod(t)}
                style={{
                  padding: "0.3rem 0.75rem", border: "none", borderRadius: 6,
                  fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                  backgroundColor: timePeriod === t ? "#DC2626" : "transparent",
                  color: timePeriod === t ? "#fff" : "#64748B"
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Chart */}
        <InteractiveRevenueChart data={REVENUE_DATA} filterMode={filterMode} />

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#475569" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            Bus Revenue
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#475569" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#0D9488" }} />
            Package Revenue
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Booking Volume Chart ── */}
      <div style={CARD_STYLE}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#059669" }}>bar_chart</span>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>Booking Volume</h3>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Number of bus bookings vs package bookings over time.</div>
            </div>
          </div>

          {/* Time Selector Pills */}
          <div style={{ display: "flex", border: "1px solid #E2E8F0", borderRadius: 8, padding: 2, backgroundColor: "#F8FAFC" }}>
            {["Day", "Week", "Month", "Year"].map(t => (
              <button
                key={t}
                onClick={() => setVolTimePeriod(t)}
                style={{
                  padding: "0.3rem 0.75rem", border: "none", borderRadius: 6,
                  fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                  backgroundColor: volTimePeriod === t ? "#DC2626" : "transparent",
                  color: volTimePeriod === t ? "#fff" : "#64748B"
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Volume Chart */}
        <InteractiveVolumeChart data={VOLUME_DATA} filterMode={filterMode} />

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#475569" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            Bus Bookings
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#475569" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#0D9488" }} />
            Package Bookings
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Popular Routes (Top 5) ── */}
      <div style={CARD_STYLE}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#059669" }}>location_on</span>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>Popular Routes (Top 5)</h3>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Most booked bus routes based on total bookings.</div>
            </div>
          </div>

          <select style={{
            padding: "0.4rem 0.75rem", border: "1px solid #E2E8F0", borderRadius: 8,
            fontSize: "0.8125rem", color: "#475569", backgroundColor: "#fff", outline: "none", cursor: "pointer"
          }}>
            <option>By Booking Count</option>
            <option>By Revenue</option>
          </select>
        </div>

        {/* Table of Routes with Progress Bars */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9", textAlign: "left", fontSize: "0.6875rem", color: "#94A3B8", textTransform: "uppercase" }}>
                <th style={{ padding: "0.5rem 0.75rem", width: 40 }}>#</th>
                <th style={{ padding: "0.5rem 0.75rem" }}>Route</th>
                <th style={{ padding: "0.5rem 0.75rem" }}>Bookings</th>
                <th style={{ padding: "0.5rem 0.75rem", width: "45%" }}></th>
              </tr>
            </thead>
            <tbody>
              {TOP_ROUTES.map((r, i) => (
                <tr key={r.rank} style={{ borderBottom: i < TOP_ROUTES.length - 1 ? "1px solid #F8FAFC" : "none" }}>
                  <td style={{ padding: "0.75rem", fontSize: "0.8125rem", color: "#64748B", fontWeight: 600 }}>{r.rank}</td>
                  <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#0F172A", fontWeight: 600 }}>
                    {r.route.split("→")[0]} <span style={{ color: "#B91C1C" }}>→</span> {r.route.split("→")[1]}
                  </td>
                  <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#0F172A", fontWeight: 700 }}>
                    {r.bookings}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ flex: 1, height: 8, backgroundColor: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${r.percentage * 3}%`, height: "100%", backgroundColor: "#EF4444", borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600, minWidth: 32 }}>{r.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Highlight Card below Top Routes */}
        <div style={{
          marginTop: "1.25rem", padding: "0.875rem 1.25rem", backgroundColor: "#FFF5F5",
          borderRadius: 10, border: "1px solid #FEE2E2", display: "flex",
          alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: "#DC2626" }}>military_tech</span>
            <div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#B91C1C" }}>Nagpur → Pune</div>
              <div style={{ fontSize: "0.75rem", color: "#64748B" }}>is your most popular route with 428 bookings (28% of total).</div>
            </div>
          </div>
          <Link
            href="/routes"
            style={{
              fontSize: "0.75rem", fontWeight: 700, color: "#DC2626", textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "0.25rem",
              padding: "0.4rem 0.875rem", backgroundColor: "#FEE2E2", borderRadius: 6
            }}
          >
            View All Routes <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
          </Link>
        </div>
      </div>

    </AdminShell>
  );
}
