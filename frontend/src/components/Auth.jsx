import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/register";
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };
      const res = await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.message || "Something went wrong");
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/favorites");
    } catch (err) { setError(err.message); }
  };

  return (
    <div style={{maxWidth:400, margin:"32px auto", padding:24, border:"1px solid #eee", borderRadius:16}}>
      <h2 style={{marginTop:0}}>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} style={{display:"grid", gap:10}}>
        {!isLogin && (
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        )}
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      {error && <div style={{color:"crimson", marginTop:8}}>{error}</div>}
      <p style={{color:"#2962ff", cursor:"pointer", marginTop:10}}
         onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
}
