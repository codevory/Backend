import path from "node:path";
import fs from "node:fs/promises";
import { getData } from "./getData.js";

export async function addNewSighting(newSighting, publicDir) {
  try {
    const existingData = await getData(publicDir);
    const dataToWrite = [...existingData];
    dataToWrite.push(newSighting);
    const postDataFile = path.join("data", "data.json");
    await fs.writeFile(
      postDataFile,
      JSON.stringify(dataToWrite, null, 2),
      "utf8",
    );
  } catch (err) {
    throw new Error("Failed to write file");
  }
}
