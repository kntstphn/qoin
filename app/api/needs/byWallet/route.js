import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export async function GET(request) {
  try {
    // Extract the 'wallet' parameter from the query string
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet") || "PNB";

    const q = query(collection(db, "needs"), where("wallet", "==", wallet));
    const querySnapshot = await getDocs(q);

    // Map through the documents and collect relevant data (documentId, wallet, timestamp, amount)
    const documents = querySnapshot.docs.map((doc) => ({
      timestamp: doc.data().timestamp,
      amount: doc.data().amount,
    }));

    // Calculate the total amount
    const totalAmount = documents.reduce((acc, doc) => acc + doc.amount, 0);

    // Return the response with the documents and total amount
    return new Response(
      JSON.stringify({
        totalAmount,
        message: "Needs expenses by wallet retrieved successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Needs expenses by wallet:", error);

    return new Response(
      JSON.stringify({
        message: "Error fetching Needs expenses by wallet",
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
