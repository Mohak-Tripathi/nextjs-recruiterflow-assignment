// import React from 'react'

// const EditCard = () => {
//   return (
//     <div>
//       sjdkskds
//     </div>
//   )
// }

// export default EditCard


"use client"
import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const EditCard = () => {
  const router = useRouter();
  const params = useParams();
//   console.log(params, params.cardId,  "dfkdjkfdkfdkf")
//   const { cardId } = router.query; // Extract cardId from URL params
const {cardId} = params

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    // Fetch card details to pre-populate the form
    const fetchCardDetails = async () => {
      if (!cardId) return; // Avoid fetching if cardId isn't available
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/card/${cardId}`
        );
        const { title, description } = response.data; // Assuming the API response has title and description
        setTitle(title);
        setDescription(description);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch card details.");
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [cardId]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/v1/card/${cardId}`, {
        title,
        description,
      });
      alert("Card updated successfully!");
      router.push("/"); // Navigate back to the main page after updating
    } catch (err) {
      alert("Failed to update the card. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Card</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCard;

