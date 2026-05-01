import sanitize from "sanitize-html";

export function sanitizeInput(payload) {
  let sanitizedData = {};
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string") {
      sanitizedData[key] = sanitize(value, {
        allowedTags: ["b"],
        allowedAttributes: {},
      });
    } else {
      sanitizedData[key] = value;
    }
  }

  return sanitizedData;
}
