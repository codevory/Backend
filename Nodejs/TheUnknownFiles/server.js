import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";
import { serveStatic } from "./utils/serveStatic.js";
import { sendResponse } from "./utils/sendResponse.js";
import { handleGet, handleNews, handlePost } from "./handlers/routeHandlers.js";
import { parseJSONBody } from "./utils/parseJSONBody.js";

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} : ${req.url}`);

  // 1. Handle SSE News Stream
  if (req.url.endsWith("/api/news") && req.method === "GET") {
    return handleNews(req, res); // Note: handleNews is usually not awaited as it's a long-running stream
  }

  // 2. Handle API routes
  if (req.url.startsWith("/api")) {
    if (req.method === "GET") {
      return await handleGet(__dirname, res);
    }

    if (req.method === "POST") {
      return await handlePost(req, res, __dirname);
    }

    return sendResponse(
      res,
      JSON.stringify({ error: "API endpoint does not exist" }),
      "application/json",
      404,
    );
  }

  return await serveStatic(__dirname, res, req, 200);
});

server.listen(2820, () =>
  console.log("Server listening at : http://localhost", 2820),
);
