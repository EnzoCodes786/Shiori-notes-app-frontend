import "./loginCard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
const BASE_URL = "https://shiori-notes-app-backend.onrender.com";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function userAuthentication() {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      entered_email: email,
      entered_password: password,
    },
    {
    withCredentials: true
    }
  );
    
    alert(res.data);
    
    if (res.status === 200) {
      navigate("/landingPage");
    }
  }

  return (
    <>
      <div className="main-body">
        <form
          className="login-center-body"
          onSubmit={(e) => {
            e.preventDefault();
            userAuthentication();
          }}
        >
          <h1 className="intro-head">しおり</h1>
          <h3>Welcome Back</h3>
          <input
            type="text"
            className="login-email-box"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-password-box"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
          onClick={(e)=>{
            e.preventDefault();
            userAuthentication();
          }}
          >Login</button>
          <Link to="/forgotPassword" className="auth-btn" >Forgot Password</Link>
          <Link to ="/register" className="auth-btn">New User</Link>
        </form>
      </div>
    </>
  );
}

export default LoginCard;
