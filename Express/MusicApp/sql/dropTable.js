import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { getDBConnection } from "../db/db.js";

async function dropTable() {
  const db = await getDBConnection();

  await db.exec(`
            DROP TABLE IF EXISTS users;
            `);

  await db.close();
  console.log("table dropped");
}

dropTable();
