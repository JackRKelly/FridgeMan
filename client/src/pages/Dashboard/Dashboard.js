import React from "react";
import "./dashboard.scss";

const Dashboard = ({ email }) => {
  document.title = "FridgeMan - Dashboard";

  const logOut = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    });
  };

  return (
    <div className="dashboard page">
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p className="email">{email}</p>
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Dashboard;
