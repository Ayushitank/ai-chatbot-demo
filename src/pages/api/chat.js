// Database-powered chatbot for your site
import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query, messages = [], siteUrl } = req.body || {};
  if (!query) {
    return res.status(400).json({ error: "No query provided" });
  }

  try {
    const targetUrl = typeof siteUrl === "string" && siteUrl.startsWith("http")
      ? siteUrl
      : (process.env.SITE_URL || "");

    const siteContext = targetUrl ? await getSiteContext(targetUrl) : "";

    // Try database first
    const dbResponse = await getDatabaseResponse(query);
    if (dbResponse) {
      return res.status(200).json({ response: dbResponse });
    }

    // Fallback to AI with smarter prompt + history
    const aiResponse = await getAIResponse(query, messages, siteContext, targetUrl);
    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error("Chat API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDatabaseResponse(query) {
  try {
    const lowerQuery = query.toLowerCase();
    const databaseContent = await scanDatabase();

    // Pricing-specific handling
    if (lowerQuery.includes("price") || lowerQuery.includes("cost") || lowerQuery.includes("pricing")) {
      const servicesResponse = formatServicesResponse(databaseContent.services);
      if (servicesResponse) return servicesResponse;
      const faqResponse = formatFAQResponse(databaseContent.faq);
      if (faqResponse) return faqResponse;
    }

    if (lowerQuery.includes("services") || lowerQuery.includes("offer")) {
      return formatServicesResponse(databaseContent.services);
    }
    if (lowerQuery.includes("portfolio") || lowerQuery.includes("projects") || lowerQuery.includes("work")) {
      return formatPortfolioResponse(databaseContent.projects);
    }
    if (lowerQuery.includes("team") || lowerQuery.includes("staff") || lowerQuery.includes("people")) {
      return formatTeamResponse(databaseContent.team);
    }
    if (lowerQuery.includes("testimonials") || lowerQuery.includes("reviews") || lowerQuery.includes("feedback")) {
      return formatTestimonialsResponse(databaseContent.testimonials);
    }
    if (lowerQuery.includes("blog") || lowerQuery.includes("articles") || lowerQuery.includes("posts")) {
      return formatBlogResponse(databaseContent.blog);
    }
    if (lowerQuery.includes("faq") || lowerQuery.includes("questions") || lowerQuery.includes("help")) {
      return formatFAQResponse(databaseContent.faq);
    }
    if (lowerQuery.includes("contact") || lowerQuery.includes("get in touch")) {
      return formatContactResponse(databaseContent.contact);
    }

    // General fuzzy search
    const searchResults = await searchDatabaseContent(query, databaseContent);
    if (searchResults.length > 0) {
      return formatSearchResponse(searchResults);
    }

    return null;
  } catch (error) {
    console.error("Database response error:", error);
    return null;
  }
}

async function scanDatabase() {
  const content = {
    services: [], projects: [], team: [], testimonials: [], blog: [], faq: [], contact: []
  };

  const tables = [
    "services","projects","portfolio","team","staff","testimonials","reviews",
    "blog","articles","posts","faq","contact","company_info","about","clients","case_studies"
  ];

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select("*").limit(50);
      if (!error && data) {
        if (table.includes("service")) content.services.push(...data);
        else if (table.includes("project") || table.includes("portfolio")) content.projects.push(...data);
        else if (table.includes("team") || table.includes("staff")) content.team.push(...data);
        else if (table.includes("testimonial") || table.includes("review")) content.testimonials.push(...data);
        else if (table.includes("blog") || table.includes("article") || table.includes("post")) content.blog.push(...data);
        else if (table.includes("faq")) content.faq.push(...data);
        else if (table.includes("contact") || table.includes("company")) content.contact.push(...data);
      }
    } catch {}
  }

  return content;
}

async function searchDatabaseContent(query, databaseContent) {
  const results = [];
  const searchTerms = query.toLowerCase().split(" ");

  Object.entries(databaseContent).forEach(([tableName, items]) => {
    items.forEach(item => {
      const itemText = JSON.stringify(item).toLowerCase();
      const matchCount = searchTerms.filter(term => itemText.includes(term)).length;
      if (matchCount > 0) results.push({ item, relevance: matchCount, table: tableName });
    });
  });

  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
}

/* Formatters (same as before, trimmed for brevity) */
function formatServicesResponse(services) { /* ... */ }
function formatPortfolioResponse(projects) { /* ... */ }
function formatTeamResponse(team) { /* ... */ }
function formatTestimonialsResponse(testimonials) { /* ... */ }
function formatBlogResponse(blog) { /* ... */ }
function formatFAQResponse(faq) { /* ... */ }
function formatContactResponse(contact) { /* ... */ }
function formatSearchResponse(results) { /* ... */ }

/* === AI Response === */
async function getAIResponse(query, messages, siteContext, siteUrl) {
  try {
    const systemPrompt = `
You are a conversational AI assistant for this website.
- Answer the user's question directly and conversationally.
- Prefer data from the provided database or site context.
- If the user asks about pricing, return clear numbers from services/faq if available.
- If unsure, say you are unsure and suggest contacting support.
- Keep answers concise, friendly, and useful.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-nano-9b-v2:free",
        temperature: 0.7,
        max_tokens: 600,
        messages: [
          { role: "system", content: systemPrompt },
          ...(messages || []), // maintain chat history
          { role: "user", content: query }
        ],
      }),
    });

    if (!response.ok) throw new Error(`AI API error: ${response.status}`);
    const result = await response.json();
    return result?.choices?.[0]?.message?.content || "I couldn't find an answer.";
  } catch (error) {
    console.error("AI Response Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
}

async function getSiteContext(rootUrl) {
  try {
    const pages = new Set([rootUrl]);
    const texts = [];

    // sitemap.xml
    try {
      const sm = new URL("/sitemap.xml", rootUrl).toString();
      const r = await fetch(sm);
      if (r.ok) {
        const xml = await r.text();
        const locs = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
        for (const u of locs.slice(0, 3)) pages.add(u);
      }
    } catch {}

    for (const url of Array.from(pages).slice(0, 4)) {
      try {
        const resp = await fetch(url);
        if (!resp.ok) continue;
        const html = await resp.text();
        const text = html
          .replace(/<script[\s\S]*?<\/script>/gi, " ")
          .replace(/<style[\s\S]*?<\/style>/gi, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        if (text) texts.push(`URL: ${url}\n${text.slice(0, 4000)}`);
      } catch {}
    }

    return texts.join("\n\n---\n\n").slice(0, 12000);
  } catch {
    return "";
  }
}