import { Node } from "../models/Node.js";

// Register or update node
export const registerNode = async (req, res) => {
  const { nodeId, ip } = req.body;

  if (!nodeId || !ip) {
    return res.status(400).json({ message: "nodeId and ip are required" });
  }

  try {
    const node = await Node.findOneAndUpdate(
      { nodeId },               // find node by nodeId
      { ip, createdAt: new Date() }, // update IP and timestamp
      { upsert: true, new: true }    
    );

    console.log(`Node registered: ${nodeId} with IP: ${ip}`);

    res.json({ success: true, node });
  } catch (err) {
    console.error("MongoDB error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove node
export const removeNode = async (req, res) => {
  const { nodeId } = req.body;

  if (!nodeId) {
    return res.status(400).json({ message: "nodeId is required" });
  }

  try {
    await Node.findOneAndDelete({ nodeId });
    console.log(`Node removed: ${nodeId}`);
    res.json({ success: true });
  } catch (err) {
    console.error("MongoDB error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};