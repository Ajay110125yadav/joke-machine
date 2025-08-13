import React, { useEffect, useState } from "react";
import api from "../api";

export default function Favorites() {
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      // backend Phase-1: GET /favorites  -> { favorites: [string] }
      const res = await api.get("/favorites");
      setFavs(res.data.favorites || []);
    } catch (e) {
      setMsg("Failed to load favorites. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (text) => {
    try {
      // simple remove: re-save list without that item (we’ll add id-based delete later if you like)
      const filtered = favs.filter(f => f !== text);
      // optional backend route for delete-by-text (add if you created): POST /favorites/remove { joke }
      await api.post("/favorites/remove", { joke: text }).catch(()=>{});
      setFavs(filtered);
    } catch (e) {
      setMsg("Could not delete.");
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div style={{maxWidth:600,margin:"24px auto"}}>Loading…</div>;

  return (
    <div style={{maxWidth:700, margin:"24px auto", padding:8}}>
      <h2>Your Favorites</h2>
      {msg && <div style={{marginBottom:8}}>{msg}</div>}
      {favs.length === 0 ? (
        <p>No favorites yet. Go add some! 😄</p>
      ) : (
        <div style={{display:"grid", gridTemplateColumns:"1fr", gap:12}}>
          {favs.map((t, idx) => (
            <div key={idx} style={{border:"1px solid #eee", borderRadius:12, padding:12, display:"flex", justifyContent:"space-between", gap:8}}>
              <div style={{whiteSpace:"pre-wrap"}}>{t}</div>
              <button onClick={()=>remove(t)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
