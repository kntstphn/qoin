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

// GET ALL emergency_funds amount
export async function GET(request) {
  try {
    // Extract userId from query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Create a query to get documents where userId matches
    const q = query(
      collection(db, "emergency_funds"),
      where("userId", "==", userId)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    let totalAmount = 0;
    const documents = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.amount) {
        totalAmount += data.amount;
      }
      documents.push({ id: doc.id, ...data });
    });

    return new Response(
      JSON.stringify({
        totalAmount,
        documents,
        message: "Total emergency_funds expenses retrieved successfully!",
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
      "Error retrieving total emergency_funds expenses from Firestore: ",
      error
    );
    return new Response(
      JSON.stringify({ error: "Failed to retrieve total emergency_funds" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// CREATE A NEW WANT
export async function POST(request) {
  try {
    const { amount, updatedOn, wallet, userId } = await request.json();

    const docRef = await addDoc(collection(db, "emergency_funds"), {
      amount: Number(amount),
      userId: userId,
      updatedOn: new Date(updatedOn),
      wallet: wallet,
    });

    return new Response(
      JSON.stringify({
        id: docRef.id,
        message: "emergency_funds added successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding emergency_funds to Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to add emergency_funds amount" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function PUT(request) {
  try {
    // Extract data from the request body
    const { amount, updatedOn, wallet, userId } = await request.json();

    // Create a query to find the document(s) with the matching userId and wallet
    const q = query(
      collection(db, "emergency_funds"),
      where("userId", "==", userId),
      where("wallet", "==", wallet)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if any documents match the query
    if (querySnapshot.empty) {
      return new Response(
        JSON.stringify({ error: "No matching document found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Update each matching document
    const updates = [];
    querySnapshot.forEach((doc) => {
      updates.push(
        updateDoc(doc.ref, {
          amount: Number(amount),
          UpdatedOn: new Date(updatedOn),
        })
      );
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    return new Response(
      JSON.stringify({
        message: "emergency_funds updated successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error updating emergency_funds in Firestore: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to update emergency_funds amount" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
