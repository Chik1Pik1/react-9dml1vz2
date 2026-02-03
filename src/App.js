import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import NewCard from "./NewCard";
import "./styles.css";

// Подставляем твои ключи
const SUPABASE_URL = "https://rltppxkgyasyfkftintn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsdHBweGtneWFzeWZrZnRpbnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTM0NDAsImV4cCI6MjA4NTYyOTQ0MH0.98RP1Ci9UFkjhKbi1woyW5dbRbXJ8qNdopM1aJMSdf4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Загружаем категории
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, slug, title")
        .order("title", { ascending: true });

      if (error) {
        console.error("Ошибка загрузки категорий:", error);
      } else {
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0].slug);
      }
    };

    fetchCategories();
  }, []);

  // Загружаем новости при смене категории
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("news")
        .select("id, title, summary, media_url, published_at")
        .eq("category_id", selectedCategory)
        .order("published_at", { ascending: false })
        .limit(10); // последние 10 новостей

      if (error) {
        console.error("Ошибка загрузки новостей:", error);
      } else {
        setNews(data);
      }
      setLoading(false);
    };

    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="app-container">
      <h1>📰 Новости по категориям</h1>

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${
              selectedCategory === cat.slug ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.slug)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Загрузка новостей...</p>
      ) : news.length === 0 ? (
        <p>Новости отсутствуют в этой категории.</p>
      ) : (
        <div className="news-list">
          {news.map((item) => (
            <NewCard
              key={item.id}
              title={item.title}
              text={item.summary || "Нет текста"}
              media_url={item.media_url}
              published_at={item.published_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}