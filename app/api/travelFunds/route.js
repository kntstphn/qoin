import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const { amount, timestamp } = await request.json();

    const docRef = await addDoc(collection(db, "travel_funds"), {
      amount: Number(amount),
      timestamp: new Date(timestamp),
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Travel Funds amount added successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding Travel Funds amount to Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to add Travel Funds amount" }),
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
    // Get all documents from the "travel_funds" collection
    const querySnapshot = await getDocs(collection(db, "travel_funds"));

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
        message: "Total travel funds retrieved successfully!",
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
      "Error retrieving total travel funds from Firestore: ",
      error
    );
    return new Response(
      JSON.stringify({ error: "Failed to retrieve total travel funds" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
