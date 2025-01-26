import Holdings from "@/lib/components/holdings/holdings";
import ProtectedRoute from "@/lib/components/protected/protectedRoute";
import React from "react";

function Page() {
  return (
    <ProtectedRoute>
      <Holdings />
    </ProtectedRoute>
  );
}

export default Page;
