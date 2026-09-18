import React, { useState } from 'react';
import { AdminProvider } from "./context/AdminContext";
import Sidebar from "./component/Sidebar";
import AdminHeader from "./component/AdminHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          {/* FIXED: Added onMenuClick prop here */}
          <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
          <main className=" bg-mauve-50 p-4 md:p-6">
            <Outlet/>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}