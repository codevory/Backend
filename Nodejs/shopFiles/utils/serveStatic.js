import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";

export async function serveStatic(baseDir, res, req, statusCode) {
  const publicDir = path.join(baseDir, "public");
  const pathToResource = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url,
  );
  const ext = path.extname(pathToResource);
  const contentType = getContentType(ext);
  try {
    const content = await fs.readFile(pathToResource);
    sendResponse(res, content, contentType, statusCode);
  } catch (error) {
    console.error(error);
  }
}
