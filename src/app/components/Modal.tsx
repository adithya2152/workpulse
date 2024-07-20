"use client";
import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eid: string) => void;
}

export default function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [eid, setEid] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h1>Enter Eid</h1>
        <label htmlFor="eid">Eid</label>
        <input
          type="text"
          name="eid"
          placeholder="Enter Eid"
          onChange={(e) => setEid(e.target.value)}
          value={eid}
          required
        />
        <div className="button-group">
          <button
            type="submit"
            onClick={() => {
              onSubmit(eid);  
              setEid("");
              onClose();
            }}
            className="submit-btn"
          >
            Submit
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        .modal h1 {
          margin-top: 0;
          font-size: 1.5rem;
          color: #333;
        }
        .modal label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }
        .modal input {
          width: calc(100% - 20px);
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }
        .button-group {
          display: flex;
          justify-content: space-between;
        }
        .submit-btn {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }
        .submit-btn:hover {
          background-color: #45a049;
        }
        .cancel-btn {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }
        .cancel-btn:hover {
          background-color: #e53935;
        }
      `}</style>
    </div>
  );
}
