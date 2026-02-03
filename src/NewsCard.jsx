import React, { useState } from "react";
import "./styles.css";

export default function NewCard({ title, text, published_at, media_url }) {
  const [expanded, setExpanded] = useState(false);

  // Ограничение текста до 300 символов, если не развернут
  const previewText = text
    ? text.replace(/<[^>]+>/g, "") // удаляем HTML теги для preview
    : "";

  const shouldTruncate = previewText.length > 300;
  const displayText = expanded || !shouldTruncate ? text : previewText + "...";

  return (
    <div className="news-card">
      <h3>{title}</h3>
      {media_url && <img src={media_url} alt={title} className="news-img" />}
      <div
        className="news-text"
        dangerouslySetInnerHTML={{ __html: displayText }}
      />
      {shouldTruncate && (
        <button
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Свернуть" : "Читать полностью"}
        </button>
      )}
      {published_at && (
        <small>{new Date(published_at).toLocaleString()}</small>
      )}
    </div>
  );
}