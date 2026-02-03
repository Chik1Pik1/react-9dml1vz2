import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./styles.css";

// Подставляем твои ключи
const SUPABASE_URL = "https://rltppxkgyasyfkftintn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsdHBweGtneWFzeWZrZnRpbnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTM0NDAsImV4cCI6MjA4NTYyOTQ0MH0.98RP1Ci9UFkjhKbi1woyW5dbRbXJ8qNdopM1aJMSdf4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Получаем категории
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title")
        .order("title");
      if (error) {
        console.error("Ошибка при получении категорий:", error);
      } else {
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0].id); // Выбираем первую категорию
      }
    }
    fetchCategories();
  }, []);

  // Получаем новости для выбранной категории
  useEffect(() => {
    if (!selectedCategory) return;

    async function fetchNews() {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("category_id", selectedCategory)
        .order("published_at", { ascending: false })
        .limit(10);
      setLoading(false);

      if (error) {
        console.error("Ошибка при получении новостей:", error);
      } else {
        setNews(data);
      }
    }
    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="app">
      <h1>📰 Новости</h1>

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={cat.id === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {loading && <p>Загрузка новостей...</p>}

      <div className="news-list">
        {news.map((item) => (
          <div key={item.id} className="news-card">
            <h3>{item.title}</h3>
            <p>{item.summary || item.full_text || "Нет текста"}</p>
            <small>
              {item.published_at
                ? new Date(item.published_at).toLocaleString()
                : ""}
            </small>
          </div>
        ))}
        {news.length === 0 && !loading && <p>Нет новостей в этой категории</p>}
      </div>
    </div>
  );
}

export default App;