import React from "react";
import "./styles.css";

export default function NewCard({ title, text, published_at }) {
  return (
    <div className="news-card">
      <h3>{title}</h3>
      <p>{text}</p>
      {published_at && (
        <small>{new Date(published_at).toLocaleString()}</small>
      )}
    </div>
  );
}