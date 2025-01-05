import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    // Get all documents from the "needs" collection
    const querySnapshot = await getDocs(collection(db, "credit"));

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
        message: "Total credit retrieved successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error retrieving total debt from Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve total debt" }),
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
    const { amount, name, remarks, timestamp } = await request.json();

    // Add the value to a Firestore collection
    const docRef = await addDoc(collection(db, "debt"), {
      amount: Number(amount),
      name: name,
      remarks: remarks,
      timestamp: new Date(timestamp),
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Debt Amount added successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding debt amount to Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to add debt amount" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
