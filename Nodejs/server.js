import { PageNotFound } from "./content.js";
import http from "node:http";
import fs from "node:fs";

const homePage = fs.readFileSync("./index.html");
const aboutPage = fs.readFileSync("./about.html");
const serverPage = fs.readFileSync("./server.html");
const style = fs.readFileSync("./style.css");

const server = http.createServer((req, res) => {
  console.log("Requested URL : ", req.url);
  console.log("Requested Method : " + req.method);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(homePage);
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(aboutPage);
  } else if (req.url === "/server") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(serverPage);
  } else if (req.url === "/style.css") {
    res.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
    res.end(style);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(PageNotFound);
  }
});

server.listen(2820, () => {
  console.log(`server running at : localhost:2820`);
});
