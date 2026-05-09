import express from "express";
import { productRouter } from "./routes/products.js";
import { authRouter } from "./routes/auth.js";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { meRouter } from "./routes/me.js";
import { cartRouter } from "./routes/cart.js";

dotenv.config();
const Secret = process.env.SPIRAL_SESSION_SECRET;
const app = express();
const PORT = 2820;

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: Secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);
app.use(express.static("public"));
app.use("/api/products", productRouter);
app.use("/api/auth/me", meRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

app
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });
