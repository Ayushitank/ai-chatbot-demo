// pages/api/customers.js
import { initDB } from "../../lib/db";

export default async function handler(req, res) {
  const db = await initDB();

  try {
    if (req.method === "GET") {
      // View all customers
      const customers = await db.all("SELECT * FROM customers");
      return res.json(customers);
    }

    if (req.method === "POST") {
      // Add a customer
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and Email required" });
      }

      await db.run("INSERT INTO customers (name, email) VALUES (?, ?)", [
        name,
        email,
      ]);
      return res.json({ message: "Customer added successfully" });
    }

    if (req.method === "DELETE") {
      // Delete customer by id
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "Customer ID required" });

      await db.run("DELETE FROM customers WHERE id = ?", [id]);
      return res.json({ message: "Customer deleted successfully" });
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
}
