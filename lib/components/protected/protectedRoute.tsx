"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@lib/layout/authContext";
import { useEffect } from "react";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return children;
};

export default ProtectedRoute;
