import { db } from "@lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "holdings"));

    // Map through the documents and return an array with { documentId, name }
    const documents = querySnapshot.docs.map((doc) => ({
      documentId: doc.id,
      name: doc.data().name,
    }));

    return new Response(
      JSON.stringify(documents), // Return the documents as a JSON response
      {
        status: 200,
        headers: {
          "Content-Type": "application/json", // Set the response content type to JSON
        },
      }
    );
  } catch (error) {
    console.error("Error fetching documents:", error);

    return new Response(
      JSON.stringify({
        message: "Error fetching documents",
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
