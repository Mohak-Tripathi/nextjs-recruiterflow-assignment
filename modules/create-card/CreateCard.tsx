// import React from 'react'

// const CreateCard = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default CreateCard

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "../common/NavigationBar";

const CreateCard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/card/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Reset form on success
      setTitle("");
      setDescription("");
      setSuccess(true);
      router.push("/"); // Navigate back to the main page after updating
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Create a New Card
          </h2>

          {success && (
            <div className="text-green-500 text-center">
              Card created successfully!
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
            {loading ? "Creating..." : "Create Card"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCard;
