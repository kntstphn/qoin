import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    // Get all documents from the "needs" collection
    const querySnapshot = await getDocs(collection(db, "needs"));

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
        message: "Total needs expenses retrieved successfully!",
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
      "Error retrieving total needs expenses from Firestore: ",
      error
    );
    return new Response(
      JSON.stringify({ error: "Failed to retrieve total needs" }),
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
    const { amount, timestamp, remarks, wallet } = await request.json();

    // Add the value to a Firestore collection
    const docRef = await addDoc(collection(db, "needs"), {
      amount: Number(amount),
      timestamp: new Date(timestamp),
      remarks: remarks,
      wallet: wallet,
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Needs Expenses successfully added!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding needs expenses to Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to add needs amount" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
