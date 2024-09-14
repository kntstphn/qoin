import { db } from "@lib/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    // Create a query to get documents from the "expenses" collection where "type" is "savings"
    const q = query(collection(db, "exoenses"), where("type", "==", "savings"));

    const querySnapshot = await getDocs(q);
    let totalAmount = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.amount) {
        totalAmount += data.amount;
      }
    });

    return new Response(
      JSON.stringify({
        totalAmount,
        message: "Total savings retrieved successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error retrieving total savings from Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve total savings" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
