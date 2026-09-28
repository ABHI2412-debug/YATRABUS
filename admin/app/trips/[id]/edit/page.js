"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";

// ── Options Mock Data ─────────────────────────────────────────────────────────

const ROUTES = [
  { id: "R1", name: "Nagpur → Pune", via: "Via Wardha, Amravati, Akola, Shegaon", start: "Nagpur", dest: "Pune" },
  { id: "R2", name: "Pune → Mumbai", via: "Via Lonavala", start: "Pune", dest: "Mumbai" },
  { id: "R3", name: "Nagpur → Hyderabad", via: "Via Adilabad", start: "Nagpur", dest: "Hyderabad" },
  { id: "R4", name: "Mumbai → Nagpur", via: "Via Nashik", start: "Mumbai", dest: "Nagpur" },
  { id: "R5", name: "Bhopal → Indore", via: "Via Sehore", start: "Bhopal", dest: "Indore" },
];

const BUSES = [
  { plate: "MH 31 AB 1234", type: "Volvo AC (Sleeper)", seats: 40, style: "silver" },
  { plate: "MH 40 CD 5678", type: "Scania AC (Sleeper)", seats: 42, style: "red" },
  { plate: "MH 31 EF 9012", type: "Mercedes AC (Seater)", seats: 49, style: "silver" },
  { plate: "MH 49 GH 3456", type: "Tata AC (Seater)", seats: 52, style: "red" },
];

const TIME_OPTIONS = [
  "06:00 AM", "07:00 AM", "08:30 AM", "09:15 AM", "10:00 AM", "12:30 PM", 
  "01:30 PM", "02:30 PM", "06:45 PM", "09:30 PM", "09:40 PM", "10:30 PM"
];

export default function ScheduleNewTripPage() {
  const [selectedRouteId, setSelectedRouteId] = useState("R1");
  const [selectedBusPlate, setSelectedBusPlate] = useState("MH 31 AB 1234");
  const [journeyDate, setJourneyDate] = useState("2026-09-15");
  const [departureTime, setDepartureTime] = useState("06:00 AM");
  const [arrivalTime, setArrivalTime] = useState("12:30 PM");
  const [isActive, setIsActive] = useState(true);

  const currentRoute = ROUTES.find(r => r.id === selectedRouteId) || ROUTES[0];
  const currentBus = BUSES.find(b => b.plate === selectedBusPlate) || BUSES[0];

  const CARD_SECTION = {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #F1F5F9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    padding: "1.25rem 1.5rem",
    marginBottom: "1rem",
  };

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <Link href="/trips" style={{ color: "#64748B", textDecoration: "none" }}>Trips</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Schedule New Trip</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
          Schedule New Trip
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
          Add a new trip to an existing route with complete details.
        </p>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.25rem", alignItems: "flex-start" }}>
        
        {/* ── LEFT COLUMN (FORM) ── */}
        <div>

          {/* 1. Route Selector */}
          <div style={CARD_SECTION}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>location_on</span>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>
                  Route <span style={{ color: "#B91C1C" }}>*</span>
                </label>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Select the route for this trip</div>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <select
                value={selectedRouteId}
                onChange={e => setSelectedRouteId(e.target.value)}
                style={{
                  width: "100%", padding: "0.75rem 2.25rem 0.75rem 2.5rem",
                  border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem",
                  color: "#0F172A", backgroundColor: "#fff", cursor: "pointer", outline: "none",
                  appearance: "none", fontWeight: 600
                }}
              >
                {ROUTES.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.via})
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "#2563EB", pointerEvents: "none" }}>
                location_on
              </span>
              <span className="material-symbols-outlined" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "#94A3B8", pointerEvents: "none" }}>
                expand_more
              </span>
            </div>
          </div>

          {/* 2. Bus Selector */}
          <div style={CARD_SECTION}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>directions_bus</span>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>
                  Bus <span style={{ color: "#B91C1C" }}>*</span>
                </label>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Select the bus for this trip</div>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <select
                value={selectedBusPlate}
                onChange={e => setSelectedBusPlate(e.target.value)}
                style={{
                  width: "100%", padding: "0.75rem 2.25rem 0.75rem 4rem",
                  border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem",
                  color: "#0F172A", backgroundColor: "#fff", cursor: "pointer", outline: "none",
                  appearance: "none", fontWeight: 600
                }}
              >
                {BUSES.map(b => (
                  <option key={b.plate} value={b.plate}>
                    {b.plate}  —  {b.type} | {b.seats} Seats
                  </option>
                ))}
              </select>
              
              {/* Bus icon thumbnail inside input */}
              <div style={{
                position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                width: 44, height: 28, borderRadius: 4,
                backgroundColor: currentBus.style === "red" ? "#FEF2F2" : "#F1F5F9",
                border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none"
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: currentBus.style === "red" ? "#B91C1C" : "#64748B" }}>
                  directions_bus
                </span>
              </div>

              <span className="material-symbols-outlined" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "#94A3B8", pointerEvents: "none" }}>
                expand_more
              </span>
            </div>
          </div>

          {/* 3. Journey Date */}
          <div style={CARD_SECTION}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>calendar_today</span>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>
                  Journey Date <span style={{ color: "#B91C1C" }}>*</span>
                </label>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Select the date of journey</div>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <input
                type="date"
                value={journeyDate}
                onChange={e => setJourneyDate(e.target.value)}
                style={{
                  width: "100%", padding: "0.65rem 1rem 0.65rem 2.5rem",
                  border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem",
                  color: "#0F172A", backgroundColor: "#fff", cursor: "pointer", outline: "none",
                  fontWeight: 600
                }}
              />
              <span className="material-symbols-outlined" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "#94A3B8", pointerEvents: "none" }}>
                calendar_today
              </span>
            </div>
          </div>

          {/* 4. Departure Time & Arrival Time Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            
            {/* Departure */}
            <div style={CARD_SECTION}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#B91C1C" }}>schedule</span>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>
                    Departure Time <span style={{ color: "#B91C1C" }}>*</span>
                  </label>
                  <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>Select departure time</div>
                </div>
              </div>

              <div style={{ position: "relative" }}>
                <select
                  value={departureTime}
                  onChange={e => setDepartureTime(e.target.value)}
                  style={{
                    width: "100%", padding: "0.65rem 2rem 0.65rem 2.5rem",
                    border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem",
                    color: "#0F172A", backgroundColor: "#fff", cursor: "pointer", outline: "none",
                    appearance: "none", fontWeight: 600
                  }}
                >
                  {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8", pointerEvents: "none" }}>
                  schedule
                </span>
                <span className="material-symbols-outlined" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8", pointerEvents: "none" }}>
                  expand_more
                </span>
              </div>
            </div>

            {/* Arrival */}
            <div style={CARD_SECTION}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#B91C1C" }}>flag</span>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>
                    Arrival Time <span style={{ color: "#B91C1C" }}>*</span>
                  </label>
                  <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>Select expected arrival time</div>
                </div>
              </div>

              <div style={{ position: "relative" }}>
                <select
                  value={arrivalTime}
                  onChange={e => setArrivalTime(e.target.value)}
                  style={{
                    width: "100%", padding: "0.65rem 2rem 0.65rem 2.5rem",
                    border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem",
                    color: "#0F172A", backgroundColor: "#fff", cursor: "pointer", outline: "none",
                    appearance: "none", fontWeight: 600
                  }}
                >
                  {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8", pointerEvents: "none" }}>
                  schedule
                </span>
                <span className="material-symbols-outlined" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8", pointerEvents: "none" }}>
                  expand_more
                </span>
              </div>
            </div>

          </div>

          {/* 5. Status Toggle */}
          <div style={CARD_SECTION}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.875rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>settings</span>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A" }}>
                  Status
                </label>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Trip status (active by default)</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                style={{
                  width: 44, height: 24, borderRadius: 12,
                  backgroundColor: isActive ? "#16A34A" : "#CBD5E1",
                  border: "none", cursor: "pointer", position: "relative",
                  transition: "background-color 200ms", padding: 2
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", backgroundColor: "#fff",
                  transform: isActive ? "translateX(20px)" : "translateX(0px)",
                  transition: "transform 200ms", boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                }} />
              </button>

              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: isActive ? "#16A34A" : "#64748B" }}>
                {isActive ? "Active" : "Inactive"}
              </span>

              <span style={{ fontSize: "0.75rem", color: "#94A3B8", marginLeft: "0.5rem" }}>
                Trip will be visible for booking when active.
              </span>
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.25rem" }}>
            <Link
              href="/trips"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                padding: "0.5625rem 1rem", border: "1px solid #E2E8F0",
                borderRadius: 8, backgroundColor: "#fff", color: "#475569",
                fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none"
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
              Cancel
            </Link>

            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                padding: "0.5625rem 1.5rem", border: "none",
                borderRadius: 8, backgroundColor: "#B91C1C", color: "#fff",
                fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer",
                boxShadow: "0 1px 2px rgba(185,28,28,0.2)"
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_add_on</span>
              Create Trip
            </button>
          </div>

        </div>

        {/* ── RIGHT COLUMN (PREVIEW & NOTES) ── */}
        <div>

          {/* Trip Preview Card */}
          <div style={{ ...CARD_SECTION, padding: 0 }}>
            {/* Header */}
            <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #F8FAFC", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#B91C1C" }}>visibility</span>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>Trip Preview</h3>
                <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Preview of trip details</div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "1.25rem" }}>
              
              {/* Route Path visual box */}
              <div style={{
                padding: "1rem", backgroundColor: "#FFF5F5", borderRadius: 8,
                border: "1px solid #FEE2E2", marginBottom: "1.25rem",
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#0F172A" }}>{currentRoute.start}</div>
                  <div style={{ fontSize: "0.6875rem", color: "#64748B" }}>Start</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#B91C1C" }}>
                  <span style={{ width: 24, borderTop: "2px dashed #FCA5A5" }} />
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                  <span style={{ width: 24, borderTop: "2px dashed #FCA5A5" }} />
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#0F172A" }}>{currentRoute.dest}</div>
                  <div style={{ fontSize: "0.6875rem", color: "#64748B" }}>Destination</div>
                </div>
              </div>

              {/* Key Value Meta List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                
                {/* Date */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748B" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8" }}>calendar_today</span>
                    Journey Date
                  </div>
                  <span style={{ fontWeight: 700, color: "#0F172A" }}>15 Sep 2026 (Mon)</span>
                </div>

                {/* Departure */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748B" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8" }}>schedule</span>
                    Departure Time
                  </div>
                  <span style={{ fontWeight: 700, color: "#0F172A" }}>{departureTime}</span>
                </div>

                {/* Arrival */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748B" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8" }}>timelapse</span>
                    Arrival Time
                  </div>
                  <span style={{ fontWeight: 700, color: "#0F172A" }}>{arrivalTime}</span>
                </div>

                {/* Bus */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748B" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8" }}>directions_bus</span>
                    Bus
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>{currentBus.plate}</div>
                    <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>{currentBus.type} | {currentBus.seats} Seats</div>
                  </div>
                </div>

                {/* Route details */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748B" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8" }}>edit_road</span>
                    Route
                  </div>
                  <div style={{ textAlign: "right", maxWidth: 160 }}>
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>{currentRoute.name}</div>
                    <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>{currentRoute.via}</div>
                  </div>
                </div>

                {/* Status */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8125rem", paddingTop: "0.5rem", borderTop: "1px solid #F1F5F9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748B" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: isActive ? "#16A34A" : "#64748B" }} />
                    Status
                  </div>
                  <span style={{ fontWeight: 700, color: isActive ? "#16A34A" : "#64748B" }}>
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Important Notes Card */}
          <div style={{
            background: "#F0F9FF", borderRadius: 10, padding: "1rem 1.25rem",
            border: "1px solid #BAE6FD"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#0284C7" }}>info</span>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0369A1" }}>Important Notes</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.72rem", color: "#0369A1", lineHeight: 1.6 }}>
              <li>Ensure the selected bus is available on this date and time.</li>
              <li>Check route details and intermediate stops.</li>
              <li>Arrival time is estimated and can be updated later.</li>
              <li>Trip will be visible for booking once created.</li>
            </ul>
          </div>

        </div>

      </div>
    </AdminShell>
  );
}
