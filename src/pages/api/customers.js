// src/pages/api/customers.js
import { supabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("customers").select("*");
      if (error) throw error;
      return res.status(200).json(data);
    } catch (err) {
      console.error("GET /api/customers error:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const { data, error } = await supabase
        .from("customers")
        .insert([{ name, email }])
        .select(); // return inserted row

      if (error) throw error;

      return res.status(201).json(data[0]);
    } catch (err) {
      console.error("POST /api/customers error:", err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
