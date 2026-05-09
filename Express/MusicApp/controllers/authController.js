import validator from "validator";
import { getDBConnection } from "../db/db.js";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
  const { name, email, password, username } = req.body;
  const db = await getDBConnection();
  if (!name || !email || !password || !username) {
    return res.status(400).json({ error: "All fields are required." });
  } else if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Enter valid email" });
  } else if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error:
        "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log(encryptedPassword);
  const user = {
    name: name.trim().toLowerCase(),
    email: email,
    password: encryptedPassword,
    username: username.toLowerCase(),
  };
  try {
    let existing = await db.get(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [user.email, user.username],
    );
    if (existing) {
      return res
        .status(400)
        .json({ error: "Username or password already in use!" });
    }
    const result = await (
      await db
    ).run(
      `INSERT INTO users (name,email,username,password)
      VALUES(?,?,?,?)`,
      [user.name, user.email, user.username, user.password],
    );
    req.session.userId = result.lastID;
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res
      .status(500)
      .json({ error: "Registration failed. Please try again." });
  } finally {
    (await db).close();
    console.log("DB connection closed");
  }
}

export async function loginUser(req, res) {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  username = username.trim();

  const db = await getDBConnection();
  try {
    const user = await db.get("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    req.session.userId = user.id;
    res.status(200).json({ message: "loggedIn" });
  } catch (error) {
    console.log("Login error ", error.message);
    return res.status(500).json({ error: "Failed to login, Try again" });
  } finally {
    await db.close();
  }
}

export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "User logged Out" });
  });
};
