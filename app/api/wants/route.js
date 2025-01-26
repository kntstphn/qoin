import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const { amount, timestamp, wallet, remarks } = await request.json();

    const docRef = await addDoc(collection(db, "wants"), {
      amount: Number(amount),
      timestamp: new Date(timestamp),
      wallet: wallet,
      remarks: remarks,
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Wants Expenses added successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding wants expenses to Firestore: ", error);
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
        message: "Total wants expenses retrieved successfully!",
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
      "Error retrieving total wants expenses from Firestore: ",
      error
    );
    return new Response(
      JSON.stringify({ error: "Failed to retrieve total wants" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
