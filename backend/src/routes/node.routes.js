import express from "express";
import { registerNode } from "../controllers/node.controller.js";

const router = express.Router();

router.post("/register", registerNode);

export default router;
