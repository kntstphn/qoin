import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export async function GET(request) {
  try {
    // Extract the 'type' parameter from the query string
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "needs"; // Default to "needs" if no type is provided

    // Create a query to fetch documents where 'type' matches
    const q = query(collection(db, "funds"), where("type", "==", type));
    const querySnapshot = await getDocs(q);

    // Map through the documents and collect relevant data (documentId, wallet, timestamp, amount)
    const documents = querySnapshot.docs.map((doc) => ({
      documentId: doc.id,
      wallet: doc.data().wallet,
      timestamp: doc.data().timestamp,
      amount: doc.data().amount,
    }));

    // Calculate the total amount
    const totalAmount = documents.reduce((acc, doc) => acc + doc.amount, 0);

    // Return the response with the documents and total amount
    return new Response(
      JSON.stringify({
        totalAmount,
        documents,
        message: "Funds retrieved successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching funds:", error);

    return new Response(
      JSON.stringify({
        message: "Error fetching funds",
      }),
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
    // Parse the request body
    const { type, wallet, timestamp, amount } = await request.json();

    // Validate the required fields
    if (!type || !wallet || !timestamp || typeof amount !== "number") {
      return new Response(
        JSON.stringify({
          message:
            "Invalid input: 'type', 'wallet', 'timestamp', and 'amount' are required.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Add a new document to the 'funds' collection
    const docRef = await addDoc(collection(db, "funds"), {
      type,
      wallet,
      timestamp,
      amount,
    });

    // Return the response with the document ID
    return new Response(
      JSON.stringify({
        message: "Document added successfully!",
        documentId: docRef.id,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding document:", error);

    return new Response(
      JSON.stringify({
        message: "Error adding document.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
