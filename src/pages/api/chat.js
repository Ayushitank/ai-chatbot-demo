// pages/api/chat.js
import { initDB } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const db = await initDB();

    // --- Check if query is about customers ---
    if (query.toLowerCase().includes("customers")) {
      const customers = await db.all("SELECT * FROM customers");

      // Make it more chatbot-friendly
      if (customers.length === 0) {
        return res.json({ reply: "There are no customers in the database." });
      }

      const formatted = customers
        .map((c) => `• ${c.name} (${c.email})`)
        .join("\n");

      return res.json({ reply: `Here are the customers:\n${formatted}` });
    }

    // --- Otherwise: send to OpenRouter ---
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: query },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response";

    return res.json({ reply });
  } catch (err) {
    console.error("Chat API Error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
