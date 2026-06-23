import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = "https://shiori-notes-app-backend.onrender.com"

function SignUpCard() {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate();
    async function userRegister() {
        const res = await axios.post(`${BASE_URL}/auth/register`,{
            email : email,
            user_password : password
        })
        alert(res.data)
        if(res.status==200){
            navigate('/');
        }
    }
    return(
        <>
        <div className="main-body">
       <form className="login-center-body" onSubmit={
        (e)=>{
            e.preventDefault();
            userRegister()
        }
       }>
      <h1 className="intro-head">しおり</h1>
      <h3>Register to begin</h3>
      <input 
      type="text" 
      className="login-email-box"
      placeholder="Enter your email"
      onChange={(e)=>setEmail(e.target.value)}
      />
      <input
       type="password" 
       className="login-password-box"
       placeholder="password"
       onChange={(e)=>setPassword(e.target.value)}
       />
       <button onClick={(e)=>{
            e.preventDefault();
            userRegister()
        }}>Register</button>
       <p className="user-old-login"></p>
    </form>
   </div>
        </>
    )
}


export default SignUpCard