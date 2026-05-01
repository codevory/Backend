import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";
import { serveStatic } from "./utils/serveStatic.js";
import { sendResponse } from "./utils/sendResponse.js";

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} : ${req.url}`);
  return await serveStatic(__dirname, res, req, 200);
});

server.listen(3000, () =>
  console.log("Server listening at : http://localhost", 3000),
);
