"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        className="admin-main-content"
        style={{
          marginLeft: 220,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          transition: "margin-left 250ms ease-in-out",
          width: "calc(100% - 220px)",
        }}
      >
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main
          className="admin-main-wrapper"
          style={{ flex: 1, padding: "1.5rem", backgroundColor: "#F1F5F9", overflowX: "hidden" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
