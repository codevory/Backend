import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { vinyl } from "../data/data.js";
import { getDBConnection } from "../db/db.js";

async function seedTable() {
  const db = await getDBConnection();

  try {
    await db.exec("BEGIN TRANSACTION");
    for (const { title, artist, price, image, year, genre, stock } of vinyl) {
      await db.run(
        `INSERT INTO products (title,artist,price,image,year,genre,stock)
            VALUES(?,?,?,?,?,?,?)`,
        [title, artist, price, image, year, genre, stock],
      );
    }

    await db.exec("COMMIT");
    console.log("All records inserted");
  } catch (error) {
    await db.exec("ROLLBACK");
    console.log("Error inserting data", error.message);
  } finally {
    db.close();
    console.log("DB connection closed ");
  }
}

seedTable();
