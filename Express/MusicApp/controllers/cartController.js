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
  // Don't touch this code!
  if (!req.session.userId) {
    return res.json({ err: "not logged in" });
  }

  const db = await getDBConnection();

  /*
Challenge: 

1. When a logged-in user clicks the cart icon, they will be redirected to the cart.html page. To render the user's cart, the frontend needs to get an array of objects similar to the example below when it makes a GET request to the /api/cart endpoint. Important: this array should be sent in a JSON object with the key 'items'.

[
  {
    cartItemId: 4,
    quantity: 2,
    title: 'Selling Dogma',
    artist: 'The Clouds',
    price: 44.99
  },
  {
    cartItemId: 5,
    quantity: 1,
    title: 'Midnight Parallels',
    artist: 'Neon Grove',
    price: 40.99
  }
]

The frontend JS has been done for you.

Ignore frontend console errors for now!
 
For testing, log in with:
Username: test
Password: test

Then click the cart icon to go to the cart page. You should see the user’s items.

Loads of help in hint.md
*/
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
