import "./styles.css";

export default function NewsCard({ news }) {
  const date = new Date(news.published_at).toLocaleString();

  return (
    <div className="news-card">
      <h2>{news.title}</h2>
      {news.media_url && <img src={news.media_url} alt="" className="news-image" />}
      <p className="news-summary">{news.summary}</p>
      <small className="news-date">{date}</small>
    </div>
  );
}