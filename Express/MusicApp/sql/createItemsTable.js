import { getDBConnection } from "../db/db.js";

async function createItemTable() {
  const db = await getDBConnection();
  try {
    await db.exec(
      `CREATE TABLE IF NOT EXISTS cart_items(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id)
        FOREIGN KEY (product_id) REFERENCES products(id)
        )`,
    );
    console.log("Table created successfully");
  } catch (error) {
    console.error("eror occured to create Table : ", error.message);
  }
}

createItemTable();
