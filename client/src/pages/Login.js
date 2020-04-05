import React, { useState } from "react";
import "./login.scss";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = {email, password}
    await fetch('http://localhost:5000/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  };

  return (
    <>
      <form onSubmit={(e) => {handleLogin(e)}}>
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div className="btn-container">
          <button>Login</button>
          <p>No login? signup here</p>
        </div>
      </form>
    </>
  );
};

export default Login;
