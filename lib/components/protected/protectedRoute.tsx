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
    return (
      <div className="text-[whitesmoke] h-[100vh] flex flex-col gap-6 py-5 px-7 mb-10">
        Loading...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
