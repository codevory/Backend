export function sendResponse(res, data, Header, statusCode) {
  return (
    res.writeHead(statusCode, Header),
    (res.statusCode = statusCode),
    res.end(data)
  );
}
