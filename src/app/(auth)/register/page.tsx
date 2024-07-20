"use client"
import axios from "axios"
import React, { useState } from "react"
import bcrypt from "bcryptjs"
import "../../../styles/auth.css"

export default function Register() {
    const [credentials, setCredentials] = useState({
        username: "",
        email: ""
    })
    const [isVerified, setIsVerified] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [genOtp, setGenOtp] = useState("")

    async function otpGen() {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = 10;
        const hash = bcrypt.hashSync(otp, salt);

        setGenOtp(hash)
        return { otp, hash }
    }

    const handleVerify = async () => {
        const { otp, hash } = await otpGen()

        const email = credentials.email

        try {
            const res = await axios.post("/api/sendmail", {
                email: email,
                otp: otp
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.status === 200) {
                setIsSent(true)
                alert("Email sent successfully")
                console.log("Email sent successfully")
            }

        } catch (err) {
            console.log(err)
            alert("Failed to send email")
        }
    }

    async function handleConfirm() {
        const match = await bcrypt.compare(otp, genOtp);
        if (match) {
            alert("Otp verified")
            setIsVerified(true)
        } else {
            alert("Otp Denied, try again");
            setCredentials({ ...credentials, email: "", username: "" })
            setIsSent(false)
            setOtp("")
            setGenOtp("")
        }
    }

    async function handleRegister() {
        try {
            const res = await axios.post("/api/users/register", credentials,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            if (res.status === 200) {
                console.log("Registered");
                alert("Registered");
                setIsVerified(false)
                setIsSent(false)
                setCredentials({ ...credentials, email: "", username: "" })
                setOtp("")
                setGenOtp("")

            } else if (res.status === 409) {
                alert("User already registered");
                console.log("User already registered");
                setIsVerified(false)
                setIsSent(false)
                setCredentials({ ...credentials, email: "", username: "" })
                setOtp("")
                setGenOtp("")

            } else {
                throw new Error(res.data.message);
            }

        }
        catch (error: any) {
            if (error.response && error.response.status === 409) {
                alert("User already registered");
            } else {
                console.log(error);
                alert("Error: " + error.message);
                setIsSent(false)
                setIsVerified(false)
                setCredentials({ ...credentials, email: "", username: "" })
                setOtp("")
                setGenOtp("")
            }
        }
    }

    const isRegisterDisabled = !(credentials.username && credentials.email && otp);

    return (
        <div className="register">
            <div className="form-register">
                <h1>Register</h1>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    value={credentials.username}
                    required
                />

                <label htmlFor="email">Email</label>

                <div className="verify">
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        value={credentials.email}
                        required
                    />

                    <button
                        onClick={handleVerify}
                        disabled={!credentials.email}  
                    >
                        {!isSent ? "Verify Email" : "Resend code"}
                    </button>

                </div>
               

                {isSent &&
                    <div >
                        <label htmlFor="otp">Otp</label>
                        <div className="otp">
                            <input
                                type="text"
                                name="otp"
                                placeholder="otp"
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                                required
                            />
                            <button
                                onClick={handleConfirm}
                                disabled={!otp}  
                            >
                                Confirm
                            </button>
                        </div>
                        
                    </div>
                }

                {isVerified &&
                    <div>
                        <button
                            onClick={handleRegister}
                            disabled={isRegisterDisabled}   
                        >
                            Register
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
