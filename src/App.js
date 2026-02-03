import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import "./styles.css";

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(50);

        if (error) throw error;
        setNews(data);
      } catch (err) {
        console.error("Ошибка при загрузке новостей:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="app">
      <h1>📰 Лента новостей</h1>
      {loading ? (
        <p className="loading">Загрузка новостей...</p>
      ) : (
        <div className="news-list">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;