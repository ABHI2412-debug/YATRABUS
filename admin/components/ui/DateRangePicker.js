"use client";

import { useState, useRef, useEffect } from "react";

export default function DateRangePicker({ initialStart = "15 Sep 2026", initialEnd = "30 Sep 2026", onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(15);
  const [endDate, setEndDate] = useState(30);
  const [hoverDate, setHoverDate] = useState(null);
  const pickerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (day) => {
    if (startDate && !endDate) {
      if (day < startDate) {
        setStartDate(day);
      } else {
        setEndDate(day);
        if (onChange) onChange(`${startDate} Sep 2026 — ${day} Sep 2026`);
      }
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  // Calendar days grid for September 2026
  // Sep 1, 2026 starts on Tuesday (offset 2 if Sun=0, Mon=1, Tue=2)
  const daysInMonth = 30;
  const startDayOffset = 2; // Tue

  const days = [];
  for (let i = 0; i < startDayOffset; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const effectiveEnd = endDate || hoverDate;

  return (
    <div style={{ position: "relative" }} ref={pickerRef}>
      {/* Trigger Button / Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.4375rem 0.75rem",
          border: isOpen ? "1.5px solid #B91C1C" : "1px solid #E2E8F0",
          borderRadius: 8,
          backgroundColor: "#fff",
          fontSize: "0.8125rem",
          color: "#0F172A",
          cursor: "pointer",
          boxShadow: isOpen ? "0 0 0 3px rgba(185, 28, 28, 0.1)" : "none",
          transition: "all 150ms",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8" }}>
          calendar_today
        </span>
        <span style={{ fontWeight: 600 }}>{startDate ? `${startDate} Sep 2026` : "Start Date"}</span>
        <span style={{ color: "#94A3B8" }}>—</span>
        <span style={{ fontWeight: 600 }}>{endDate ? `${endDate} Sep 2026` : (startDate ? "Select End" : "End Date")}</span>
        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8", marginLeft: "0.25rem" }}>
          expand_more
        </span>
      </button>

      {/* Pop-up Modal / Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            zIndex: 100,
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
            width: 290,
          }}
        >
          {/* Calendar Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>September 2026</span>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <button
                type="button"
                style={{
                  background: "none", border: "none", cursor: "pointer", color: "#64748B",
                  padding: "0.2rem", borderRadius: 4, display: "flex"
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
              </button>
              <button
                type="button"
                style={{
                  background: "none", border: "none", cursor: "pointer", color: "#64748B",
                  padding: "0.2rem", borderRadius: 4, display: "flex"
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </button>
            </div>
          </div>

          {/* Quick presets */}
          <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.75rem", overflowX: "auto" }}>
            {[
              { label: "Today", s: 15, e: 15 },
              { label: "Next 7 Days", s: 15, e: 22 },
              { label: "This Month", s: 1, e: 30 },
            ].map(preset => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setStartDate(preset.s);
                  setEndDate(preset.e);
                  if (onChange) onChange(`${preset.s} Sep 2026 — ${preset.e} Sep 2026`);
                }}
                style={{
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.6875rem",
                  borderRadius: 4,
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#F8FAFC",
                  color: "#475569",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Day of Week Headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: "0.35rem", textAlign: "center" }}>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
              <span key={d} style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#94A3B8" }}>
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 3 }}>
            {days.map((d, index) => {
              if (d === null) {
                return <div key={`empty-${index}`} />;
              }

              const isStart = startDate === d;
              const isEnd = endDate === d;
              const inRange =
                startDate &&
                effectiveEnd &&
                d > startDate &&
                d < effectiveEnd;

              let bg = "transparent";
              let color = "#0F172A";
              let borderRadius = "6px";

              if (isStart || isEnd) {
                bg = "#B91C1C";
                color = "#FFFFFF";
                if (isStart && effectiveEnd && effectiveEnd > startDate) {
                  borderRadius = "6px 0 0 6px";
                } else if (isEnd && startDate && startDate < endDate) {
                  borderRadius = "0 6px 6px 0";
                }
              } else if (inRange) {
                bg = "#FEE2E2";
                color = "#991B1B";
                borderRadius = "0";
              }

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleDateClick(d)}
                  onMouseEnter={() => {
                    if (startDate && !endDate) setHoverDate(d);
                  }}
                  onMouseLeave={() => setHoverDate(null)}
                  style={{
                    height: 32,
                    border: "none",
                    backgroundColor: bg,
                    color: color,
                    fontWeight: isStart || isEnd ? 700 : inRange ? 600 : 500,
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    borderRadius: borderRadius,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 100ms",
                    padding: 0,
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Footer note & Done button */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: "0.875rem", paddingTop: "0.625rem", borderTop: "1px solid #F1F5F9"
          }}>
            <span style={{ fontSize: "0.7rem", color: "#64748B" }}>
              {startDate && endDate ? `${endDate - startDate + 1} days selected` : "Select date range"}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                padding: "0.3rem 0.75rem",
                borderRadius: 6,
                backgroundColor: "#B91C1C",
                color: "#fff",
                border: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
