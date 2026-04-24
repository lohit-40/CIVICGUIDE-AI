"use client";

import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink, Clock, RefreshCw, AlertTriangle, Rss, ArrowRight } from 'lucide-react';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'JUST NOW';
    if (diff < 3600) return `${Math.floor(diff / 60)}M AGO`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}H AGO`;
    return `${Math.floor(diff / 86400)}D AGO`;
  } catch { return ''; }
}

function getTag(title: string): { label: string; color: string; bg: string } {
  const t = title.toLowerCase();
  if (t.includes('eci') || t.includes('commission')) return { label: 'ECI', color: '#fff', bg: 'var(--blue)' };
  if (t.includes('lok sabha') || t.includes('parliament')) return { label: 'LOK SABHA', color: '#fff', bg: 'var(--fg)' };
  if (t.includes('voter') || t.includes('vote')) return { label: 'VOTING', color: '#fff', bg: 'var(--green)' };
  if (t.includes('evm') || t.includes('vvpat')) return { label: 'EVM', color: '#000', bg: 'var(--yellow)' };
  if (t.includes('party') || t.includes('election')) return { label: 'POLITICS', color: '#fff', bg: 'var(--saffron)' };
  return { label: 'NEWS', color: '#fff', bg: '#444' };
}

export function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load news');
      setArticles(data.articles);
      setLastRefresh(new Date());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  return (
    <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
      
      {/* News Header Section */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
        <div>
          <div className="brut-tag brut-tag-dark" style={{ marginBottom: 12 }}>LIVE FEED</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em', margin: 0 }}>
            INDIAN ELECTION <span style={{ color: 'var(--saffron)' }}>NEWS</span>
          </h2>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Rss className="w-4 h-4" /> UPDATES FROM AUTHORITATIVE SOURCES
            {lastRefresh && <span style={{ color: '#aaa' }}>• LAST REFRESH: {timeAgo(lastRefresh.toISOString())}</span>}
          </p>
        </div>
        <button
          onClick={fetchNews}
          disabled={loading}
          className="brut-btn brut-btn-saffron"
          style={{ padding: '12px 24px', fontSize: '0.85rem' }}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> REFRESH FEED
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{ background: 'var(--red-light)', border: '3px solid var(--border)', padding: '1rem 1.5rem', boxShadow: '5px 5px 0 var(--border)', marginBottom: '2rem', display: 'flex', gap: 12, alignItems: 'center' }}>
          <AlertTriangle className="w-6 h-6 text-red" />
          <p style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem', margin: 0 }}>FAILED TO LOAD NEWS: {error}</p>
        </div>
      )}

      {/* Loading Grid */}
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ height: 280, border: '3px solid var(--border)', background: '#eee', animation: 'pulse 1.5s infinite ease-in-out' }} />
          ))}
        </div>
      )}

      {/* Actual News Grid */}
      {!loading && articles.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {articles.map((article, i) => {
            const tag = getTag(article.title);
            return (
              <a
                key={i}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="brut-card-hover"
                style={{
                  background: '#fff',
                  border: '3px solid var(--border)',
                  boxShadow: '6px 6px 0 var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.15s ease',
                  overflow: 'hidden',
                }}
              >
                {/* News Image Placeholder (Brutalist style) */}
                <div style={{ height: 120, background: tag.bg, borderBottom: '3px solid var(--border)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                   <div style={{ fontSize: '4rem', opacity: 0.15, fontWeight: 900, position: 'absolute', transform: 'rotate(-10deg)' }}>NEWS</div>
                   <Newspaper className="w-12 h-12 text-white" />
                   <div style={{ position: 'absolute', top: 12, left: 12, background: tag.bg, color: tag.color, border: '2px solid var(--border)', padding: '2px 8px', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', boxShadow: '2px 2px 0 var(--border)' }}>
                     {tag.label}
                   </div>
                </div>

                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#aaa', fontFamily: 'var(--font-mono)' }}>{timeAgo(article.pubDate)}</span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.3, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                    {article.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.5, fontWeight: 500, margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.description}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '2px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--saffron)', textTransform: 'uppercase' }}>{article.source}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', fontWeight: 800 }}>READ <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && !error && (
        <div style={{ padding: '5rem 2rem', textAlign: 'center', border: '3px solid var(--border)', background: '#fff' }}>
          <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p style={{ fontWeight: 800, textTransform: 'uppercase', color: '#888' }}>NO NEWS ARTICLES FOUND AT THE MOMENT.</p>
          <button onClick={fetchNews} style={{ background: 'none', border: 'none', color: 'var(--saffron)', fontWeight: 900, textDecoration: 'underline', cursor: 'pointer', marginTop: 12 }}>TRY REFRESHING</button>
        </div>
      )}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--fg)', color: '#fff', border: '3px solid var(--border)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>
          DATA STREAM: GOOGLE NEWS RSS • FILTERED FOR NEUTRALITY • UPDATED REAL-TIME
        </p>
      </div>
    </div>
  );
}
