import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./styles.css";

export default function App() {
  const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
          }, []);

            const fetchNews = async () => {
                let { data, error } = await supabase
                      .from("news")
                            .select(`
                                    id,
                                            title,
                                                    url,
                                                            published_at,
                                                                    category:categories(title)
                                                                          `)
                                                                                .order("published_at", { ascending: false })
                                                                                      .limit(20);

                                                                                          if (error) console.error("Ошибка загрузки новостей:", error);
                                                                                              else setNews(data);
                                                                                                };

                                                                                                  return (
                                                                                                      <div className="App">
                                                                                                            <h1>📰 Лента новостей</h1>
                                                                                                                  <div className="news-list">
                                                                                                                          {news.length === 0 && <p>Новостей пока нет...</p>}
                                                                                                                                  {news.map((item) => (
                                                                                                                                            <div key={item.id} className="news-card">
                                                                                                                                                        <h3>{item.title}</h3>
                                                                                                                                                                    <p>
                                                                                                                                                                                  <a href={item.url} target="_blank" rel="noreferrer">
                                                                                                                                                                                                  Читать
                                                                                                                                                                                                                </a>
                                                                                                                                                                                                                            </p>
                                                                                                                                                                                                                                        <small>{item.category?.title} | {new Date(item.published_at).toLocaleString()}</small>
                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                          ))}
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                      }