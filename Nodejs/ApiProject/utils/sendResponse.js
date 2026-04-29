export function sendResponse({ res, data, dataType, statusCode }) {
  return (
    res.setHeader("Content-Type", `${dataType}`),
    res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET",
    )((res.setStatusCode = statusCode)),
    res.end(JSON.stringify(data))
  );
}
