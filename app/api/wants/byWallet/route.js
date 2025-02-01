import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase/config";

export async function GET(request) {
  try {
    // Extract 'wallet' and 'userId' parameters from the query string
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet") || "PNB"; // Default to "PNB" if wallet is not provided
    const userId = url.searchParams.get("userId");

    // Check if userId is provided
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Create a query to get documents where both wallet and userId match
    const q = query(
      collection(db, "wants"),
      where("wallet", "==", wallet),
      where("userId", "==", userId)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map through the documents and collect relevant data
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      ...doc.data(), // Include all fields from the document
    }));

    // Return the response with the queried documents
    return new Response(
      JSON.stringify({
        documents,
        message: "Wants expenses by wallet and userId retrieved successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Wants expenses by wallet and userId:", error);

    return new Response(
      JSON.stringify({
        message: "Error fetching Wants expenses by wallet and userId",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
