import { db } from "@lib/firebase/config";
import { collection, getDocs, query, addDoc, where } from "firebase/firestore";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({ message: "Missing userId parameter" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const holdingsRef = collection(db, "holdings");
    const q = query(holdingsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const documents = querySnapshot.docs.map((doc) => ({
      documentId: doc.id,
      name: doc.data().name,
    }));

    return new Response(JSON.stringify(documents), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching documents" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, name } = body;

    if (!userId || !name) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const holdingsRef = collection(db, "holdings");
    const docRef = await addDoc(holdingsRef, { userId, name });

    return new Response(
      JSON.stringify({ message: "Document added", documentId: docRef.id }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding document:", error);
    return new Response(JSON.stringify({ message: "Error adding document" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
