// import sqlite3 from "sqlite3";
// import { open } from "sqlite";

// export async function openDb() {
//   return open({
//     filename: "./chatbot.db",
//     driver: sqlite3.Database,
//   });
// }

// export async function initDb() {
//   const db = await openDb();
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS customers (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       email TEXT
//     )
//   `);

//   // Seed if empty
//   const rows = await db.all("SELECT * FROM customers");
//   if (rows.length === 0) {
//     await db.run("INSERT INTO customers (name, email) VALUES (?, ?)", [
//       "Alice",
//       "alice@example.com",
//     ]);
//     await db.run("INSERT INTO customers (name, email) VALUES (?, ?)", [
//       "Bob",
//       "bob@example.com",
//     ]);
//   }
// }
// lib/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Initialize SQLite
let db;

export async function initDB() {
  if (!db) {
    db = await open({
      filename: "./mydb.sqlite",
      driver: sqlite3.Database,
    });

    // Create table if not exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      )
    `);
  }
  return db;
}