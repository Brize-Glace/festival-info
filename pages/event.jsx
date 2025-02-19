import { useRouter } from "next/router";
import Card_insomniac_full from "@/components/cards_insomniac_full";
import Card_tomorrowland_full from "@/components/cards_tomorrowland_full";
import Navbar from "@/components/navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { userAgent } from "next/server";

export default function Event() {
    const router = useRouter();
    const { organizer } = router.query;

    const getHeaderTitle = () => {
        switch (organizer) {
            case "insomniac":
                return "Insomniac Events";
            case "tomorrowland":
                return "Tomorrowland Events";
            default:
                return "Festival Info";
        }
    }
    const renderCardComponent = () => {
      switch (organizer) {
          case "insomniac":
              return <Card_insomniac_full />;
          case "tomorrowland":
              return <Card_tomorrowland_full />;
          default:
              return null;
      }
    }
  return (
    <>

    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Poppins:wght@400;500;700;800&display=swap" rel="stylesheet"></link>

  </Head>
    <main>
      <header className="h-[100vh] flex flex-col justify-center">
        <Navbar />
        <h1 className="font-bold text-7xl m-auto text-center max-w-[850px]">{getHeaderTitle()}</h1>
        <p className="text-center mb-7"><a href="#InsomniacEvents" id="cta" className="px-[19px] py-[13px] bg-[#E8EAEC] text-[#0B1320] rounded-md hover:bg-transparent hover:text-[#E8EAEC] hover:border hover:border-[#E8EAEC] transition">Explore</a></p>
      </header>
      <section id="InsomniacEvents" className="h-[100vh]">
        <h2 className="text-center pt-8" style={{fontSize: '3rem'}}>{getHeaderTitle}</h2>
        {renderCardComponent()}
      </section>
    </main>
    </>
  );
}