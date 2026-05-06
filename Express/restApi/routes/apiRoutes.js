import express from "express";
import { getDataByPathParams } from "../controllers/getDataByPathParams.js";
import { getAllData } from "../controllers/getAllData.js";

export const apiRouter = express();
apiRouter.get("/:field/:term", getDataByPathParams);
apiRouter.get("/", getAllData);
