import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const { value } = await request.json(); // Extract the value from the request body

    // Add the value to a Firestore collection
    const docRef = await addDoc(collection(db, "wants"), {
      amount: value,
      timestamp: new Date().toISOString(), // Optional: Add a timestamp
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Wants Amount added successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding wants amount to Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to add wants amount" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET() {
  try {
    // Get all documents from the "wants" collection
    const querySnapshot = await getDocs(collection(db, "wants"));

    // Initialize a variable to store the total amount
    let totalAmount = 0;

    // Iterate through each document and add the amount to the total
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Document data:", data); // Log document data for debugging
      if (data.amount) {
        totalAmount += data.amount;
        console.log("Current totalAmount:", totalAmount); // Log current total amount
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
