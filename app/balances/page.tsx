import Balances from "@/lib/components/balances/balances";
import ProtectedRoute from "@/lib/components/protected/protectedRoute";
import React from "react";

function Page() {
  return (
    <ProtectedRoute>
      <Balances />
    </ProtectedRoute>
  );
}

export default Page;
