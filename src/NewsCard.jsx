import React, { useState } from "react";

export default function NewCard({ title, text, media_url, published_at }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="new-card">
      {media_url && <img src={media_url} alt={title} className="news-img" />}
      <h3>{title}</h3>
      <p>{expanded ? text : text.slice(0, 200) + (text.length > 200 ? "..." : "")}</p>
      {text.length > 200 && (
        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Свернуть" : "Развернуть"}
        </button>
      )}
      <small>{new Date(published_at).toLocaleString()}</small>
    </div>
  );
}