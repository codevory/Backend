import express from "express";
import { people, startups } from "./data/data.js";
import { apiRouter } from "./routes/apiRoutes.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use("/api", apiRouter);
app.use((req, res, next) => {
  res.status(404).json({
    error: "Unknown Endpoint",
    message: "Endpoint not found. Please check the API documentation.",
  });
});
app.listen(2820, () => console.log("server listening : http://localhost:2820"));
