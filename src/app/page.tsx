"use client";
import React, { useState } from "react";
import axios from "axios";
import Header from "./components/header";
import Modal from "./components/Modal";
import "../styles/landing.css";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleClick = (action: any) => {
    setModalTitle(action);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (eid: string) => {
    setUserId(eid);
    console.log(`User ID submitted: ${eid}`);
    setIsLoading(true); // Start loading

    try {
      const res = await axios.post("/api/clock", { userId: eid, modalTitle }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.status === 200) {
        setMessage(res.data.message);
        alert("Clocked Time Successfully");
      } else {
        setMessage(`Error: ${res.data.message}`);
        alert(`Error: ${res.data.message}`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data?.message || "Something went wrong"}`);
      alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
    } finally {
      setIsLoading(false); // Stop loading
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <div className="landing">
        <div className="hero">
          <h1>Welcome to WorkPulse</h1>
          <p>Your reliable Employee Tracking System</p>
        </div>
        <div className="container">
          <h2>Track your working hours with ease</h2>
          <p>Use the buttons below to CheckIN or CheckOUT.</p>
          <button onClick={() => handleClick("CheckIN")} disabled={isLoading}>CheckIN</button>
          <button onClick={() => handleClick("CheckOUT")} disabled={isLoading}>CheckOUT</button>
          {isLoading && <p>Processing...</p>}  
          {message && <p>{message}</p>}
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} />
      </div>
    </div>
  );
}

