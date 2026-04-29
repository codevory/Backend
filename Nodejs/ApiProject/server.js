import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendResponse } from "./utils/sendResponse.js";
import { getFilteredData } from "./utils/filterData.js";
import { getDataByParams } from "./utils/getDataByParams.js";

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();
  const urlObject = new URL(req.url, `http:${req.headers.host}`);
  const queryObj = Object.fromEntries(urlObject.searchParams);
  console.log(queryObj);
  if (req.method === "GET" && urlObject.pathname === "/api") {
    sendResponse({
      res: res,
      data: destinations,
      dataType: "application/json",
      statusCode: 200,
    });
  } else if (req.method === "GET" && req.url.startsWith(`/api/?continent`)) {
    let query = req.url.split("/").pop();
    sendResponse({
      res: res,
      data: getDataByParams(destinations, queryObj),
      dataType: "application/json",
      statusCode: 200,
    });
  } else if (
    req.method === "GET" &&
    req.url.startsWith("/api/?continent/?country")
  ) {
    const urlObject = new URL(req.url, `http:${req.headers.host}`);
    const queryObj = Object.fromEntries(urlObject.searchParams);
    let query = req.url.split("/").pop();

    sendResponse({
      res: res,
      data: getFilteredData({
        data: destinations,
        locationName: query,
        locationType: "country",
      }),
      dataType: "application/json",
      statusCode: 200,
    });
  } else {
    let errorMessage = {
      error: "not found",
      message: "The requested route does not exist",
    };
    sendResponse({
      res: res,
      data: errorMessage,
      dataType: "application/json",
      statusCode: 404,
    });
  }
});

server.listen(2820, () => console.log("Server running at localhost:2820"));
