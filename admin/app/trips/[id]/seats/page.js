"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";

// ── Mock Initial Seats Data ──────────────────────────────────────────────────

// Status types: 'available' | 'booked' | 'held' | 'blocked' | 'ladies'
const INITIAL_LOWER_SEATS = [
  // Row 1 (Top Single Row: 1 to 10)
  { id: "L1", number: "1", status: "available" },
  { id: "L2", number: "2", status: "booked" },
  { id: "L3", number: "3", status: "available" },
  { id: "L4", number: "4", status: "ladies" },
  { id: "L5", number: "5", status: "available" },
  { id: "L6", number: "6", status: "available" },
  { id: "L7", number: "7", status: "held" },
  { id: "L8", number: "8", status: "available" },
  { id: "L9", number: "9", status: "blocked" },
  { id: "L10", number: "10", status: "available" },
  // Row 2 (Bottom Double/Single Row: 11 to 20)
  { id: "L11", number: "11", status: "available" },
  { id: "L12", number: "12", status: "available" },
  { id: "L13", number: "13", status: "booked" },
  { id: "L14", number: "14", status: "available" },
  { id: "L15", number: "15", status: "ladies" },
  { id: "L16", number: "16", status: "available" },
  { id: "L17", number: "17", status: "available" },
  { id: "L18", number: "18", status: "available" },
  { id: "L19", number: "19", status: "booked" },
  { id: "L20", number: "20", status: "available" },
];

const INITIAL_UPPER_SEATS = [
  // Upper Deck Row 1
  { id: "U1", number: "U1", status: "available" },
  { id: "U2", number: "U2", status: "available" },
  { id: "U3", number: "U3", status: "booked" },
  { id: "U4", number: "U4", status: "available" },
  { id: "U5", number: "U5", status: "ladies" },
  { id: "U6", number: "U6", status: "available" },
  { id: "U7", number: "U7", status: "available" },
  { id: "U8", number: "U8", status: "held" },
  { id: "U9", number: "U9", status: "available" },
  { id: "U10", number: "U10", status: "available" },
  { id: "U11", number: "U11", status: "booked" },
  // Upper Deck Row 2
  { id: "U12", number: "U12", status: "available" },
  { id: "U13", number: "U13", status: "available" },
  { id: "U14", number: "U14", status: "available" },
  { id: "U15", number: "U15", status: "blocked" },
  { id: "U16", number: "U16", status: "available" },
  { id: "U17", number: "U17", status: "booked" },
  { id: "U18", number: "U18", status: "available" },
  { id: "U19", number: "U19", status: "ladies" },
  { id: "U20", number: "U20", status: "available" },
  { id: "U21", number: "U21", status: "available" },
  { id: "U22", number: "U22", status: "available" },
];

export default function TripSeatMapPage() {
  const [activeDeck, setActiveDeck] = useState("lower"); // 'lower' | 'upper'
  const [lowerSeats, setLowerSeats] = useState(INITIAL_LOWER_SEATS);
  const [upperSeats, setUpperSeats] = useState(INITIAL_UPPER_SEATS);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const currentSeats = activeDeck === "lower" ? lowerSeats : upperSeats;
  const setCurrentSeats = activeDeck === "lower" ? setLowerSeats : setUpperSeats;

  const cycleStatus = (seatId) => {
    setCurrentSeats(prev => prev.map(s => {
      if (s.id !== seatId) return s;
      // Sequence: available -> blocked -> ladies -> held -> available (skip booked for safety or toggle)
      const order = ["available", "blocked", "ladies", "held"];
      const currentIndex = order.indexOf(s.status);
      const nextStatus = currentIndex === -1 ? "available" : order[(currentIndex + 1) % order.length];
      return { ...s, status: nextStatus };
    }));
  };

  const handleReset = () => {
    setLowerSeats(INITIAL_LOWER_SEATS);
    setUpperSeats(INITIAL_UPPER_SEATS);
  };

  // Helper for seat styling
  const renderSeatContent = (seat) => {
    switch (seat.status) {
      case "booked":
        return {
          bg: "#475569",
          border: "#334155",
          color: "#fff",
          content: <span className="material-symbols-outlined" style={{ fontSize: 18 }}>lock</span>,
        };
      case "held":
        return {
          bg: "#FDE047",
          border: "#EAB308",
          color: "#713F12",
          content: (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>schedule</span>
            </div>
          ),
        };
      case "blocked":
        return {
          bg: "#DC2626",
          border: "#B91C1C",
          color: "#fff",
          content: <span className="material-symbols-outlined" style={{ fontSize: 18 }}>block</span>,
        };
      case "ladies":
        return {
          bg: "#FBCFE8",
          border: "#F472B6",
          color: "#9D174D",
          content: (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 2 }}>{seat.number}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 13 }}>female</span>
            </div>
          ),
        };
      case "available":
      default:
        return {
          bg: "#FFFFFF",
          border: "#CBD5E1",
          color: "#0F172A",
          content: <span style={{ fontSize: "0.8125rem", fontWeight: 700 }}>{seat.number}</span>,
        };
    }
  };

  const topRow = currentSeats.slice(0, 10);
  const bottomRow = currentSeats.slice(10);

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <Link href="/trips" style={{ color: "#64748B", textDecoration: "none" }}>Trips</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#64748B" }}>TRP1003</span>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Seat Map</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
            Seat Map — Nagpur → Pune
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
            15 Oct 2026 &nbsp;|&nbsp; Bus MH-31-VB-8899 &nbsp;|&nbsp; Volvo AC Sleeper (2+1) &nbsp;|&nbsp; 42 Seats (Lower: 20, Upper: 22)
          </p>
        </div>
        <Link href="/trips" style={{
          display: "inline-flex", alignItems: "center", gap: "0.375rem",
          padding: "0.5625rem 1rem", border: "1px solid #E2E8F0",
          borderRadius: 8, backgroundColor: "#fff", color: "#0F172A",
          fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          Back to Trips
        </Link>
      </div>

      {/* Trip Meta Cards (5 in a row) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1.2fr", gap: "1rem", marginBottom: "1.25rem" }}>
        
        {/* Route Card */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "0.875rem 1rem",
          border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", gap: "0.75rem"
        }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>location_on</span>
          </div>
          <div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Route</div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>Nagpur → Pune</div>
            <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Via Wardha, Amravati, Akola, Shegaon</div>
          </div>
        </div>

        {/* Journey Date Card */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "0.875rem 1rem",
          border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", gap: "0.75rem"
        }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>calendar_today</span>
          </div>
          <div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Journey Date</div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>15 Oct 2026 (Thu)</div>
          </div>
        </div>

        {/* Departure Time */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "0.875rem 1rem",
          border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", gap: "0.75rem"
        }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>schedule</span>
          </div>
          <div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Departure Time</div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>09:30 PM</div>
          </div>
        </div>

        {/* Arrival Time */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "0.875rem 1rem",
          border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", gap: "0.75rem"
        }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>timelapse</span>
          </div>
          <div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Arrival Time</div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>06:15 AM</div>
            <div style={{ fontSize: "0.65rem", color: "#64748B" }}>(16 Oct 2026)</div>
          </div>
        </div>

        {/* Bus Info */}
        <div style={{
          background: "#fff", borderRadius: 12, padding: "0.875rem 1rem",
          border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", gap: "0.75rem"
        }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>directions_bus</span>
          </div>
          <div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Bus</div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>MH-31-VB-8899</div>
            <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Volvo AC Sleeper (2+1)</div>
          </div>
        </div>

      </div>

      {/* Deck Selector + Actions Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        
        {/* Deck Switch Tabs */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setActiveDeck("lower")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              padding: "0.5625rem 1.25rem", borderRadius: 8,
              border: "none", cursor: "pointer",
              backgroundColor: activeDeck === "lower" ? "#B91C1C" : "#fff",
              color: activeDeck === "lower" ? "#fff" : "#475569",
              fontSize: "0.8125rem", fontWeight: 600,
              boxShadow: activeDeck === "lower" ? "0 1px 2px rgba(185,28,28,0.2)" : "0 1px 2px rgba(0,0,0,0.05)"
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>directions_bus</span>
            Lower Deck (20)
          </button>

          <button
            onClick={() => setActiveDeck("upper")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              padding: "0.5625rem 1.25rem", borderRadius: 8,
              border: activeDeck === "upper" ? "none" : "1px solid #E2E8F0",
              cursor: "pointer",
              backgroundColor: activeDeck === "upper" ? "#B91C1C" : "#fff",
              color: activeDeck === "upper" ? "#fff" : "#475569",
              fontSize: "0.8125rem", fontWeight: 600,
              boxShadow: activeDeck === "upper" ? "0 1px 2px rgba(185,28,28,0.2)" : "0 1px 2px rgba(0,0,0,0.05)"
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>directions_bus</span>
            Upper Deck (22)
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={handleReset}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              padding: "0.5625rem 1rem", border: "1px solid #E2E8F0",
              borderRadius: 8, backgroundColor: "#fff", color: "#475569",
              fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer"
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>restart_alt</span>
            Reset Changes
          </button>

          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              padding: "0.5625rem 1.25rem", border: "none",
              borderRadius: 8, backgroundColor: "#B91C1C", color: "#fff",
              fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer",
              boxShadow: "0 1px 2px rgba(185,28,28,0.2)"
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>save</span>
            Save Changes
          </button>
        </div>

      </div>

      {/* Main Bus Shell Container */}
      <div style={{
        background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)", padding: "2rem 1.5rem",
        marginBottom: "1.5rem", overflowX: "auto"
      }}>
        
        {/* Bus Outer Body Wrapper */}
        <div style={{
          minWidth: 860, margin: "0 auto", position: "relative",
          borderRadius: "40px 24px 24px 40px",
          border: "3px solid #334155", backgroundColor: "#F8FAFC",
          padding: "1.5rem 1.25rem 1.5rem 2rem", display: "flex", alignItems: "center"
        }}>
          
          {/* Driver Cabin Area */}
          <div style={{
            width: 110, borderRight: "2px dashed #CBD5E1",
            paddingRight: "1rem", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "3px solid #64748B", display: "flex",
              alignItems: "center", justifyContent: "center", marginBottom: "0.75rem"
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: "#475569" }}>radio_button_checked</span>
            </div>
            <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#94A3B8", textAlign: "center" }}>
              Front<br/>(Driver)
            </div>
          </div>

          {/* Passenger Cabin Seating */}
          <div style={{ flex: 1, padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Top Row Seats (Single Row Berths) */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
              {topRow.map(seat => {
                const style = renderSeatContent(seat);
                return (
                  <button
                    key={seat.id}
                    onClick={() => cycleStatus(seat.id)}
                    title={`Seat ${seat.number} (${seat.status}) - Click to cycle status`}
                    style={{
                      width: 52, height: 58, borderRadius: 8,
                      border: `1.5px solid ${style.border}`,
                      backgroundColor: style.bg, color: style.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", transition: "transform 100ms",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flexShrink: 0
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {style.content}
                  </button>
                );
              })}
            </div>

            {/* Aisle label divider */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "1rem", color: "#94A3B8", fontSize: "0.75rem",
              fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase"
            }}>
              <span style={{ flex: 1, height: 1, backgroundColor: "#E2E8F0" }} />
              A I S L E
              <span style={{ flex: 1, height: 1, backgroundColor: "#E2E8F0" }} />
            </div>

            {/* Bottom Row Seats */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
              {bottomRow.map(seat => {
                const style = renderSeatContent(seat);
                return (
                  <button
                    key={seat.id}
                    onClick={() => cycleStatus(seat.id)}
                    title={`Seat ${seat.number} (${seat.status}) - Click to cycle status`}
                    style={{
                      width: 52, height: 58, borderRadius: 8,
                      border: `1.5px solid ${style.border}`,
                      backgroundColor: style.bg, color: style.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", transition: "transform 100ms",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flexShrink: 0
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {style.content}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Emergency Exit Area (Right End) */}
          <div style={{
            width: 70, borderLeft: "2px dashed #CBD5E1",
            paddingLeft: "0.75rem", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <div style={{
              writingMode: "vertical-rl", textOrientation: "mixed",
              fontSize: "0.6875rem", fontWeight: 700, color: "#94A3B8",
              letterSpacing: "0.08em"
            }}>
              Emergency Exit
            </div>
            {/* Red tail accent */}
            <div style={{
              position: "absolute", right: -4, top: "20%", bottom: "20%",
              width: 5, backgroundColor: "#EF4444", borderRadius: "0 4px 4px 0"
            }} />
          </div>

        </div>

      </div>

      {/* Legend Card */}
      <div style={{
        background: "#fff", borderRadius: 12, border: "1px solid #F1F5F9",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)", padding: "1rem 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem"
      }}>
        {/* Available */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: 6, border: "1.5px solid #CBD5E1", backgroundColor: "#fff" }} />
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>Available</div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Click to book / hold</div>
          </div>
        </div>

        {/* Booked */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 6, backgroundColor: "#475569",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>lock</span>
          </div>
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>Booked</div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Already reserved</div>
          </div>
        </div>

        {/* Held / Pending */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 6, backgroundColor: "#FDE047",
            border: "1px solid #EAB308", display: "flex", alignItems: "center", justifyContent: "center", color: "#713F12"
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
          </div>
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>Held / Pending</div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Temporarily blocked</div>
          </div>
        </div>

        {/* Blocked by Admin */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 6, backgroundColor: "#DC2626",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>block</span>
          </div>
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>Blocked by Admin</div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Not available for booking</div>
          </div>
        </div>

        {/* Ladies Reserved */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 6, backgroundColor: "#FBCFE8",
            border: "1px solid #F472B6", display: "flex", alignItems: "center", justifyContent: "center", color: "#9D174D"
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>female</span>
          </div>
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>Ladies Reserved</div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Reserved for female passengers</div>
          </div>
        </div>

      </div>

      {/* Info & Admin Override Hints Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.25rem" }}>
        
        {/* How to Manage Seats */}
        <div style={{
          background: "#F0F9FF", borderRadius: 10, padding: "1rem 1.25rem",
          border: "1px solid #BAE6FD", display: "flex", gap: "0.75rem"
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#0284C7", flexShrink: 0 }}>info</span>
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0369A1", marginBottom: "0.35rem" }}>
              How to Manage Seats?
            </div>
            <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.75rem", color: "#0369A1", lineHeight: 1.5 }}>
              <li>Click on any available seat to change its status.</li>
              <li>Use the legend above to understand seat categories.</li>
              <li>Click &quot;Save Changes&quot; to apply your updates.</li>
              <li>Changes will be reflected immediately in the booking system.</li>
            </ul>
          </div>
        </div>

        {/* Admin Override */}
        <div style={{
          background: "#FEF2F2", borderRadius: 10, padding: "1rem 1.25rem",
          border: "1px solid #FECACA", display: "flex", gap: "0.75rem"
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#DC2626", flexShrink: 0 }}>verified_user</span>
          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#991B1B", marginBottom: "0.35rem" }}>
              Admin Override
            </div>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#991B1B", lineHeight: 1.5 }}>
              You can block/unblock seats, release held seats, or mark seats for special reservations. Use this feature for operational adjustments only.
            </p>
          </div>
        </div>

      </div>

    </AdminShell>
  );
}
