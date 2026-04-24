import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Google News RSS - free, no API key needed
    const rssUrl = 'https://news.google.com/rss/search?q=India+election+ECI+voting&hl=en-IN&gl=IN&ceid=IN:en';
    
    const res = await fetch(rssUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 CivicGuide/1.0' },
      next: { revalidate: 1800 } // Cache for 30 minutes
    });

    if (!res.ok) throw new Error('Failed to fetch news feed');

    const xml = await res.text();

    // Parse RSS XML manually (no external parser needed)
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 12) {
      const block = match[1];
      
      const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || block.match(/<title>(.*?)<\/title>/))?.[1] || '';
      const link = (block.match(/<link>(.*?)<\/link>/) || block.match(/<link\/>(.*?)<\/link>/))?.[1] || '#';
      const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/))?.[1] || '';
      const source = (block.match(/<source[^>]*>(.*?)<\/source>/))?.[1] || 'News';
      const description = (block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || block.match(/<description>(.*?)<\/description>/))?.[1] || '';

      // Clean up HTML tags from description
      const cleanDesc = description.replace(/<[^>]+>/g, '').substring(0, 180).trim();

      if (title) {
        items.push({
          title: title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
          link,
          pubDate,
          source,
          description: cleanDesc || 'Click to read the full article.',
        });
      }
    }

    return NextResponse.json({ articles: items });
  } catch (error: any) {
    console.error('News fetch error:', error);
    return NextResponse.json({ articles: [], error: error.message }, { status: 500 });
  }
}
