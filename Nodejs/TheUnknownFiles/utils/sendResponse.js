export function sendResponse(res, data, contentType, statusCode) {
  return (
    (res.statusCode = statusCode),
    res.setHeader("Content-Type", contentType),
    res.end(data)
  );
}
