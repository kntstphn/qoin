import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    // Get all documents from the "emergency funds" collection
    const querySnapshot = await getDocs(collection(db, "emergency_funds"));

    let totalAmount = 0;

    // Iterate through each document and add the amount to the total
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.amount) {
        totalAmount += data.amount;
      }
    });

    return new Response(
      JSON.stringify({
        totalAmount,
        message: "Total Emergency Funds retrieved successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error retrieving total emergency funds from Firestore: ",
      error
    );
    return new Response(
      JSON.stringify({ error: "Failed to retrieve total emergency funds" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request) {
  try {
    const { amount, timestamp } = await request.json();

    // Add the value to a Firestore collection
    const docRef = await addDoc(collection(db, "emergency_funds"), {
      amount: Number(amount),
      timestamp: new Date(timestamp),
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Emergency Funds amount added successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding Emergency Funds amount to Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to add emergency funds amount" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
