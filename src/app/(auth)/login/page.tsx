"use client";
import { useState } from "react";
import axios from "axios";
import "../../../styles/auth.css"
export default function Login() {
    const [credentials, setCredentials] = useState({
        eid: "",
        password: ""
    });
    const [error, setError] = useState("");

    async function handleSubmit() {
        try {
            const res = await axios.post("/api/users/login", credentials, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 200) {
                console.log("Logged in");
                alert(res.data.message);
                setError("");
                setCredentials({ eid: "", password: "" });
            } else {
                throw new Error(res.data.message);
            }
        } catch (error: any) {
            console.log(error);
            if (error.response) {
                setError(error.response.data.message);
                alert(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
                alert("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="login">
            <div className="login-form">
                <h1>Login</h1>


                <label htmlFor="eid">Employee Id</label>
                <input
                    type="number"
                    name="eid"
                    placeholder="username"
                    value={credentials.eid}
                    onChange={(e) => setCredentials({ ...credentials, eid: e.target.value })}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                />

                <button
                    onClick={handleSubmit}
                    disabled={!(credentials.eid && credentials.password)}
                    type="submit"
                >
                    Login
                </button>

                {error && <div className="error-message">{error}</div>}

            </div>
        </div>
    );
}
