import { useState, useRef, useEffect } from "react";

export default function Topbar({ onToggleSidebar }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const markAllAsRead = async () => {
    try {
      await fetch('http://localhost:5000/api/notifications/mark-read', { method: 'POST' });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark all as read', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {/* Hamburger */}
      <button
        type="button"
        onClick={onToggleSidebar}
        style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 6, color: "#475569", display: "flex", borderRadius: 6
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>menu</span>
      </button>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 420, position: "relative" }}>
        <span className="material-symbols-outlined" style={{
          position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
          fontSize: 18, color: "#94A3B8", pointerEvents: "none",
        }}>search</span>
        <input
          type="text"
          placeholder="Search for bookings, users, routes..."
          style={{
            width: "100%",
            paddingLeft: 36, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            fontSize: "0.8125rem",
            color: "#0F172A",
            backgroundColor: "#F8FAFC",
            outline: "none",
          }}
        />
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Notification bell */}
      <div style={{ position: "relative" }} ref={notifRef}>
        <button 
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          style={{
            background: isNotifOpen ? "#F1F5F9" : "none", 
            border: "none", cursor: "pointer",
            padding: 6, color: "#475569", display: "flex", borderRadius: 8,
            transition: "background 0.2s"
          }}
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
            lineHeight: 1,
            pointerEvents: "none"
          }}>{unreadCount}</span>
        )}

        {/* Dropdown menu */}
        {isNotifOpen && (
          <div style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 8,
            width: 320,
            backgroundColor: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: 12,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            zIndex: 50,
            overflow: "hidden"
          }}>
            <div style={{
              padding: "12px 16px",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#F8FAFC"
            }}>
              <h3 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600, color: "#0F172A" }}>Notifications</h3>
              <button 
                onClick={markAllAsRead}
                style={{
                background: "none", border: "none", color: "#3B82F6", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer"
              }}>Mark all as read</button>
            </div>
            
            <div style={{ maxHeight: 360, overflowY: "auto" }}>
              {notifications.map(notif => (
                <div key={notif.id} style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #F1F5F9",
                  display: "flex",
                  gap: "12px",
                  backgroundColor: notif.read ? "#fff" : "#F8FAFC",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    backgroundColor: notif.type === "cancelation" ? "#FEF2F2" : (notif.type === "alert" ? "#FFFBEB" : "#EFF6FF"),
                    color: notif.type === "cancelation" ? "#EF4444" : (notif.type === "alert" ? "#F59E0B" : "#3B82F6"),
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      {notif.type === "cancelation" ? "cancel" : (notif.type === "alert" ? "warning" : "info")}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0F172A", marginBottom: 4 }}>
                      {notif.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#475569", lineHeight: 1.4, marginBottom: 4 }}>
                      {notif.message}
                    </div>
                    <div style={{ fontSize: "0.6875rem", color: "#94A3B8", fontWeight: 500 }}>
                      {notif.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              padding: "10px",
              textAlign: "center",
              borderTop: "1px solid #E2E8F0",
              backgroundColor: "#F8FAFC"
            }}>
              <button style={{
                background: "none", border: "none", color: "#475569", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer"
              }}>View All Notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, backgroundColor: "#E2E8F0" }} />

      {/* Admin profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer" }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #B91C1C, #991B1B)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#fff" }}>person</span>
        </div>
        <div>
          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0F172A", lineHeight: 1.2 }}>Admin</div>
          <div style={{ fontSize: "0.6875rem", color: "#94A3B8", lineHeight: 1.2 }}>Super Admin</div>
        </div>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#94A3B8" }}>expand_more</span>
      </div>
    </header>
  );
}
