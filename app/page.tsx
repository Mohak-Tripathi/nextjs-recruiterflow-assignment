// "use client"

// import LandingCard from "@/modules/landing-card";
// export default LandingCard



"use client";

import dynamic from "next/dynamic";

// Dynamically import LandingCard to disable SSR
const LandingCard = dynamic(() => import("../modules/landing-card"),  {ssr: false}); 

const Page = () => {
  return (
    <div>
 
      <LandingCard />
    </div>
  );
};

export default Page;
