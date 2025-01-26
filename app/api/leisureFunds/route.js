import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const { amount, timestamp, remarks, wallet } = await request.json();

    const docRef = await addDoc(collection(db, "fun_funds"), {
      wallet: wallet,
      remarks: remarks,
      amount: Number(amount),
      timestamp: new Date(timestamp),
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Fun Funds expenses added successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding Fun Funds expensess to Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to add Travel Funds expenses" }),
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
    // Get all documents from the "fun_funds" collection
    const querySnapshot = await getDocs(collection(db, "fun_funds"));

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
        message: "Total fun funds retrieved successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error retrieving fun funds from Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve fun funds" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
