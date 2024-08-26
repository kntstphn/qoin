import { db } from "@lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const { amount, remarks, timestamp, type } = await request.json();

    // Validate input
    if (
      typeof amount !== "number" ||
      typeof remarks !== "string" ||
      typeof timestamp !== "string" ||
      typeof type !== "string"
    ) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Add the document to the "expenses" collection
    const docRef = await addDoc(collection(db, "expenses"), {
      amount,
      remarks,
      timestamp: new Date(timestamp),
      type,
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Expense added successfully!",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding expense to Firestore: ", error);
    return new Response(JSON.stringify({ error: "Failed to add expense" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
