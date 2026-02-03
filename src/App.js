import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import NewsCard from "./NewsCard";
import "./styles.css";

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Категории, которые будем показывать сверху
const categories = [
  { id: "war", name: "Военные" },
  { id: "economy", name: "Экономика" },
  { id: "crypto", name: "Крипта" },
  { id: "society", name: "Общество" },
];

export default function App() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("war");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("category_id", selectedCategory) // фильтр по категории
        .order("published_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Ошибка при получении новостей:", error);
      } else {
        setNews(data);
      }
      setLoading(false);
    }

    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="app-container">
      <h1>📰 Новости российских СМИ</h1>

      {/* Категории */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Загрузка новостей...</div>
      ) : (
        <div className="news-list">
          {news.length > 0 ? (
            news.map((item) => <NewsCard key={item.id} news={item} />)
          ) : (
            <div className="no-news">Новости не найдены</div>
          )}
        </div>
      )}
    </div>
  );
}