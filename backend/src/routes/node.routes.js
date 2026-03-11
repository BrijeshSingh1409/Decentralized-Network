import express from "express";
import { registerNode, removeNode } from "../controllers/node.controller.js";

const router = express.Router();

// register or update node
router.post("/register", registerNode);

// remove node
router.post("/remove", removeNode);

export default router;