import { db } from "@lib/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

const collections = [
  "needs_transaction",
  "wants_transaction",
  "leisure_funds_transaction",
  "savings_transaction",
  "emergency_funds_transaction",
];

export async function GET(request) {
  try {
    // Extract userId and date from query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const dateString = searchParams.get("date"); // Expecting "YYYY-MM-DD"

    if (!userId || !dateString) {
      return new Response(
        JSON.stringify({ error: "userId and date are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert dateString ("YYYY-MM-DD") to Firestore Timestamp range
    const startOfDay = Timestamp.fromDate(new Date(`${dateString}T00:00:00Z`));
    const endOfDay = Timestamp.fromDate(new Date(`${dateString}T23:59:59Z`));

    let totalAmount = 0;
    const allTransactions = [];

    // Loop through each collection and fetch transactions
    for (const collectionName of collections) {
      try {
        const q = query(
          collection(db, collectionName),
          where("userId", "==", userId),
          where("updatedOn", ">=", startOfDay),
          where("updatedOn", "<=", endOfDay)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (data.amount) {
            totalAmount += data.amount;
          }
          allTransactions.push({
            id: doc.id,
            category: collectionName, // Add category field
            ...data,
          });
        });
      } catch (collectionError) {
        console.error(
          `Error retrieving transactions from ${collectionName}:`,
          collectionError
        );
      }
    }

    return new Response(
      JSON.stringify({
        totalAmount,
        transactions: allTransactions,
        message: "Transactions retrieved successfully!",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve transactions" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
