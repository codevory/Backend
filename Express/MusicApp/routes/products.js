import express from "express";
import { getGenres, getProducts } from "../controllers/productController.js";
export const productRouter = express.Router();
productRouter.get("/", getProducts);
productRouter.get("/genres", getGenres);
