import { getData } from "../utils/getData.js";
import path from "node:path";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sightingEvents } from "../events/sightingEvents.js";
import { stories } from "../data/stories.js";

export async function handleGet(baseDir, res) {
  const publicDir = path.join(baseDir, "public");
  try {
    const data = await getData(publicDir);
    const payload = JSON.stringify(data);
    return sendResponse(res, payload, "application/json", 200);
  } catch (error) {
    sendResponse(
      res,
      `<html><h3>Opps Error occured</h3></html>`,
      "text/html",
      404,
    );
    console.error(error);
  }
}

export async function handlePost(req, res, baseDir) {
  const publicDir = path.join(baseDir, "public");
  try {
    const parsedBody = await parseJSONBody(req);
    const sanitizedBody = sanitizeInput(parsedBody);
    await addNewSighting(sanitizedBody, publicDir);
    sendResponse(res, JSON.stringify(sanitizedBody), "application/json", 201);
    sightingEvents.emit("sighting-added", sanitizedBody);
  } catch (err) {
    sendResponse(res, JSON.stringify({ error: err }), "application/json", 400);
  }
}

export function handleNews(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  const timer = setInterval(() => {
    if (stories.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stories.length);
    const data = JSON.stringify({
      story: stories[randomIndex],
    });
    res.write(`data: ${JSON.stringify({ story: stories[randomIndex] })}\n\n`);
  }, 3000);

  req.on("close", () => {
    clearInterval(timer);
    res.end();
    console.log("Client disconnected, interval cleared.");
  });
}
