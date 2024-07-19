"use client"
import React, { useState } from "react";
import Link from "next/link";
export default function Home() {
  const [userId, setUserId] = useState("");

  const handleClick = () => {
    const userId = prompt("Please enter your user ID:");
    if (userId !== null) {
      setUserId(userId);
    }
  };

  return ( 
    <div>
        <h1>WorkPulse</h1>

        <Link href="/login">Login</Link>

        <Link href="/register">Register</Link>

        <button onClick={handleClick}>Check IN </button>

        <button onClick={handleClick}>Check OUT</button>
    </div>
  );
}

