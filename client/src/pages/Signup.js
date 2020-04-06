import React, { useState } from "react";
import "./signup.scss";

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSignup = async (e) => {
    e.preventDefault();
    const body = {email, password}
    await fetch('http://localhost:5000/api/auth/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  };

  return (
    <>
      <form onSubmit={(e) => {handleSignup(e)}}>
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div className="btn-container">
          <button>Signup</button>
        </div>
      </form>
    </>
  );
};

export default Signup;
