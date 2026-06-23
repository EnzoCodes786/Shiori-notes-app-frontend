import "./verifyOtp.css";
import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://shiori-notes-app-backend.onrender.com";

function VerifyOtp() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    async function verifyOtp() {

        try {

            const res = await axios.post(
                `${BASE_URL}/auth/verifyOtp`,
                {
                    email,
                    otp_user: otp
                }
            );

            alert(res.data.message);

        } catch (err) {

            console.log(err);
            alert("Invalid OTP");

        }
    }

    return (
        <div className="otp-page">

            <div className="otp-card">

                <h1 className="otp-japanese">しおり</h1>

                <h2>Verify OTP</h2>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter OTP"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button onClick={verifyOtp}>
                    Verify OTP
                </button>

            </div>

        </div>
    );
}

export default VerifyOtp;