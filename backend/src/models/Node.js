// models/Node.js
import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
  nodeId: { type: String, required: true, unique: true },
  ip: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Node = mongoose.model("Node", nodeSchema);