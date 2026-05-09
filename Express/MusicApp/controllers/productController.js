import { getDBConnection } from "../db/db.js";
export async function getGenres(req, res) {
  try {
    const db = await getDBConnection();
    const genreRows = await db.all("SELECT DISTINCT genre FROM products");
    const genre = genreRows.map((row) => row.genre);
    res.json(genre);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch genres", details: error.message });
  }
}

export async function getProducts(req, res) {
  try {
    const db = await getDBConnection();
    let query = "SELECT * FROM products";
    let params = [];
    const { genre, search } = req.query;
    if (genre) {
      query += ` WHERE genre = ?`;
      params.push(genre);
    } else if (search) {
      query += ` WHERE artist LIKE ? OR title LIKE ? OR genre LIKE ?`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    res.json(await db.all(query, params));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", details: error.message });
  }
}
