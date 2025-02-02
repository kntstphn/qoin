import Dashboard from "@/lib/components/dashboard/dashboard";
import ProtectedRoute from "@/lib/components/protected/protectedRoute";

export default function Home() {
  return (
    <main>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </main>
  );
}
