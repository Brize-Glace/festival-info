import React from "react";
import { useEffect, useState } from "react";

export default function navbar() {
  return (
    <nav className="flex justify-between items-center pt-6">
          <h2 id="logo" className="font-bold text-xl pl-16">Festival Info</h2>
          <ul>
            <li><a href="#InsomniacEvents" className="pr-16">Insomniac Events</a></li>
          </ul>
    </nav>
  )
}