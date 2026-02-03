import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import NewsCard from "./NewsCard";
import "./styles.css";

// ✅ Подставляем Supabase данные
const SUPABASE_URL = "https://rltppxkgyasyfkftintn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsdHBweGtneWFzeWZrZnRpbnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTM0NDAsImV4cCI6MjA4NTYyOTQ0MH0.98RP1Ci9UFkjhKbi1woyW5dbRbXJ8qNdopM1aJMSdf4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Категории новостей
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
        .eq("category_id", selectedCategory) // фильтруем по категории
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