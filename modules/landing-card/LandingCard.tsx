"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import CommonCard from "../common/Commoncard";
import Link from "next/link";

// Define the type for a card
interface Card {
  id: string;
  title: string;
  description: string;
}


const LandingCard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]); // State to store fetched data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  const [error, setError] = useState<string | null>(null); // State to track errors


    const fetchCards = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cards`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: any = await response.json(); // Ensure the fetched data matches the Card[] type
       console.log(data, "data")
        setCards(data?.cards); // Update state with fetched data
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Unknown error occurred");
        setLoading(false);
      }
    };





  useEffect(() => {
    fetchCards(); // Fetch cards when the component mounts
  }, []);



  // Delete handler with re-fetching
  const handleDelete = async (cardId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/card/${cardId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the card.");
      }
      // Re-fetch cards after a successful deletion
      await fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message

  return (
  //   <div className="w-full flex justify-center items-center">
  //   <div className="grid grid-cols-3 gap-4 justify-center items-center w-[80%]">
  //   {Array.isArray(cards) ? ( // Ensure cards is an array
  //     cards.map((card) => (
  //       <CommonCard key={card.id} cardId={card.id} title={card.title} description={card.description} 
  //       onDelete={handleDelete}  />
  //     ))
  //   ) : (
  //     <div>Error: Cards data is not an array.</div>
  //   )}
  // </div>
  // </div>


<div className="w-full flex justify-center items-center">
      <div className="grid grid-cols-3 gap-4 justify-center items-center w-[80%]">
        {Array.isArray(cards) ? (
          // Ensure cards is an array
          <>
            {cards.map((card) => (
              <CommonCard
                key={card.id}
                cardId={card.id}
                title={card.title}
                description={card.description}
                onDelete={handleDelete}
              />
            ))}
            {/* Add "Create New Card" button */}
            <Link
              href="/new-card"
              className="flex justify-center items-center border-2 border-dashed border-gray-500 rounded-lg p-8"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700">+ Add New Card</h3>
                <p className="text-sm text-gray-500">Click here to add a new card.</p>
              </div>
            </Link>
          </>
        ) : (
          <div>Error: Cards data is not an array.</div>
        )}
      </div>
    </div>
  );
};

export default LandingCard;

// import React from 'react'

// const LandingCard = () => {
//   return (
//     <div>
//       djsdks
//     </div>
//   )
// }

// export default LandingCard

