import { db } from "@lib/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

export const dynamic = "force-dynamic";

// GET ALL WANT TRANSACTIONS
export async function GET(request) {
  try {
    // Extract userId from query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Query Firestore for documents where userId matches
    const q = query(
      collection(db, "wants_transaction"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    // Extract document data
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify({ documents }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error retrieving documents from Firestore:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// CREATE A NEW WANT TRANSACTION
export async function POST(request) {
  try {
    const { amount, updatedOn, wallet, userId, remarks } = await request.json();

    if (!userId || !amount || !wallet || !updatedOn || !remarks) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Add the transaction to the "wants_transaction" collection
    const docRef = await addDoc(collection(db, "wants_transaction"), {
      amount: Number(amount),
      userId,
      updatedOn: new Date(updatedOn),
      wallet,
      remarks,
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "Transaction added successfully!",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding transaction to Firestore:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add transaction" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
