import { db } from "@lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const { value } = await request.json(); // Extract the value from the request body

    // Add the value to a Firestore collection
    const docRef = await addDoc(collection(db, "wants"), {
      amount: value,
      timestamp: new Date().toISOString(), // Optional: Add a timestamp
    });

    return new Response(
      JSON.stringify({ id: docRef.id, message: "Value added successfully!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding value to Firestore: ", error);
    return new Response(JSON.stringify({ error: "Failed to add value" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
