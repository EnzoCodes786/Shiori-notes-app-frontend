import "./forgotPassword.css";
import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://shiori-notes-app-backend.onrender.com";

function ForgotPasswordCard() {

    const [email, setEmail] = useState("");

    async function sendOtp() {
        try {
            const res = await axios.post(
                `${BASE_URL}/auth/forgotPassword`,
                { email }
            );

            alert(res.data.message);
        }
        catch(err){
            console.log(err);
            alert("Failed to send OTP");
        }
    }

    return (
        <div className="forgot-page">

            <div className="forgot-card">

                <h1 className="japanese-title">しおり</h1>

                <h2>Forgot Password</h2>

                <p className="forgot-subtitle">
                    Enter your registered email to receive an OTP.
                </p>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <button onClick={sendOtp}>
                    Send OTP
                </button>

            </div>

        </div>
    );
}

export default ForgotPasswordCard;

