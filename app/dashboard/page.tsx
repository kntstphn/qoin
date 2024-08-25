import Dashboard from "@/lib/components/dashboard/dashboard";
import ProtectedRoute from "@/lib/components/protected/protectedRoute";
import React from "react";

function Page() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

export default Page;
