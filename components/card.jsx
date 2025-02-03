import React from "react";
import { useEffect, useState } from "react";

export default function Card() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    async function fetchFestivals() {
      try {
        const response = await fetch("/api/scrape");
        const data = await response.json();
        setFestivals(data.festivals || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des dates :", error);
      }
    }

    fetchFestivals();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Festival Dates</h1>
      <section>
        <div
          id="cards"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"
        >
          {Array.isArray(festivals) &&
            festivals.map((festival, index) => (
              <div key={index} className="bg-[#394D5F] shadow-lg rounded-2xl p-4">
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-[#0B1320]">
                    {festival.othersInfos[0]}
                  </span>
                  <span className="text-lg font-semibold">
                    {festival.othersInfos[1]}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2">{festival.name}</h2>
                <ul className="text-[#d5cfcf]">
                  {festival.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
