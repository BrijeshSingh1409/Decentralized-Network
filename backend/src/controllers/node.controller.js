export const registerNode = async (req, res) => {
  const { nodeId } = req.body;

  if (!nodeId) {
    return res.status(400).json({ message: "nodeId is required" });
  }

  console.log(`Node registered: ${nodeId}`);

  res.json({
    success: true,
    nodeId,
  });
};
