import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";
import { getData } from "./getData.js";

export async function serveStatic(baseDir, res, req, statusCode) {
  const publicDir = path.join(baseDir, "public");
  const postsData = await getData(publicDir);
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
    if (error.code === "ENOENT") {
      const page404 = path.join(publicDir, "404.html");
      const resourceNotFoundPage = await fs.readFile(page404);
      sendResponse(res, resourceNotFoundPage, "text/html", 404);
    } else {
      sendResponse(
        res,
        `<html><h1>Server Error: ${err.code}</h1></html`,
        "text/html",
        500,
      );
    }
  }
}
