"use client";
import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import NavigationBar from "../common/NavigationBar";

const EditCard = () => {
  const router = useRouter();
  const params = useParams();
  const { cardId } = params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    // Fetch card details to pre-populate the form
    const fetchCardDetails = async () => {
      if (!cardId) return; // Avoid fetching if cardId isn't available
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/card/${cardId}`
        );
        const { title, description } = response.data.card; // Assuming the API response has title and description
       console.log(response.data, title, description, "hskjdks");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/card/${cardId}`, {
        title,
        description,
      });
      setSuccess(true);
      router.push("/"); // Navigate back to the main page after updating
    } catch (err) {
      alert("Failed to update the card. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <NavigationBar />
      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Edit Card</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium"
              >
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
      </div> */}


      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Update Card
          </h2>

          {success && (
            <div className="text-green-500 text-center">
              Card updated successfully!
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center">Error: {error}</div>
          )}

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter card description"
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Card"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCard;
