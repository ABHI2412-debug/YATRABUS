"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("Admin");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Settings</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
          Account Settings
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
          Manage your account information and security settings.
        </p>
      </div>

      {/* Centered Settings Card */}
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #F1F5F9",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          padding: "2rem",
        }}>
          
          <form onSubmit={handleSave}>
            
            {/* ── PROFILE SECTION ── */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  backgroundColor: "#FEF2F2",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>person</span>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>Profile</h3>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Update your personal information.</div>
                </div>
              </div>

              {/* Display Name Input */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
                  Display Name <span style={{ color: "#B91C1C" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    fontSize: 18, color: "#94A3B8", pointerEvents: "none"
                  }}>
                    person_outline
                  </span>
                  <input
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    style={{
                      width: "100%", paddingLeft: 38, paddingRight: 12, paddingTop: 10, paddingBottom: 10,
                      border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem",
                      color: "#0F172A", outline: "none", boxSizing: "border-box",
                      transition: "border-color 150ms"
                    }}
                    onFocus={e => e.target.style.borderColor = "#B91C1C"}
                    onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                  />
                </div>
              </div>

              {/* Email Address (Disabled with tooltip) */}
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    fontSize: 18, color: "#94A3B8", pointerEvents: "none"
                  }}>
                    mail_outline
                  </span>
                  <input
                    type="email"
                    value="admin@vedbus.com"
                    disabled
                    style={{
                      width: "100%", paddingLeft: 38, paddingRight: 40, paddingTop: 10, paddingBottom: 10,
                      border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem",
                      color: "#64748B", backgroundColor: "#F8FAFC", cursor: "not-allowed",
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                  {/* Lock Icon */}
                  <span className="material-symbols-outlined" style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    fontSize: 18, color: "#64748B", pointerEvents: "none"
                  }}>
                    lock_outline
                  </span>

                  {/* "Cannot be changed" dark tooltip bubble */}
                  <div style={{
                    position: "absolute",
                    top: -32,
                    right: 0,
                    backgroundColor: "#1E293B",
                    color: "#fff",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    padding: "0.3rem 0.6rem",
                    borderRadius: 6,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                  }}>
                    Cannot be changed
                    {/* Small triangle arrow */}
                    <div style={{
                      position: "absolute",
                      bottom: -4,
                      right: 14,
                      width: 8,
                      height: 8,
                      backgroundColor: "#1E293B",
                      transform: "rotate(45deg)"
                    }} />
                  </div>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.35rem" }}>
                  Your email address cannot be changed.
                </div>
              </div>
            </div>

            <div style={{ height: 1, backgroundColor: "#F1F5F9", margin: "2rem 0" }} />

            {/* ── CHANGE PASSWORD SECTION ── */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  backgroundColor: "#FEF2F2",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#B91C1C" }}>lock</span>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>Change Password</h3>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Update your password to keep your account secure.</div>
                </div>
              </div>

              {/* Current Password */}
              <div style={{ marginBottom: "1.125rem" }}>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
                  Current Password <span style={{ color: "#B91C1C" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    fontSize: 18, color: "#94A3B8", pointerEvents: "none"
                  }}>
                    lock_outline
                  </span>
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    style={{
                      width: "100%", paddingLeft: 38, paddingRight: 40, paddingTop: 10, paddingBottom: 10,
                      border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem",
                      color: "#0F172A", outline: "none", boxSizing: "border-box"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    style={{
                      position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", color: "#94A3B8",
                      display: "flex", padding: 4
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      {showCurrent ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div style={{ marginBottom: "1.125rem" }}>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
                  New Password <span style={{ color: "#B91C1C" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    fontSize: 18, color: "#94A3B8", pointerEvents: "none"
                  }}>
                    lock_outline
                  </span>
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    style={{
                      width: "100%", paddingLeft: 38, paddingRight: 40, paddingTop: 10, paddingBottom: 10,
                      border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem",
                      color: "#0F172A", outline: "none", boxSizing: "border-box"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    style={{
                      position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", color: "#94A3B8",
                      display: "flex", padding: 4
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      {showNew ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
                  Confirm New Password <span style={{ color: "#B91C1C" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    fontSize: 18, color: "#94A3B8", pointerEvents: "none"
                  }}>
                    lock_outline
                  </span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    style={{
                      width: "100%", paddingLeft: 38, paddingRight: 40, paddingTop: 10, paddingBottom: 10,
                      border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem",
                      color: "#0F172A", outline: "none", boxSizing: "border-box"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{
                      position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", color: "#94A3B8",
                      display: "flex", padding: 4
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      {showConfirm ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Password Requirement Hint Alert */}
              <div style={{
                background: "#EFF6FF",
                borderRadius: 8,
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                border: "1px solid #DBEAFE",
                marginBottom: "1.5rem"
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#2563EB", flexShrink: 0 }}>
                  info
                </span>
                <span style={{ fontSize: "0.75rem", color: "#1E40AF", lineHeight: 1.4 }}>
                  Use a strong password with at least 8 characters, including letters, numbers and symbols.
                </span>
              </div>
            </div>

            {/* Save Changes Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "none",
                borderRadius: 8,
                backgroundColor: saved ? "#16A34A" : "#DC2626",
                color: "#fff",
                fontSize: "0.9375rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)",
                transition: "background-color 200ms ease"
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                {saved ? "check" : "save"}
              </span>
              {saved ? "Changes Saved Successfully!" : "Save Changes"}
            </button>

          </form>

        </div>
      </div>
    </AdminShell>
  );
}
