import React from 'react'
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
          <div id="cards">
            <div className="card">
                {Array.isArray(festivals) && festivals.map((festival, index) => (
                    <div key={index} id="card__content">
                    <img src={festival.image} alt={festival.name} className='w-xs' id="card__img" />
                    <h2 id="card__title">{festival.name}</h2>
                    <ul id="card__detail">
                      {festival.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    );
}