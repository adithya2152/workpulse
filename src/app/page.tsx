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

  const handleClick = (action: any) => {
    setModalTitle(action);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (eid:string) => {
    setUserId(eid);
    console.log(`User ID submitted: ${eid}`);

    const res = await axios.post("/api/clock", {
      eid,
      action: modalTitle,
    });

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
          <button onClick={() => handleClick("CheckIN")}>CheckIN</button>
          <button onClick={() => handleClick("CheckOUT")}>CheckOUT</button>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} />
      </div>
    </div>
  );
}
