import React, { useState } from "react";
import "./login.scss";

const Login = () => {

  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("test")

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = {username, password}
    console.log(body)
    await fetch('http://localhost:5000/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  };

  return (
    <>
      <form onClick={(e) => {handleLogin(e)}}>
        <div className="login-input">
          <label htmlFor="username">Username</label>
          <input name="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
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
