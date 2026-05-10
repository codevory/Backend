import { getDBConnection } from "../db/db.js";

export async function addToCart(req, res) {
  const db = await getDBConnection();

  const product_Id = parseInt(req.body.productId);
  if (product_Id === "NAN" || undefined) {
    console.error("invalid product id");
    return res.json({ error: "Invalid product_id" });
  }

  if (!req.session.userId) {
    return res.status(401).json({ eror: "User not Authenticated" });
  }
  try {
    const user = await db.get(`SELECT * FROM users WHERE id = ? `, [
      req.session.userId,
    ]);
    const existingItem = await db.get(
      `SELECT * FROM cart_items WHERE product_id = ? AND user_id = ?`,
      [product_Id, req.session.userId],
    );

    if (existingItem) {
      await db.run(
        `UPDATE cart_items SET quantity = quantity + 1 WHERE product_id = ? AND user_id = ? `,
        [product_Id, req.session.userId],
      );
      res.status(200).json({ message: "Added to Cart" });
    } else {
      await db.run(
        `INSERT INTO cart_items (user_id,product_id,quantity) VALUES(?,?,1)`,
        [req.session.userId, product_Id],
      );
      res.status(200).json({ message: "Added to Cart" });
    }
  } catch (error) {
    console.error("Error adding to cart : ", error.message);
  }
}

export async function getCartCount(req, res) {
  const db = await getDBConnection();

  try {
    const result = await db.get(
      "SELECT SUM(quantity) AS total FROM cart_items WHERE user_Id = ?",
      [req.session.userId],
    );

    res.status(200).json({ totalItems: result.total || 0 });
  } catch (err) {
    console.error("invalid cart count : ", err.message);
  }
}

export async function getAll(req, res) {
  if (!req.session.userId) {
    return res.json({ err: "not logged in" });
  }

  const db = await getDBConnection();
  try {
    const items = await db.all(
      `SELECT ci.id AS cartItemId, ci.quantity,p.title,p.artist,p.price FROM cart_items 
      ci JOIN products p ON p.id = ci.product_id WHERE ci.user_Id = ?`,
      [req.session.userId],
    );

    res.status(200).json({ items: items });
  } catch (err) {
    console.error("Error getting cart Items : ", err.message);
  }
}

export async function deleteItem(req, res) {
  const db = await getDBConnection();

  try {
    const { itemId } = req.params;
    const product_id = parseInt(itemId);
    if (isNaN(product_id)) {
      return res.status(404).json({ error: "Invalid Product Id" });
    }
    const isInCart = await db.get(
      "SELECT * FROM cart_items WHERE user_id = ? AND id = ?",
      [req.session.userId, product_id],
    );

    if (!isInCart) {
      return res.status(404).json({ error: "Invalid Item ID" });
    }

    await db.run("DELETE FROM cart_items WHERE user_id = ? AND id = ?", [
      req.session.userId,
      product_id,
    ]);
    console.log("Item with id : ", product_id, " deleted successfully");
    res.status(204).send();
  } catch (err) {
    console.error("Failed to delete Item : ", err.message);
  }
}

export async function deleteAll(req, res) {
  const db = await getDBConnection();

  try {
    const isValidCart = await db.run(
      "SELECT * FROM cart_items WHERE user_id = ?",
      [req.session.userId],
    );
    if (!isValidCart) {
      return res.status(404).json({ error: "No cart Items exist" });
    }
    await db.run("DELETE FROM cart_items WHERE user_id = ? ", [
      req.session.userId,
    ]);
    res.status(204).send();
    console.log("order placed successfully");
  } catch (err) {
    console.error("Failed to checkout : ", err.message);
    res.status(400).json({ error: `Failed to process order ${err.message}` });
  }
}
