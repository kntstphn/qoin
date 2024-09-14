import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const { amount, timestamp } = await request.json();

    const docRef = await addDoc(collection(db, "savings"), {
      amount: Number(amount),
      timestamp: new Date(timestamp),
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Savings Amount added successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding savings amount to Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to add savings amount" }),
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
    // Get all documents from the "savings" collection
    const querySnapshot = await getDocs(collection(db, "savings"));

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
