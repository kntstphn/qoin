import { db } from "@lib/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(request) {
  try {
    // Extract userId from query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let accountData = null;

    try {
      // Query the 'account' collection for a document matching userId
      const q = query(collection(db, "account"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; // Get the first matching document
        accountData = { id: doc.id, ...doc.data() };
      }
    } catch (error) {
      console.error("Error retrieving account data:", error);
    }

    if (!accountData) {
      return new Response(
        JSON.stringify({ error: "No account found for this userId" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        account: accountData,
        message: "Account retrieved successfully!",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error retrieving account:", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve account" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
