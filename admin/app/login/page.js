"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("admin@vedbus.com");
  const [password, setPassword] = useState("admin123");
  const [role, setRole] = useState("super_admin");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Modals state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Handle Login submission
  const handleSubmit = (e) => {
    e?.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your admin email address.");
      return;
    }
    if (!password) {
      setError("Please enter your admin password.");
      return;
    }

    setLoading(true);

    // Simulate authentication check
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    }, 900);
  };

  // Quick demo credentials fill
  const handleQuickDemo = (demoEmail, demoPass, demoRole) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setRole(demoRole);
    setError("");
  };

  // Handle Forgot Password
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setForgotModalOpen(false);
      setForgotEmail("");
    }, 2200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0B1120",
        backgroundImage: "url('/images/login-backdrop.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        color: "#F8FAFC",
        overflowX: "hidden",
        fontFamily: "var(--font-inter, system-ui, sans-serif)",
      }}
    >
      {/* Dark gradient overlay for optimal contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(11, 17, 32, 0.45) 0%, rgba(11, 17, 32, 0.78) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Top Atmospheric Navigation / Header ──────────────────────── */}
      <header
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.75rem 2.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Logo badge on top-left (visible if backdrop hides) */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <span style={{ fontSize: "1.375rem", fontWeight: 800, color: "#EF4444", letterSpacing: "-0.02em" }}>Ved</span>
            <span style={{ fontSize: "1.375rem", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>Bus</span>
            <span style={{ fontSize: "0.6875rem", color: "#94A3B8", marginLeft: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Operations</span>
          </div>
        </div>

        {/* Top-Right Slogan with red underline accent */}
        <div className="login-top-slogan" style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#E2E8F0", fontWeight: 500, letterSpacing: "0.01em" }}>
            Good journeys. Greater destinations.
          </p>
          <div style={{ width: 34, height: 2, backgroundColor: "#DC2626", marginLeft: "auto", marginTop: 4, borderRadius: 2 }} />
        </div>
      </header>

      {/* ── Main Hero Row with Center Card ─────────────────────────── */}
      <main
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 1.5rem",
        }}
      >
        {/* Left Editorial Branding (visible on desktop) */}
        <div
          className="login-left-brand"
          style={{
            position: "absolute",
            left: "4rem",
            maxWidth: "340px",
            display: "none", // Toggled via CSS for >= 1200px
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display'), Georgia, serif",
              fontStyle: "italic",
              fontSize: "2.5rem",
              fontWeight: 600,
              lineHeight: 1.18,
              color: "#E2E8F0",
              margin: "0 0 1rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Powering Journeys Across Bharat
          </h2>
          <div style={{ width: 44, height: 3, backgroundColor: "#DC2626", marginBottom: "1rem", borderRadius: 2 }} />
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.22em",
              color: "#94A3B8",
              textTransform: "uppercase",
              fontWeight: 600,
              margin: 0,
            }}
          >
            People • Places • Possibilities
          </p>
        </div>

        {/* ── Center Glassmorphic Login Card ──────────────────────── */}
        <div
          className="login-glass-card"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 430,
            background:
              "radial-gradient(circle at 88% 12%, rgba(220, 38, 38, 0.22) 0%, transparent 45%), rgba(15, 23, 42, 0.82)",
            backdropFilter: "blur(24px) saturate(190%)",
            WebkitBackdropFilter: "blur(24px) saturate(190%)",
            borderRadius: 22,
            border: "1px solid rgba(255, 255, 255, 0.13)",
            boxShadow:
              "0 30px 60px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            padding: "2.25rem 2.25rem 1.75rem",
            boxSizing: "border-box",
          }}
        >
          {/* Card Header: Brand + Icon */}
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "1.875rem", fontWeight: 800, color: "#EF4444", letterSpacing: "-0.02em" }}>
                Ved
              </span>
              <span style={{ fontSize: "1.875rem", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                Bus
              </span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#DC2626",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 4,
                  boxShadow: "0 2px 8px rgba(220, 38, 38, 0.4)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 19, color: "#FFFFFF" }}>
                  directions_bus
                </span>
              </div>
            </div>

            <div
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.25em",
                color: "#94A3B8",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              ADMIN PORTAL
            </div>
            <div
              style={{
                width: 32,
                height: 2,
                backgroundColor: "#DC2626",
                margin: "8px auto 14px",
                borderRadius: 2,
              }}
            />

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-playfair, 'Playfair Display'), Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.625rem",
                fontWeight: 600,
                color: "#FFFFFF",
                margin: "0 0 4px",
              }}
            >
              Welcome Back
            </h1>
            <p style={{ fontSize: "0.8125rem", color: "#94A3B8", margin: 0 }}>
              Sign in to your admin account
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 0.875rem",
                borderRadius: 10,
                backgroundColor: "rgba(220, 38, 38, 0.18)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#FCA5A5",
                fontSize: "0.8125rem",
                marginBottom: "1rem",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#EF4444" }}>
                error
              </span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 0.875rem",
                borderRadius: 10,
                backgroundColor: "rgba(34, 197, 94, 0.18)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                color: "#86EFAC",
                fontSize: "0.8125rem",
                marginBottom: "1rem",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#22C55E" }}>
                check_circle
              </span>
              <span>Authentication successful. Redirecting to dashboard...</span>
            </div>
          )}

          {/* ── Login Form ────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9375rem" }}>
            {/* Email Address */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "#E2E8F0",
                  marginBottom: "0.375rem",
                }}
              >
                Email Address
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(30, 41, 59, 0.72)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 10,
                  padding: "0 0.875rem",
                  transition: "all 0.2s ease",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#94A3B8" }}>
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vedbus.com"
                  autoComplete="email"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    padding: "0.75rem 0.625rem",
                    color: "#FFFFFF",
                    fontSize: "0.875rem",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "#E2E8F0",
                  marginBottom: "0.375rem",
                }}
              >
                Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(30, 41, 59, 0.72)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 10,
                  padding: "0 0.875rem",
                  transition: "all 0.2s ease",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#94A3B8" }}>
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    padding: "0.75rem 0.625rem",
                    color: "#FFFFFF",
                    fontSize: "0.875rem",
                    fontFamily: "inherit",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "#94A3B8",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Admin Designation / Role Selector (Enterprise Feature) */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.375rem" }}>
                <label style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#E2E8F0" }}>
                  Portal Role / Designation
                </label>
                <span style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Access Scope</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(30, 41, 59, 0.72)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 10,
                  padding: "0 0.875rem",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#94A3B8" }}>
                  badge
                </span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    padding: "0.7rem 0.625rem",
                    color: "#FFFFFF",
                    fontSize: "0.8125rem",
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <option value="super_admin" style={{ background: "#0F172A", color: "#fff" }}>
                    Super Admin (Full Headquarters Access)
                  </option>
                  <option value="fleet_manager" style={{ background: "#0F172A", color: "#fff" }}>
                    Fleet & Operations Manager
                  </option>
                  <option value="booking_agent" style={{ background: "#0F172A", color: "#fff" }}>
                    Ticket Booking & Counter Lead
                  </option>
                  <option value="support_lead" style={{ background: "#0F172A", color: "#fff" }}>
                    Customer Support & Leads Executive
                  </option>
                </select>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0.25rem 0",
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  cursor: "pointer",
                  userSelect: "none",
                  fontSize: "0.8125rem",
                  color: "#94A3B8",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    accentColor: "#DC2626",
                    width: 15,
                    height: 15,
                    cursor: "pointer",
                  }}
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "#CBD5E1",
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#CBD5E1")}
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={loading || success}
              style={{
                width: "100%",
                padding: "0.8125rem",
                marginTop: "0.25rem",
                borderRadius: 10,
                border: "none",
                background: loading
                  ? "#991B1B"
                  : "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
                color: "#FFFFFF",
                fontSize: "0.9375rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                cursor: loading ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 4px 14px rgba(220, 38, 38, 0.45)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none";
              }}
            >
              {loading ? (
                <>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 18,
                      animation: "spin 1s linear infinite",
                    }}
                  >
                    progress_activity
                  </span>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pill Helper */}
          <div
            style={{
              marginTop: "0.875rem",
              textAlign: "center",
            }}
          >
            <button
              type="button"
              onClick={() => handleQuickDemo("admin@vedbus.com", "admin123", "super_admin")}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px dashed rgba(255, 255, 255, 0.2)",
                borderRadius: 6,
                padding: "0.25rem 0.6rem",
                color: "#94A3B8",
                fontSize: "0.6875rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.color = "#94A3B8";
              }}
            >
              ⚡ Quick Fill Demo: <strong>admin@vedbus.com</strong> / <strong>admin123</strong>
            </button>
          </div>

          {/* Divider with OR */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "1rem 0 0.875rem",
              color: "#64748B",
            }}
          >
            <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
            <span style={{ padding: "0 0.75rem", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              OR
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
          </div>

          {/* Need help footer */}
          <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#94A3B8" }}>
            Need help?{" "}
            <button
              type="button"
              onClick={() => setSupportModalOpen(true)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#E2E8F0",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Contact the system administrator
            </button>
          </div>
        </div>
      </main>

      {/* ── Bottom Feature Badges & Copyright Bar ───────────────────── */}
      <footer
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Badges with subtle vertical divider */}
        <div
          className="login-bottom-badges"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            color: "#94A3B8",
            fontSize: "0.8125rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#CBD5E1" }}>
              security
            </span>
            <span>Secure Access</span>
          </div>

          <div style={{ width: 1, height: 14, backgroundColor: "rgba(255, 255, 255, 0.15)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#CBD5E1" }}>
              monitoring
            </span>
            <span>Real-time Operations</span>
          </div>

          <div style={{ width: 1, height: 14, backgroundColor: "rgba(255, 255, 255, 0.15)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#CBD5E1" }}>
              directions_bus
            </span>
            <span>Fleet Management</span>
          </div>

          <div style={{ width: 1, height: 14, backgroundColor: "rgba(255, 255, 255, 0.15)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#CBD5E1" }}>
              verified
            </span>
            <span>Better Journeys</span>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
          © 2026 VedBus. All rights reserved.
        </div>
      </footer>

      {/* ── Forgot Password Modal ──────────────────────────────────── */}
      {forgotModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              background: "#0F172A",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 16,
              padding: "1.75rem",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: "1.125rem", color: "#FFFFFF", fontWeight: 600 }}>
                  Reset Admin Password
                </h3>
                <p style={{ margin: 0, fontSize: "0.8125rem", color: "#94A3B8" }}>
                  Enter your registered administrator email to receive a secure recovery link.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", padding: 2 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
              </button>
            </div>

            {forgotSuccess ? (
              <div
                style={{
                  padding: "1rem",
                  borderRadius: 10,
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  border: "1px solid #22C55E",
                  color: "#86EFAC",
                  fontSize: "0.875rem",
                  textAlign: "center",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 28, color: "#22C55E", display: "block", marginBottom: 6 }}>
                  mark_email_read
                </span>
                Password reset link has been dispatched to <strong>{forgotEmail}</strong>.
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", color: "#CBD5E1", marginBottom: 6 }}>
                    Administrator Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@vedbus.com"
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.875rem",
                      borderRadius: 8,
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      backgroundColor: "rgba(30, 41, 59, 0.8)",
                      color: "#FFFFFF",
                      fontSize: "0.875rem",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    style={{
                      padding: "0.625rem 1rem",
                      borderRadius: 8,
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      backgroundColor: "transparent",
                      color: "#CBD5E1",
                      fontSize: "0.8125rem",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "0.625rem 1.125rem",
                      borderRadius: 8,
                      border: "none",
                      backgroundColor: "#DC2626",
                      color: "#FFFFFF",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── Contact Administrator Modal ────────────────────────────── */}
      {supportModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              background: "#0F172A",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 16,
              padding: "1.75rem",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 24, color: "#EF4444" }}>
                  support_agent
                </span>
                <h3 style={{ margin: 0, fontSize: "1.125rem", color: "#FFFFFF", fontWeight: 600 }}>
                  IT & System Support
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSupportModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", padding: 2 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
              </button>
            </div>

            <p style={{ fontSize: "0.8125rem", color: "#94A3B8", lineHeight: 1.5, margin: "0 0 1rem" }}>
              If your administrator account is locked, 2FA code is expired, or you need elevated branch permissions, contact the infrastructure team:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.625rem 0.75rem", backgroundColor: "rgba(30, 41, 59, 0.6)", borderRadius: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#94A3B8" }}>mail</span>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Support Email</div>
                  <a href="mailto:admin-support@vedbus.com" style={{ fontSize: "0.8125rem", color: "#FFFFFF", textDecoration: "none", fontWeight: 500 }}>
                    admin-support@vedbus.com
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.625rem 0.75rem", backgroundColor: "rgba(30, 41, 59, 0.6)", borderRadius: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#94A3B8" }}>call</span>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Urgent Operations Desk</div>
                  <div style={{ fontSize: "0.8125rem", color: "#FFFFFF", fontWeight: 500 }}>+91 (020) 4899-VEDBUS (Ext. 101)</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.625rem 0.75rem", backgroundColor: "rgba(30, 41, 59, 0.6)", borderRadius: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#94A3B8" }}>schedule</span>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "#94A3B8" }}>Hours of Coverage</div>
                  <div style={{ fontSize: "0.8125rem", color: "#FFFFFF", fontWeight: 500 }}>24/7 Fleet & Mission Operations</div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSupportModalOpen(false)}
              style={{
                width: "100%",
                padding: "0.625rem",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#DC2626",
                color: "#FFFFFF",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Inline styles for media queries and animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (min-width: 1200px) {
          .login-left-brand {
            display: block !important;
          }
        }

        @media (max-width: 768px) {
          .login-top-slogan {
            display: none !important;
          }
          .login-bottom-badges {
            gap: 0.75rem !important;
            font-size: 0.75rem !important;
          }
          .login-glass-card {
            padding: 1.75rem 1.25rem 1.5rem !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
