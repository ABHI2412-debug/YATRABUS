"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";

// ── Constants ─────────────────────────────────────────────────────────────────

const BUS_TYPES = [
  {
    id: "bharatbenz-sleeper",
    name: "BharatBenz AC Sleeper (2+1)",
    shortDesc: "Premium comfort with spacious sleepers and modern amenities",
    fullDesc: "Premium comfort with spacious sleepers and modern amenities for a superior travel experience.",
    style: "silver",
    features: [
      { icon: "king_bed",     label: "Spacious Sleepers", color: "#B91C1C" },
      { icon: "auto_awesome", label: "Modern Interiors",  color: "#D97706" },
      { icon: "verified",     label: "Enhanced Safety",   color: "#059669" },
    ],
  },
  {
    id: "volvo-multiaxle",
    name: "Volvo Multi-Axle",
    shortDesc: "Luxury travel with enhanced stability and superior comfort",
    fullDesc: "Luxury travel with enhanced stability and superior comfort across all long-distance routes.",
    style: "red",
    features: [
      { icon: "airline_seat_recline_extra", label: "Luxury Seats",    color: "#B91C1C" },
      { icon: "speed",                       label: "Smooth Ride",     color: "#D97706" },
      { icon: "ac_unit",                     label: "Climate Control", color: "#059669" },
    ],
  },
  {
    id: "seater-recliner",
    name: "Seater (Recliner)",
    shortDesc: "Comfortable recliner seats for a pleasant journey",
    fullDesc: "Comfortable recliner seats with great legroom for a pleasant and affordable journey.",
    style: "silver",
    features: [
      { icon: "event_seat",  label: "Recliner Seats",  color: "#B91C1C" },
      { icon: "wifi",        label: "Free Wi-Fi",      color: "#D97706" },
      { icon: "visibility",  label: "Panoramic View",  color: "#059669" },
    ],
  },
];

const AMENITIES = [
  { id: "wifi",     label: "Wi-Fi",             icon: "wifi" },
  { id: "charging", label: "Charging Port",     icon: "bolt" },
  { id: "blanket",  label: "Blanket",           icon: "king_bed" },
  { id: "water",    label: "Water Bottle",      icon: "water_drop" },
  { id: "snacks",   label: "Snacks",            icon: "restaurant" },
  { id: "gps",      label: "Live GPS Tracking", icon: "gps_fixed" },
];

const STATUS_DOTS = { "Active": "#22C55E", "In Maintenance": "#F59E0B", "Retired": "#F87171" };

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({ icon, title, subtitle, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: "1rem", overflow: "hidden" }}>
      <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #F8FAFC", display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#B91C1C", flexShrink: 0, marginTop: 1 }}>{icon}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#0F172A" }}>{title}</div>
          {subtitle && <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ padding: "1.25rem" }}>{children}</div>
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, color: "#475569", marginBottom: "0.375rem" }}>
      {children}{required && <span style={{ color: "#B91C1C", marginLeft: 2 }}>*</span>}
    </label>
  );
}

function BusIllustration({ busStyle, size = "large" }) {
  const isRed = busStyle === "red";
  const h = size === "large" ? 180 : 100;
  return (
    <div style={{
      width: "100%", height: h, borderRadius: 8,
      background: isRed
        ? "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)"
        : "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* decorative circles */}
      <div style={{ position: "absolute", bottom: -20, right: -20, width: 80, height: 80, borderRadius: "50%", backgroundColor: isRed ? "#FEE2E2" : "#E2E8F0", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: -15, left: -15, width: 60, height: 60, borderRadius: "50%", backgroundColor: isRed ? "#FEE2E2" : "#E2E8F0", opacity: 0.4 }} />
      <span className="material-symbols-outlined" style={{ fontSize: size === "large" ? 88 : 52, color: isRed ? "#B91C1C" : "#94A3B8", position: "relative", zIndex: 1 }}>directions_bus</span>
    </div>
  );
}

function BusTypeCard({ bus, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        border: `${selected ? 2 : 1}px solid ${selected ? "#B91C1C" : "#E2E8F0"}`,
        borderRadius: 10, padding: "0.875rem",
        cursor: "pointer", transition: "all 150ms",
        backgroundColor: selected ? "#FFFBFB" : "#fff",
        position: "relative",
      }}
    >
      {/* Radio button */}
      <div style={{
        width: 16, height: 16, borderRadius: "50%",
        border: `2px solid ${selected ? "#B91C1C" : "#CBD5E1"}`,
        backgroundColor: selected ? "#B91C1C" : "#fff",
        marginBottom: "0.75rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {selected && <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#fff" }} />}
      </div>

      {/* Bus illustration */}
      <BusIllustration busStyle={bus.style} size="small" />

      {/* Info */}
      <div style={{ marginTop: "0.625rem" }}>
        <div style={{ fontWeight: 600, fontSize: "0.8125rem", color: "#0F172A", marginBottom: "0.25rem" }}>{bus.name}</div>
        <div style={{ fontSize: "0.72rem", color: "#94A3B8", lineHeight: 1.4 }}>{bus.shortDesc}</div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NewBusPage() {
  const [selectedBusType,   setSelectedBusType]   = useState(BUS_TYPES[0].id);
  const [selectedAmenities, setSelectedAmenities] = useState(new Set(["wifi", "charging", "blanket", "gps"]));
  const [status,            setStatus]            = useState("Active");
  const [notes,             setNotes]             = useState("");
  const [regPlate,          setRegPlate]          = useState("");
  const [seats,             setSeats]             = useState(40);

  const toggleAmenity = (id) => setSelectedAmenities(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const currentBus = BUS_TYPES.find(b => b.id === selectedBusType) || BUS_TYPES[0];

  const inputStyle = {
    width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
    border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem",
    color: "#0F172A", backgroundColor: "#fff", outline: "none", boxSizing: "border-box",
  };

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <Link href="/buses" style={{ color: "#64748B", textDecoration: "none" }}>Buses</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Register New Bus</span>
      </div>

      {/* Title */}
      <div style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
          Register New Bus
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>Add a new bus to your fleet with complete details.</p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Section 1: Basic Information */}
          <SectionCard icon="directions_bus" title="Basic Information" subtitle="Enter the basic details of the bus">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <Label required>Registration Plate Number</Label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8", pointerEvents: "none" }}>directions_bus</span>
                  <input
                    value={regPlate}
                    onChange={e => setRegPlate(e.target.value)}
                    placeholder="e.g. MH 31 AB 1234"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <Label required>Total Seats</Label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8", pointerEvents: "none" }}>event_seat</span>
                  <input
                    type="number"
                    value={seats}
                    onChange={e => setSeats(Number(e.target.value))}
                    min={1} max={60}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 2: Bus Type */}
          <SectionCard icon="directions_bus" title="Bus Type" subtitle="Select the type of bus">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }}>
              {BUS_TYPES.map(bt => (
                <BusTypeCard
                  key={bt.id}
                  bus={bt}
                  selected={selectedBusType === bt.id}
                  onSelect={() => setSelectedBusType(bt.id)}
                />
              ))}
            </div>
          </SectionCard>

          {/* Section 3: Amenities */}
          <SectionCard icon="settings" title="Amenities" subtitle="Select the amenities available in this bus">
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
              {AMENITIES.map(a => {
                const on = selectedAmenities.has(a.id);
                return (
                  <div
                    key={a.id}
                    onClick={() => toggleAmenity(a.id)}
                    style={{
                      flex: "1 1 calc(16.66% - 0.625rem)", minWidth: 80,
                      border: `1px solid ${on ? "#FCA5A5" : "#E2E8F0"}`,
                      borderRadius: 8, padding: "0.75rem 0.5rem 0.625rem",
                      cursor: "pointer", textAlign: "center",
                      backgroundColor: on ? "#FEF2F2" : "#fff",
                      position: "relative", transition: "all 150ms",
                    }}
                  >
                    {/* Checkbox */}
                    <div style={{
                      position: "absolute", top: 7, right: 7,
                      width: 16, height: 16, borderRadius: 3,
                      border: `1.5px solid ${on ? "#B91C1C" : "#CBD5E1"}`,
                      backgroundColor: on ? "#B91C1C" : "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {on && <span className="material-symbols-outlined" style={{ fontSize: 11, color: "#fff" }}>check</span>}
                    </div>
                    {/* Icon */}
                    <span className="material-symbols-outlined" style={{ fontSize: 22, color: on ? "#B91C1C" : "#94A3B8", marginBottom: "0.3rem", display: "block" }}>{a.icon}</span>
                    {/* Label */}
                    <span style={{ fontSize: "0.7rem", color: on ? "#991B1B" : "#64748B", fontWeight: on ? 600 : 400, lineHeight: 1.2 }}>{a.label}</span>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Section 4: Status + Notes side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1rem", marginBottom: "1rem" }}>
            {/* Status */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", overflow: "hidden" }}>
              <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #F8FAFC", display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#B91C1C", flexShrink: 0, marginTop: 1 }}>schedule</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#0F172A" }}>Status</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: 1 }}>Set the current status of the bus</div>
                </div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)",
                    width: 8, height: 8, borderRadius: "50%",
                    backgroundColor: STATUS_DOTS[status] || "#94A3B8",
                    pointerEvents: "none", zIndex: 1,
                  }} />
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    style={{
                      width: "100%",
                      paddingLeft: 26, paddingRight: 28, paddingTop: 9, paddingBottom: 9,
                      border: "1px solid #E2E8F0", borderRadius: 8,
                      fontSize: "0.875rem", color: "#0F172A",
                      backgroundColor: "#fff", outline: "none", appearance: "none",
                      cursor: "pointer",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%2394A3B8' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 10px center",
                    }}
                  >
                    <option>Active</option>
                    <option>In Maintenance</option>
                    <option>Retired</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", overflow: "hidden" }}>
              <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #F8FAFC", display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#B91C1C", flexShrink: 0, marginTop: 1 }}>description</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#0F172A" }}>Additional Notes <span style={{ fontWeight: 400, color: "#94A3B8", fontSize: "0.8125rem" }}>(Optional)</span></div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: 1 }}>Any additional information about this bus</div>
                </div>
              </div>
              <div style={{ padding: "1rem 1.25rem", position: "relative" }}>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value.slice(0, 500))}
                  placeholder="E.g. Special instructions, maintenance details, etc..."
                  rows={3}
                  style={{
                    width: "100%", padding: "0.5rem 0.75rem",
                    border: "1px solid #E2E8F0", borderRadius: 8,
                    fontSize: "0.8125rem", color: "#0F172A",
                    resize: "none", outline: "none",
                    backgroundColor: "#fff", boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
                <div style={{ position: "absolute", bottom: 20, right: 24, fontSize: "0.72rem", color: "#94A3B8" }}>{notes.length}/500</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.25rem" }}>
            <Link href="/buses" style={{
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
              Save Bus
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ width: 300, flexShrink: 0, position: "sticky", top: 80 }}>

          {/* Bus Preview */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: "1rem", overflow: "hidden" }}>
            <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #F8FAFC", display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#B91C1C" }}>visibility</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0F172A" }}>Bus Preview</div>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: 1 }}>Visual representation of the selected bus type</div>
              </div>
            </div>
            <div style={{ padding: "1rem" }}>
              <BusIllustration busStyle={currentBus.style} size="large" />
              <div style={{ marginTop: "0.875rem" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0F172A", marginBottom: "0.375rem" }}>{currentBus.name}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748B", lineHeight: 1.5, marginBottom: "0.875rem" }}>{currentBus.fullDesc}</div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {currentBus.features.map(f => (
                    <div key={f.label} style={{
                      flex: 1, textAlign: "center",
                      padding: "0.5rem 0.25rem",
                      backgroundColor: "#F8FAFC", borderRadius: 8,
                      border: "1px solid #F1F5F9",
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: f.color, display: "block", marginBottom: "0.2rem" }}>{f.icon}</span>
                      <span style={{ fontSize: "0.65rem", color: "#64748B", lineHeight: 1.2 }}>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div style={{ background: "#F0F9FF", borderRadius: 10, padding: "1rem", border: "1px solid #BAE6FD" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 17, color: "#0284C7" }}>info</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0369A1" }}>Important Notes</span>
            </div>
            <ul style={{ margin: 0, padding: "0 0 0 1rem" }}>
              {[
                "Ensure the registration number is accurate.",
                "Select all applicable amenities.",
                "The bus will be available for trip assignment once registered.",
                "You can update the details later from the bus list.",
              ].map(note => (
                <li key={note} style={{ fontSize: "0.75rem", color: "#0369A1", marginBottom: "0.375rem", lineHeight: 1.4 }}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
