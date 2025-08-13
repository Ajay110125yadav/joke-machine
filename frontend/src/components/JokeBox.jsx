import React, { useState } from "react";
import axios from "axios";

const JokeBox = () => {
  const [joke, setJoke] = useState("Click the button to get a joke!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/joke`);
      const data = response.data;
      setJoke(`${data.setup} ${data.punchline}`);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch joke. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>😂 Joke Machine</h2>
      <p style={{ minHeight: "50px", fontSize: "18px" }}>
        {loading ? "Loading..." : error ? error : joke}
      </p>
      <button onClick={fetchJoke} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Get Joke
      </button>
    </div>
  );
};

export default JokeBox;
