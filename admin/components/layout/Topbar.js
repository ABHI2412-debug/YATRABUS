"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Topbar({ onToggleSidebar }) {
  const router = useRouter();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Notification state
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notifRef = useRef(null);

  // Admin dropdown state
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const NOTIFICATIONS = [
    { id: 1, title: "New Booking Confirmed", desc: "Booking #VB250915001 • Pune → Nagpur", time: "5m ago", icon: "confirmation_number", color: "#16A34A" },
    { id: 2, title: "Trip Departure Notice", desc: "Bus MH-12-RN-4820 departed on schedule", time: "42m ago", icon: "directions_bus", color: "#2563EB" },
    { id: 3, title: "Package Inquiry Received", desc: "Kashmir Holiday (5D/4N) by Priya D.", time: "2h ago", icon: "luggage", color: "#D97706" },
  ];

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    setSearchOpen(false);
    if (q.includes("user") || q.includes("cust") || q.includes("passenger")) {
      router.push(`/users?search=${encodeURIComponent(searchQuery)}`);
    } else if (q.includes("bus") || q.includes("fleet")) {
      router.push(`/buses?search=${encodeURIComponent(searchQuery)}`);
    } else if (q.includes("route") || q.includes("stop")) {
      router.push(`/routes?search=${encodeURIComponent(searchQuery)}`);
    } else if (q.includes("trip") || q.includes("schedule")) {
      router.push(`/trips?search=${encodeURIComponent(searchQuery)}`);
    } else if (q.includes("pkg") || q.includes("tour") || q.includes("pack")) {
      router.push(`/packages?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/bookings?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header style={{
      height: 64,
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E2E8F0",
      display: "flex",
      alignItems: "center",
      padding: "0 1.5rem",
      gap: "1rem",
      position: "sticky",
      top: 0,
      zIndex: 40,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}>
      {/* Hamburger Toggle */}
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label="Toggle Navigation Sidebar"
        style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 6, color: "#475569", display: "flex", borderRadius: 6,
          transition: "background-color 150ms",
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F1F5F9"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>menu</span>
      </button>

      {/* Interactive Global Search */}
      <div ref={searchRef} style={{ flex: 1, maxWidth: 420, position: "relative" }}>
        <form onSubmit={handleSearchSubmit} style={{ margin: 0, position: "relative" }}>
          <span className="material-symbols-outlined" style={{
            position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
            fontSize: 18, color: "#94A3B8", pointerEvents: "none",
          }}>search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search bookings, users, routes, buses..."
            style={{
              width: "100%",
              paddingLeft: 36, paddingRight: 30, paddingTop: 8, paddingBottom: 8,
              border: "1px solid #E2E8F0",
              borderRadius: 8,
              fontSize: "0.8125rem",
              color: "#0F172A",
              backgroundColor: "#F8FAFC",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 150ms, box-shadow 150ms",
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setSearchOpen(false); }}
              style={{
                position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 2, display: "flex",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
            </button>
          )}
        </form>

        {/* Quick Search Dropdown Suggestion */}
        {searchOpen && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)",
            border: "1px solid #E2E8F0",
            padding: "0.5rem 0",
            zIndex: 50,
          }}>
            <div style={{ padding: "0.375rem 0.875rem", fontSize: "0.6875rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Quick Navigation
            </div>
            {[
              { label: "Bookings", href: "/bookings", icon: "confirmation_number" },
              { label: "Users & Customers", href: "/users", icon: "group" },
              { label: "Buses & Fleet", href: "/buses", icon: "directions_bus" },
              { label: "Routes & Stops", href: "/routes", icon: "route" },
              { label: "Trips & Schedules", href: "/trips", icon: "calendar_today" },
              { label: "Holiday Packages", href: "/packages", icon: "travel_explore" },
              { label: "Settings & Profile", href: "/settings", icon: "settings" },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSearchOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.625rem",
                  padding: "0.5rem 0.875rem",
                  color: "#334155",
                  fontSize: "0.8125rem",
                  textDecoration: "none",
                  transition: "background-color 120ms",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F8FAFC"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#64748B" }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Interactive Notification Bell */}
      <div ref={notifRef} style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setNotifOpen(!notifOpen)}
          aria-label="View notifications"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 6, color: "#475569", display: "flex", borderRadius: 8,
            transition: "background-color 150ms",
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F1F5F9"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>notifications</span>
        </button>
        {unreadCount > 0 && (
          <span style={{
            position: "absolute", top: 2, right: 2,
            width: 16, height: 16, borderRadius: "50%",
            backgroundColor: "#B91C1C", color: "#fff",
            fontSize: "0.625rem", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            lineHeight: 1, pointerEvents: "none",
          }}>{unreadCount}</span>
        )}

        {/* Notification Popover */}
        {notifOpen && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: -10,
            width: 320,
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            boxShadow: "0 15px 30px -5px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
            zIndex: 50,
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.75rem 1rem", borderBottom: "1px solid #F1F5F9",
            }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>Notifications</span>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => setUnreadCount(0)}
                  style={{
                    background: "none", border: "none",
                    color: "#B91C1C", fontSize: "0.75rem", fontWeight: 600,
                    cursor: "pointer", padding: 0,
                  }}
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div style={{ maxHeight: 280, overflowY: "auto" }}>
              {NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "0.625rem",
                    padding: "0.75rem 1rem",
                    borderBottom: "1px solid #F8FAFC",
                    cursor: "pointer",
                    transition: "background-color 120ms",
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F8FAFC"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    backgroundColor: n.color + "15",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 2,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: n.color }}>{n.icon}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0F172A" }}>{n.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: 1 }}>{n.desc}</div>
                    <div style={{ fontSize: "0.6875rem", color: "#94A3B8", marginTop: 4 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard"
              onClick={() => setNotifOpen(false)}
              style={{
                display: "block", textAlign: "center", padding: "0.625rem",
                backgroundColor: "#F8FAFC", color: "#B91C1C",
                fontSize: "0.75rem", fontWeight: 600, textDecoration: "none",
                borderTop: "1px solid #F1F5F9",
              }}
            >
              View Activity Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, backgroundColor: "#E2E8F0" }} />

      {/* ── Admin profile: Click redirects to /settings ────────── */}
      <div ref={profileRef} style={{ position: "relative" }}>
        <Link
          href="/settings"
          title="Go to Settings & Profile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            textDecoration: "none",
            padding: "0.35rem 0.5rem",
            borderRadius: 8,
            transition: "background-color 150ms",
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F8FAFC"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >
          {/* Avatar Icon */}
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #B91C1C, #991B1B)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 4px rgba(185, 28, 28, 0.2)",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#fff" }}>person</span>
          </div>

          <div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0F172A", lineHeight: 1.2 }}>Admin</div>
            <div style={{ fontSize: "0.6875rem", color: "#94A3B8", lineHeight: 1.2 }}>Super Admin</div>
          </div>

          <span
            className="material-symbols-outlined"
            style={{ fontSize: 18, color: "#94A3B8", transition: "transform 150ms" }}
          >
            settings
          </span>
        </Link>
      </div>
    </header>
  );
}
