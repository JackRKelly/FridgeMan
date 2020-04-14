import React from "react";
import "./dashboard.scss";

const Dashboard = ({ email, username }) => {
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
        <h3>{username}'s</h3>
        <h1>Dashboard</h1>
        <div className="button-container">
          <button onClick={logOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
