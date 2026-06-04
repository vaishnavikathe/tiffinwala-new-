import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import OverviewTab from "./components/OverviewTab";
import UsersTab from "./components/UsersTab";
import VendorsTab from "./components/VendorsTab";

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState("overview");

  return (
    <AdminLayout
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
    >
      {currentTab === "overview" && <OverviewTab />}
      {currentTab === "users" && <UsersTab />}
      {currentTab === "vendors" && <VendorsTab />}
    </AdminLayout>
  );
}