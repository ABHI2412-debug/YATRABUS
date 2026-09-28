"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/layout/AdminShell";

export default function CreatePackagePage() {
  const [formData, setFormData] = useState({
    title: "Kedarnath Yatra",
    category: "Spiritual",
    tagline: "A divine journey to the land of Lord Shiva",
    imageUrl: "https://images.unsplash.com/photo-1605640840605-14ac1855827d",
    days: "6 Days",
    nights: "5 Nights",
    price: "28500",
    status: "Active"
  });

  const [itinerary, setItinerary] = useState([
    { day: 1, title: "Haridwar – Arrival", desc: "Arrive at Haridwar, meet our representative and transfer to hotel. Evening Ganga Aarti at Har Ki Pauri." },
    { day: 2, title: "Haridwar – Guptkashi", desc: "Drive to Guptkashi via Devprayag. En route enjoy the scenic beauty of the Himalayas." },
    { day: 3, title: "Guptkashi – Kedarnath", desc: "Early morning drive to Sonprayag and trek/pony to Kedarnath. Darshan and overnight stay." },
    { day: 4, title: "Kedarnath – Guptkashi", desc: "Morning darshan, explore surrounding areas and return to Guptkashi." },
    { day: 5, title: "Guptkashi – Rishikesh", desc: "Drive to Rishikesh. Visit local temples and enjoy leisure time." },
    { day: 6, title: "Rishikesh – Departure", desc: "After breakfast, transfer to Haridwar for your onward journey." },
  ]);

  const [inclusions, setInclusions] = useState([
    "Accommodation in well-rated hotels",
    "Daily breakfast and dinner",
    "All transfers by AC vehicle",
    "Toll, parking and driver allowance",
    "Experienced tour manager"
  ]);

  const [exclusions, setExclusions] = useState([
    "Air/Train fare to Haridwar",
    "Personal expenses (laundry, shopping, etc.)",
    "Pony/Helicopter charges for Kedarnath",
    "Travel insurance",
    "Any additional sightseeing not mentioned"
  ]);

  const [selectedTags, setSelectedTags] = useState([
    "Satvik Meals", "VIP Darshan Pass", "Couple Friendly", "Family Package"
  ]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const addItineraryDay = () => {
    const nextDay = itinerary.length + 1;
    setItinerary([...itinerary, { day: nextDay, title: "", desc: "" }]);
  };

  const removeItineraryDay = (index) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const addInclusion = () => setInclusions([...inclusions, ""]);
  const removeInclusion = (index) => setInclusions(inclusions.filter((_, i) => i !== index));

  const addExclusion = () => setExclusions([...exclusions, ""]);
  const removeExclusion = (index) => setExclusions(exclusions.filter((_, i) => i !== index));

  const CARD_SECTION = {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #F1F5F9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    padding: "1.5rem",
    marginBottom: "1.25rem",
  };

  const STEP_NUMBER = (num) => (
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      backgroundColor: "#2563EB", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "0.8125rem", fontWeight: 700, flexShrink: 0
    }}>
      {num}
    </div>
  );

  return (
    <AdminShell>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.625rem", fontSize: "0.8125rem" }}>
        <Link href="/dashboard" style={{ color: "#64748B", textDecoration: "none" }}>Dashboard</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <Link href="/packages" style={{ color: "#64748B", textDecoration: "none" }}>Packages</Link>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#94A3B8" }}>chevron_right</span>
        <span style={{ color: "#0F172A", fontWeight: 500 }}>Create Package</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.875rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: 0 }}>
            Create Package
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.375rem" }}>
            Add a new holiday package to showcase to your travellers.
          </p>
        </div>
        <Link href="/packages" style={{
          display: "inline-flex", alignItems: "center", gap: "0.375rem",
          padding: "0.5625rem 1rem", border: "1px solid #E2E8F0",
          borderRadius: 8, backgroundColor: "#fff", color: "#0F172A",
          fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
          Back to Packages
        </Link>
      </div>

      {/* SECTION 1: Basic Information */}
      <div style={CARD_SECTION}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {STEP_NUMBER(1)}
          <div>
            <h3 style={{ margin: 0, fontSize: "1.0625rem", fontWeight: 700, color: "#0F172A" }}>Basic Information</h3>
            <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Provide the basic details about the package.</div>
          </div>
        </div>

        {/* Row 1: Title & Category */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
              Package Title <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: "100%", padding: "0.5625rem 0.75rem", border: "1px solid #E2E8F0",
                borderRadius: 8, fontSize: "0.8125rem", color: "#0F172A", outline: "none"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
              Category <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: "100%", padding: "0.5625rem 0.75rem", border: "1px solid #E2E8F0",
                  borderRadius: 8, fontSize: "0.8125rem", color: "#0F172A", outline: "none",
                  backgroundColor: "#fff", cursor: "pointer"
                }}
              >
                <option>Spiritual</option>
                <option>Domestic</option>
                <option>International</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Tagline & Cover Image URL */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
              Tagline / Short Description <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={e => setFormData({ ...formData, tagline: e.target.value })}
              style={{
                width: "100%", padding: "0.5625rem 0.75rem", border: "1px solid #E2E8F0",
                borderRadius: 8, fontSize: "0.8125rem", color: "#0F172A", outline: "none"
              }}
            />
            {/* Visual Cover Preview Thumbnail */}
            <div style={{
              marginTop: "0.75rem", height: 120, borderRadius: 8,
              background: "linear-gradient(135deg, #334155 0%, #0F172A 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", inset: 0, opacity: 0.2,
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "10px 10px"
              }} />
              <div style={{ textAlign: "center", color: "#fff", zIndex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 36, color: "#F59E0B" }}>temple_hindu</span>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, marginTop: "0.2rem" }}>Kedarnath Dham Cover Preview</div>
              </div>
              <button style={{
                position: "absolute", top: 8, right: 8, width: 22, height: 22,
                borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.5)",
                border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer"
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
              Cover Image URL <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                style={{
                  width: "100%", paddingLeft: "0.75rem", paddingRight: 36, paddingTop: "0.5625rem", paddingBottom: "0.5625rem",
                  border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem",
                  color: "#0F172A", outline: "none"
                }}
              />
              <span className="material-symbols-outlined" style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                fontSize: 18, color: "#94A3B8"
              }}>image</span>
            </div>

            {/* Upload from device drag box */}
            <div style={{
              marginTop: "0.75rem", height: 120, borderRadius: 8,
              border: "1.5px dashed #CBD5E1", backgroundColor: "#F8FAFC",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", cursor: "pointer"
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: "#64748B", marginBottom: "0.25rem" }}>cloud_upload</span>
              <div style={{ fontSize: "0.75rem", color: "#2563EB", fontWeight: 600 }}>Or upload from device</div>
              <div style={{ fontSize: "0.68rem", color: "#94A3B8", marginTop: "0.15rem" }}>Recommended size: 1200 × 675 (JPG, PNG)</div>
            </div>
          </div>
        </div>

        {/* Row 3: Duration, Price, Status */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
              Duration <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <select
                value={formData.days}
                onChange={e => setFormData({ ...formData, days: e.target.value })}
                style={{
                  flex: 1, padding: "0.5625rem 0.75rem", border: "1px solid #E2E8F0",
                  borderRadius: 8, fontSize: "0.8125rem", color: "#0F172A", outline: "none", backgroundColor: "#fff"
                }}
              >
                <option>4 Days</option>
                <option>5 Days</option>
                <option>6 Days</option>
                <option>7 Days</option>
                <option>8 Days</option>
                <option>10 Days</option>
              </select>
              <select
                value={formData.nights}
                onChange={e => setFormData({ ...formData, nights: e.target.value })}
                style={{
                  flex: 1, padding: "0.5625rem 0.75rem", border: "1px solid #E2E8F0",
                  borderRadius: 8, fontSize: "0.8125rem", color: "#0F172A", outline: "none", backgroundColor: "#fff"
                }}
              >
                <option>3 Nights</option>
                <option>4 Nights</option>
                <option>5 Nights</option>
                <option>6 Nights</option>
                <option>7 Nights</option>
                <option>9 Nights</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
              Price per person (₹) <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              style={{
                width: "100%", padding: "0.5625rem 0.75rem", border: "1px solid #E2E8F0",
                borderRadius: 8, fontSize: "0.8125rem", color: "#0F172A", outline: "none"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#475569", marginBottom: "0.35rem" }}>
              Status <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                width: 8, height: 8, borderRadius: "50%", backgroundColor: "#16A34A", pointerEvents: "none"
              }} />
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                style={{
                  width: "100%", paddingLeft: 28, paddingRight: 10, paddingTop: "0.5625rem", paddingBottom: "0.5625rem",
                  border: "1px solid #E2E8F0", borderRadius: 8, fontSize: "0.8125rem",
                  color: "#0F172A", outline: "none", backgroundColor: "#fff", cursor: "pointer"
                }}
              >
                <option>Active</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Itinerary */}
      <div style={CARD_SECTION}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {STEP_NUMBER(2)}
          <div>
            <h3 style={{ margin: 0, fontSize: "1.0625rem", fontWeight: 700, color: "#0F172A" }}>Itinerary</h3>
            <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Create a day-wise itinerary for the package.</div>
          </div>
        </div>

        {/* Itinerary Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {itinerary.map((item, idx) => (
            <div key={idx} style={{
              display: "flex", alignItems: "flex-start", gap: "0.75rem",
              padding: "0.75rem", backgroundColor: "#FAFAFA", borderRadius: 8,
              border: "1px solid #F1F5F9"
            }}>
              {/* Drag handles & Day Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.4rem" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#94A3B8", cursor: "grab" }}>drag_indicator</span>
                <span style={{
                  padding: "0.25rem 0.6rem", borderRadius: 4,
                  backgroundColor: "#FEE2E2", color: "#991B1B",
                  fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap"
                }}>
                  Day {item.day}
                </span>
              </div>

              {/* Title input */}
              <div style={{ width: "240px", flexShrink: 0 }}>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 600, color: "#64748B", marginBottom: "0.2rem" }}>
                  Title <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={e => {
                    const next = [...itinerary];
                    next[idx].title = e.target.value;
                    setItinerary(next);
                  }}
                  style={{
                    width: "100%", padding: "0.45rem 0.625rem", border: "1px solid #E2E8F0",
                    borderRadius: 6, fontSize: "0.8125rem", color: "#0F172A", outline: "none", backgroundColor: "#fff"
                  }}
                />
              </div>

              {/* Description textarea */}
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 600, color: "#64748B", marginBottom: "0.2rem" }}>
                  Description <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <textarea
                  rows={2}
                  value={item.desc}
                  onChange={e => {
                    const next = [...itinerary];
                    next[idx].desc = e.target.value;
                    setItinerary(next);
                  }}
                  style={{
                    width: "100%", padding: "0.45rem 0.625rem", border: "1px solid #E2E8F0",
                    borderRadius: 6, fontSize: "0.78rem", color: "#0F172A", outline: "none",
                    backgroundColor: "#fff", resize: "none"
                  }}
                />
              </div>

              {/* Delete Day action */}
              <button
                onClick={() => removeItineraryDay(idx)}
                style={{
                  marginTop: "1.2rem", background: "none", border: "none",
                  color: "#EF4444", cursor: "pointer", padding: "0.25rem"
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
              </button>
            </div>
          ))}
        </div>

        {/* Add Another Day Button */}
        <button
          onClick={addItineraryDay}
          style={{
            marginTop: "1rem", width: "100%", padding: "0.625rem",
            border: "1.5px dashed #CBD5E1", borderRadius: 8,
            backgroundColor: "#fff", color: "#2563EB", fontSize: "0.8125rem",
            fontWeight: 600, cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", gap: "0.35rem"
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
          Add Another Day
        </button>
      </div>

      {/* SECTION 3: Inclusions & Exclusions */}
      <div style={CARD_SECTION}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {STEP_NUMBER(3)}
          <div>
            <h3 style={{ margin: 0, fontSize: "1.0625rem", fontWeight: 700, color: "#0F172A" }}>Inclusions & Exclusions</h3>
            <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Specify what is included and not included in the package.</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          
          {/* Inclusions Box */}
          <div style={{ padding: "1rem", backgroundColor: "#F0FDF4", borderRadius: 8, border: "1px solid #DCFCE7" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.875rem", fontWeight: 700, color: "#166534", marginBottom: "0.75rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#16A34A" }}>check_circle</span>
              Inclusions
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {inclusions.map((inc, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8", cursor: "grab" }}>drag_indicator</span>
                  <input
                    type="text"
                    value={inc}
                    onChange={e => {
                      const next = [...inclusions];
                      next[i] = e.target.value;
                      setInclusions(next);
                    }}
                    style={{
                      flex: 1, padding: "0.45rem 0.625rem", border: "1px solid #E2E8F0",
                      borderRadius: 6, fontSize: "0.78rem", color: "#0F172A", outline: "none", backgroundColor: "#fff"
                    }}
                  />
                  <button onClick={() => removeInclusion(i)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addInclusion}
              style={{
                marginTop: "0.75rem", padding: "0.4rem 0.75rem", border: "1px solid #BBF7D0",
                borderRadius: 6, backgroundColor: "#fff", color: "#166534", fontSize: "0.75rem",
                fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem"
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
              Add Inclusion
            </button>
          </div>

          {/* Exclusions Box */}
          <div style={{ padding: "1rem", backgroundColor: "#FEF2F2", borderRadius: 8, border: "1px solid #FEE2E2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.875rem", fontWeight: 700, color: "#991B1B", marginBottom: "0.75rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#DC2626" }}>cancel</span>
              Exclusions
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {exclusions.map((exc, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94A3B8", cursor: "grab" }}>drag_indicator</span>
                  <input
                    type="text"
                    value={exc}
                    onChange={e => {
                      const next = [...exclusions];
                      next[i] = e.target.value;
                      setExclusions(next);
                    }}
                    style={{
                      flex: 1, padding: "0.45rem 0.625rem", border: "1px solid #E2E8F0",
                      borderRadius: 6, fontSize: "0.78rem", color: "#0F172A", outline: "none", backgroundColor: "#fff"
                    }}
                  />
                  <button onClick={() => removeExclusion(i)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addExclusion}
              style={{
                marginTop: "0.75rem", padding: "0.4rem 0.75rem", border: "1px solid #FECACA",
                borderRadius: 6, backgroundColor: "#fff", color: "#991B1B", fontSize: "0.75rem",
                fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem"
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
              Add Exclusion
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 4: Tags & Features */}
      <div style={CARD_SECTION}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {STEP_NUMBER(4)}
          <div>
            <h3 style={{ margin: 0, fontSize: "1.0625rem", fontWeight: 700, color: "#0F172A" }}>Tags & Features</h3>
            <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Select relevant tags to highlight key features of this package.</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem" }}>
          {[
            "Satvik Meals", "VIP Darshan Pass", "Jain Meal", "Couple Friendly", "Family Package",
            "Senior Citizen Friendly", "Adventure", "Photography Friendly", "Customizable", "Group Discount"
          ].map(tag => {
            const checked = selectedTags.includes(tag);
            return (
              <label
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  fontSize: "0.78rem", color: "#0F172A", cursor: "pointer",
                  userSelect: "none"
                }}
              >
                <div style={{
                  width: 16, height: 16, borderRadius: 4,
                  border: checked ? "none" : "1.5px solid #CBD5E1",
                  backgroundColor: checked ? "#2563EB" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff"
                }}>
                  {checked && <span className="material-symbols-outlined" style={{ fontSize: 12 }}>check</span>}
                </div>
                <span>{tag}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 1.5rem", backgroundColor: "#fff", borderRadius: 12,
        border: "1px solid #F1F5F9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
      }}>
        <button style={{
          display: "inline-flex", alignItems: "center", gap: "0.35rem",
          padding: "0.5625rem 1rem", border: "1px solid #E2E8F0", borderRadius: 8,
          backgroundColor: "#fff", color: "#475569", fontSize: "0.8125rem",
          fontWeight: 600, cursor: "pointer"
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>visibility</span>
          Preview Package
        </button>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button style={{
            padding: "0.5625rem 1.25rem", border: "1px solid #E2E8F0", borderRadius: 8,
            backgroundColor: "#fff", color: "#475569", fontSize: "0.8125rem",
            fontWeight: 600, cursor: "pointer"
          }}>
            Save as Draft
          </button>
          <button style={{
            padding: "0.5625rem 1.5rem", border: "none", borderRadius: 8,
            backgroundColor: "#B91C1C", color: "#fff", fontSize: "0.8125rem",
            fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.35rem",
            boxShadow: "0 1px 2px rgba(185,28,28,0.2)"
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>save</span>
            Save Package
          </button>
        </div>
      </div>

    </AdminShell>
  );
}
