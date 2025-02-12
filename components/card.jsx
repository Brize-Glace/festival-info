import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function Card() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    async function fetchFestivals() {
      try {
        const response = await fetch("/api/scrape");
        const data = await response.json();
        setFestivals(data.festivals || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des festivals :", error);
      }
    }

    fetchFestivals();
  }, []);

  return (
    <main className="flex justify-center items-center min-h-screen bg-[#0B1320]">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {Array.isArray(festivals) &&
          festivals.slice(0, 3).map((festival, index) => (
            <div
              key={index}
              className="relative w-[300px] h-[400px] bg-white/20 rounded-2xl overflow-hidden group"
            >
              <div className="image-wrapper w-full h-full overflow-hidden transition-all duration-500 group-hover:h-1/2">
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-full object-cover object-center transform scale-110 transition-transform duration-500 group-hover:scale-100"
                />
              </div>
              <div className=" text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h2 className="text-center text-2xl font-bold py-4">{festival.name}</h2>
                <div className="justify-start px-3">
                  <p> <FontAwesomeIcon icon={faLocationDot} width={20}></FontAwesomeIcon> {festival.details[1]}</p>
                  <p> <FontAwesomeIcon icon={faCalendar} width={20}></FontAwesomeIcon> {festival.details[0]}</p>
                </div>
              </div>
              <div className="flex absolute bottom-0 pb-4 px-2">
                <p className="opacity-0 transition-opacity duration-500 group-hover:opacity-100 px-4 py-1 mx-1 text-black bg-white rounded-2xl font-bold text-xs">
                  {festival.othersInfos[0]}
                </p>
                <p className="opacity-0 transition-opacity duration-500 group-hover:opacity-100 px-4 py-1 mx-1 text-black bg-white rounded-2xl font-bold text-xs">
                  {festival.othersInfos[1]}
                </p>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
}