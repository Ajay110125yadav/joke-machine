import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    nav("/auth");
  };

  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"12px 16px", borderBottom:"1px solid #eee", position:"sticky", top:0, background:"#fff"
    }}>
      <Link to="/" style={{textDecoration:"none"}}><h3>😂 Joke Machine</h3></Link>
      <div style={{display:"flex", gap:12}}>
        <Link to="/" style={{textDecoration:"none"}}>Home</Link>
        <Link to="/favorites" style={{textDecoration:"none"}}>Favorites</Link>
        {!isLoggedIn ? (
          <Link to="/auth" style={{textDecoration:"none"}}>Login</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  );
}
