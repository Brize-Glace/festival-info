import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function Card_full() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    async function fetchFestivals() {
      try {
        const response = await fetch("/api/scrape_insomniac");
        const data = await response.json();
        setFestivals(data.festivals || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des festivals :", error);
      }
    }

    fetchFestivals();
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Poppins:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main className="flex justify-center items-center min-h-screen bg-[#0B1320]">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {festivals.map((festival, index) => (
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
              <div className="text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h2 className="text-center text-2xl font-bold py-4">
                  {festival.name}
                </h2>
                <div className="justify-start px-3">
                  <p>
                    {" "}
                    <FontAwesomeIcon icon={faLocationDot} width={20} />{" "}
                    {festival.details[1]}
                  </p>
                  <p>
                    {" "}
                    <FontAwesomeIcon icon={faCalendar} width={20} />{" "}
                    {festival.details[0]}
                  </p>
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
          <div className="col-span-full flex justify-center">
            <a id="cta"
              href="/event"
              className="mt-4 px-4 py-2 bg-white/20 text-white font-bold rounded hover:bg-white/10 transition-colors"
            >
              See More
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
