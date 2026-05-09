import path from "node:path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { getDBConnection } from "../db/db.js";

async function createProductTable() {
  const db = await getDBConnection();

  await db.exec(
    `CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL,
        year INTEGER,
        genre TEXT,
        artist TEXT,
        stock INTEGER
        )`,
  );

  db.close(() => console.log("database table created"));
}

createProductTable();
