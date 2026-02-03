import React, { useState } from "react";

function NewsCard({ news }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const formattedDate = news.published_at
    ? new Date(news.published_at).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="news-card">
      <h3>{news.title}</h3>
      <small>{formattedDate}</small>
      <p
        className={`summary ${expanded ? "expanded" : ""}`}
        dangerouslySetInnerHTML={{ __html: expanded ? news.summary : `${news.summary.slice(0, 150)}...` }}
      />
      {news.summary && news.summary.length > 150 && (
        <button className="read-more" onClick={toggleExpanded}>
          {expanded ? "Свернуть" : "Читать полностью"}
        </button>
      )}
    </div>
  );
}

export default NewsCard;