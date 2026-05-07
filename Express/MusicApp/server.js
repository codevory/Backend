import express from "express";
import cors from "cors";
import { productRouter } from "./routes/products.js";

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use("/api/products", productRouter);

app
  .listen(2820, () => {
    console.log("server running at : http://localhost:2820");
  })
  .on("error", (err) => {
    console.log("Failed to start server ", err.message);
  });
