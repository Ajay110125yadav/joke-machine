import React, { useState } from "react";

const JokeBox = () => {
  const [joke, setJoke] = useState("Click the button to get a joke!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/jokes");
      if (!res.ok) throw new Error("Failed to fetch jokes");
      const jokes = await res.json();

      // Random joke select karo
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setJoke(jokes[randomIndex].text);
    } catch (err) {
      setError(err.message);
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
