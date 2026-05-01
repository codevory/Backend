import path from "node:path";
import fs from "node:fs/promises";

export async function getData(publicDir) {
  try {
    const jsonFile = path.join("data", "data.json");
    const fileData = await fs.readFile(jsonFile, "utf8");
    const parsedData = JSON.parse(fileData);
    return parsedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
