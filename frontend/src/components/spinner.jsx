import React from "react";

export default function Spinner() {
  return (
    <div style={{
      width:28, height:28, border:"3px solid #ddd",
      borderTop:"3px solid #555", borderRadius:"50%",
      animation:"spin 1s linear infinite", margin:"8px auto"
    }}>
      <style>{`@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
