import React, { useEffect, useState } from "react";
import NewCard from "./NewCard";
import "./styles.css";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rltppxkgyasyfkftintn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsdHBweGtneWFzeWZrZnRpbnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTM0NDAsImV4cCI6MjA4NTYyOTQ0MH0.98RP1Ci9UFkjhKbi1woyW5dbRbXJ8qNdopM1aJMSdf4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("categories").select("*");
      setCategories(data);
      if (data.length > 0) setSelectedCategory(data[0].slug);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    async function fetchNews() {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("category_slug", selectedCategory)
        .order("created_at", { ascending: false })
        .limit(10);
      setNews(data);
    }
    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="App">
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            className={selectedCategory === cat.slug ? "active" : ""}
            onClick={() => setSelectedCategory(cat.slug)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="news-container">
        {news.map((item) => (
          <NewCard
            key={item.id}
            title={item.title}
            text={item.summary}
            media_url={item.media_url}
            published_at={item.created_at}
          />
        ))}
      </div>
    </div>
  );
}