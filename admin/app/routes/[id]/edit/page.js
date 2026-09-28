"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";

// ── Constants ─────────────────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AMENITIES = [
  { id: "ac",       label: "AC",            icon: "ac_unit" },
  { id: "wifi",     label: "Wi-Fi",         icon: "wifi" },
  { id: "charging", label: "Charging Port", icon: "bolt" },
  { id: "blanket",  label: "Blanket",       icon: "king_bed" },
  { id: "water",    label: "Water Bottle",  icon: "water_drop" },
  { id: "snacks",   label: "Snacks",        icon: "restaurant" },
  { id: "gps",      label: "GPS Tracking",  icon: "gps_fixed" },
];

const CITIES   = ["Nagpur", "Pune", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Varanasi", "Surat"];
const BUSES    = ["MH 31 AB 1234", "MH 04 CD 5678", "DL 01 EF 9012", "GJ 05 AB 3456"];
const BUS_TYPES = ["Volvo AC (Semi Sleeper)", "BharatBenz AC Sleeper 2+1", "Seater Recliner", "Non-AC Sleeper"];
const DRIVERS  = ["Suresh Patil", "Ramesh Kumar", "Vijay Singh", "Arun Sharma"];

// ── Shared style helpers ──────────────────────────────────────────────────────

const inputStyle = (withIcon) => ({
  width: "100%",
  paddingLeft: withIcon ? 34 : 12,
  paddingRight: 12,
  paddingTop: 9,
  paddingBottom: 9,
  border: "1px solid #E2E8F0",
  borderRadius: 8,
  fontSize: "0.875rem",
  color: "#0F172A",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
});

const selectStyle = (withIcon) => ({
  ...inputStyle(withIcon),
  appearance: "none",
  cursor: "pointer",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%2394A3B8' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  paddingRight: 28,
});

// ── Sub-components ────────────────────────────────────────────────────────────

function Label({ children, required }) {
  return (
    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#475569", marginBottom: "0.375rem" }}>
      {children}{required && <span style={{ color: "#B91C1C", marginLeft: 2 }}>*</span>}
    </label>
  );
}

function FieldIcon({ icon }) {
  return (
    <span className="material-symbols-outlined" style={{
      position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
      fontSize: 15, color: "#94A3B8", pointerEvents: "none",
    }}>{icon}</span>
  );
}

function SectionCard({ icon, title, subtitle, children, noPad }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: "1rem", overflow: "hidden" }}>
      <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #F8FAFC", display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#B91C1C", flexShrink: 0, marginTop: 1 }}>{icon}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#0F172A" }}>{title}</div>
          {subtitle && <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={noPad ? {} : { padding: "1.25rem" }}>{children}</div>
    </div>
  );
}

function SideCard({ icon, title, subtitle, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: "1rem", overflow: "hidden" }}>
      <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #F8FAFC", display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 19, color: "#B91C1C", flexShrink: 0, marginTop: 1 }}>{icon}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0F172A" }}>{title}</div>
          {subtitle && <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ padding: "1rem 1.25rem" }}>{children}</div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NewRoutePage() {
  const [activeDays,       setActiveDays]       = useState(new Set(["Mon", "Tue", "Wed", "Thu", "Fri"]));
  const [stops,            setStops]            = useState(["Wardha", "Amravati", "Akola", "Shegaon"]);
  const [stopSearch,       setStopSearch]       = useState("");
  const [selectedAmenities,setSelectedAmenities]= useState(new Set(["ac", "wifi", "charging"]));
  const [notes,            setNotes]            = useState("");
  const [form,             setForm]             = useState({
    fromCity:  "Nagpur",
    toCity:    "Pune",
    routeName: "Nagpur - Pune Express",
    routeCode: "RT001",
    distance:  "710",
    duration:  "12h 30m",
    fareMin:   "800",
    fareMax:   "1,200",
    busNumber: "MH 31 AB 1234",
    busType:   "Volvo AC (Semi Sleeper)",
    driver:    "Suresh Patil",
  });

  const toggleDay       = (d)  => setActiveDays(s  => { const n = new Set(s); n.has(d)  ? n.delete(d)  : n.add(d);  return n; });
  const toggleAmenity   = (id) => setSelectedAmenities(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const removeStop      = (st) => setStops(s => s.filter(x => x !== st));
  const addStop         = ()   => {
    const v = stopSearch.trim();
    if (v && !stops.includes(v)) { setStops(s => [...s, v]); setStopSearch(""); }
  };
  const setField = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const allPoints = [
    { name: form.fromCity, type: "start" },
    ...stops.map(s => ({ name: s, type: "stop" })),
    { name: form.toCity, type: "end" },
  ];

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <Link href="/routes" style={{ color: "#64748B", textDecoration: "none" }}>Routes</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Create Route</span>
      </div>

      {/* Title */}
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
          Create Route
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>Add a new bus route with complete details.</p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Section 1: Route Information */}
          <SectionCard icon="location_on" title="Route Information" subtitle="Basic details about the route">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              {/* From City */}
              <div>
                <Label required>From City</Label>
                <div style={{ position: "relative" }}>
                  <FieldIcon icon="location_on" />
                  <select value={form.fromCity} onChange={setField("fromCity")} style={selectStyle(true)}>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              {/* To City */}
              <div>
                <Label required>To City</Label>
                <div style={{ position: "relative" }}>
                  <FieldIcon icon="location_on" />
                  <select value={form.toCity} onChange={setField("toCity")} style={selectStyle(true)}>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {/* Route Name */}
              <div>
                <Label required>Route Name</Label>
                <div style={{ position: "relative" }}>
                  <FieldIcon icon="directions_bus" />
                  <input value={form.routeName} onChange={setField("routeName")} placeholder="e.g. Nagpur - Pune Express" style={inputStyle(true)} />
                </div>
              </div>
              {/* Route Code */}
              <div>
                <Label>Route Code / ID <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 400 }}>(Optional)</span></Label>
                <div style={{ position: "relative" }}>
                  <FieldIcon icon="tag" />
                  <input value={form.routeCode} onChange={setField("routeCode")} placeholder="e.g. RT001" style={inputStyle(true)} />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 2: Intermediate Stops */}
          <SectionCard icon="format_list_bulleted" title="Intermediate Stops" subtitle="Add intermediate stops (optional)">
            {/* Search + Add */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.875rem" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <FieldIcon icon="location_on" />
                <input
                  value={stopSearch}
                  onChange={e => setStopSearch(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addStop()}
                  placeholder="Search and add a stop (e.g. Wardha, Amravati...)"
                  style={inputStyle(true)}
                />
              </div>
              <button
                onClick={addStop}
                style={{
                  display: "flex", alignItems: "center", gap: "0.25rem",
                  padding: "0 1rem", borderRadius: 8, border: "none",
                  backgroundColor: "#B91C1C", color: "#fff",
                  fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
                Add Stop
              </button>
            </div>

            {/* Stop chips */}
            {stops.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                {stops.map(st => (
                  <span key={st} style={{
                    display: "inline-flex", alignItems: "center", gap: "0.375rem",
                    padding: "0.3rem 0.625rem", borderRadius: 20,
                    border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC",
                    fontSize: "0.8125rem", color: "#475569",
                  }}>
                    {st}
                    <button onClick={() => removeStop(st)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 0, display: "flex", lineHeight: 1 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div>
                <Label required>Distance (km)</Label>
                <div style={{ position: "relative" }}>
                  <FieldIcon icon="straighten" />
                  <input value={form.distance} onChange={setField("distance")} type="number" style={inputStyle(true)} />
                </div>
              </div>
              <div>
                <Label required>Estimated Duration</Label>
                <div style={{ position: "relative" }}>
                  <FieldIcon icon="schedule" />
                  <input value={form.duration} onChange={setField("duration")} placeholder="e.g. 12h 30m" style={inputStyle(true)} />
                </div>
              </div>
              <div>
                <Label>Fare Range (₹)</Label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <FieldIcon icon="currency_rupee" />
                    <input value={form.fareMin} onChange={setField("fareMin")} placeholder="Min" style={inputStyle(true)} />
                  </div>
                  <span style={{ color: "#94A3B8", fontSize: "0.875rem", flexShrink: 0 }}>–</span>
                  <input value={form.fareMax} onChange={setField("fareMax")} placeholder="Max" style={{ ...inputStyle(false), flex: 1 }} />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 3: Bus & Driver Details */}
          <SectionCard icon="directions_bus" title="Bus & Driver Details" subtitle="Assign bus and driver for this route">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div>
                <Label required>Bus Number</Label>
                <div style={{ position: "relative" }}>
                  <FieldIcon icon="directions_bus" />
                  <select value={form.busNumber} onChange={setField("busNumber")} style={selectStyle(true)}>
                    {BUSES.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <Label>Bus Type</Label>
                <div style={{ position: "relative" }}>
                  <FieldIcon icon="airline_seat_recline_extra" />
                  <select value={form.busType} onChange={setField("busType")} style={selectStyle(true)}>
                    {BUS_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <Label required>Driver</Label>
                <div style={{ position: "relative" }}>
                  <FieldIcon icon="person" />
                  <select value={form.driver} onChange={setField("driver")} style={selectStyle(true)}>
                    {DRIVERS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 4: Services & Amenities */}
          <SectionCard icon="settings" title="Services & Amenities" subtitle="Select amenities available on this route">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
              {AMENITIES.map(a => {
                const on = selectedAmenities.has(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAmenity(a.id)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.375rem",
                      padding: "0.4rem 0.875rem", borderRadius: 20,
                      border: on ? "none" : "1px solid #E2E8F0",
                      backgroundColor: on ? "#FEE2E2" : "#fff",
                      color: on ? "#B91C1C" : "#64748B",
                      fontSize: "0.8125rem", fontWeight: on ? 600 : 400,
                      cursor: "pointer", transition: "all 150ms",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{a.icon}</span>
                    {a.label}
                  </button>
                );
              })}
            </div>
          </SectionCard>

          {/* Section 5: Additional Information */}
          <SectionCard icon="description" title="Additional Information (Optional)">
            <div style={{ position: "relative" }}>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value.slice(0, 500))}
                placeholder="E.g. Boarding point details, special instructions, etc..."
                rows={4}
                style={{
                  width: "100%", padding: "0.625rem 0.875rem",
                  border: "1px solid #E2E8F0", borderRadius: 8,
                  fontSize: "0.875rem", color: "#0F172A",
                  resize: "vertical", outline: "none",
                  backgroundColor: "#fff", boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
              <div style={{ position: "absolute", bottom: 10, right: 12, fontSize: "0.72rem", color: "#94A3B8" }}>
                {notes.length}/500
              </div>
            </div>
          </SectionCard>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.25rem" }}>
            <Link href="/routes" style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              padding: "0.5625rem 1.125rem",
              border: "1px solid #E2E8F0", borderRadius: 8,
              backgroundColor: "#fff", color: "#475569",
              fontSize: "0.875rem", fontWeight: 500, textDecoration: "none",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
              Cancel
            </Link>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              padding: "0.5625rem 1.5rem",
              border: "none", borderRadius: 8,
              backgroundColor: "#B91C1C", color: "#fff",
              fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>save</span>
              Create Route
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ width: 300, flexShrink: 0, position: "sticky", top: 80 }}>

          {/* Operating Days */}
          <SideCard icon="calendar_today" title="Operating Days" subtitle="Select the days this route runs">
            <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
              {DAYS.map(d => {
                const on = activeDays.has(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDay(d)}
                    style={{
                      width: 36, height: 36, borderRadius: "50%", border: "none",
                      backgroundColor: on ? "#B91C1C" : "#F1F5F9",
                      color: on ? "#fff" : "#94A3B8",
                      fontSize: "0.6875rem", fontWeight: 700, cursor: "pointer",
                      transition: "all 150ms",
                    }}
                  >{d}</button>
                );
              })}
            </div>
          </SideCard>

          {/* Route Preview */}
          <SideCard icon="route" title="Route Preview" subtitle="Visual representation of the route">
            <div style={{ display: "flex", gap: "1rem" }}>
              {/* Vertical timeline */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {allPoints.map((pt, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width:  pt.type !== "stop" ? 13 : 7,
                      height: pt.type !== "stop" ? 13 : 7,
                      borderRadius: "50%",
                      backgroundColor: pt.type !== "stop" ? "#B91C1C" : "#CBD5E1",
                      flexShrink: 0, transition: "all 200ms",
                    }} />
                    {i < allPoints.length - 1 && (
                      <div style={{ width: 2, height: 28, backgroundColor: "#E2E8F0", flexShrink: 0 }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Stop labels */}
              <div style={{ flex: 1 }}>
                {allPoints.map((pt, i) => (
                  <div key={i} style={{ height: i < allPoints.length - 1 ? 41 : "auto", display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: 0 }}>
                    <div style={{ fontSize: "0.8125rem", fontWeight: pt.type !== "stop" ? 700 : 400, color: pt.type !== "stop" ? "#0F172A" : "#64748B", lineHeight: 1.2 }}>
                      {pt.name || "—"}
                    </div>
                    {pt.type === "start" && <div style={{ fontSize: "0.65rem", color: "#94A3B8" }}>Start Point</div>}
                    {pt.type === "end"   && <div style={{ fontSize: "0.65rem", color: "#94A3B8" }}>Destination</div>}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", flexShrink: 0 }}>
                {[
                  { icon: "straighten",      label: "Distance",       value: `${form.distance} km` },
                  { icon: "schedule",        label: "Duration",       value: form.duration },
                  { icon: "currency_rupee",  label: "Estimated Fare", value: `₹${form.fareMin} - ${form.fareMax}` },
                  { icon: "directions_bus",  label: "Bus Type",       value: form.busType.split("(")[0].trim() },
                  { icon: "transit_enterexit", label: "Total Stops",   value: String(stops.length) },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.125rem" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 13, color: "#B91C1C" }}>{s.icon}</span>
                      <span style={{ fontSize: "0.65rem", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</span>
                    </div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </SideCard>

          {/* Note */}
          <div style={{ background: "#F0F9FF", borderRadius: 10, padding: "0.875rem 1rem", border: "1px solid #BAE6FD", display: "flex", gap: "0.5rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 17, color: "#0284C7", flexShrink: 0, marginTop: 1 }}>info</span>
            <div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0369A1", marginBottom: "0.25rem" }}>Note</div>
              <div style={{ fontSize: "0.75rem", color: "#0369A1", lineHeight: 1.5 }}>
                The route will be created as Active by default. You can manage its status later from the routes list.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
