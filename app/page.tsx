import Homepage from "@/lib/components/homepage/home";
import ProtectedRoute from "@/lib/components/protected/protectedRoute";

export default function Home() {
  return (
    <main>
      <ProtectedRoute>
        <Homepage />
      </ProtectedRoute>
    </main>
  );
}
