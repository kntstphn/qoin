import { db } from "@lib/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    // Create a query to get documents from the "expenses" collection where "type" is "needs"
    const q = query(collection(db, "expenses"), where("type", "==", "needs"));

    // Get the documents matching the query
    const querySnapshot = await getDocs(q);

    // Initialize a variable to store the total amount
    let totalAmount = 0;

    // Iterate through each document and add the amount to the total
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Document data:", data); // Log document data for debugging
      if (data.amount) {
        totalAmount += data.amount;
        console.log("Current totalAmount expenses:", totalAmount); // Log current total amount
      }
    });

    console.log("Final totalAmount:", totalAmount); // Log final total amount

    return new Response(
      JSON.stringify({
        totalAmount,
        message: "Total amount retrieved successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error retrieving total amount from Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve total amount" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
