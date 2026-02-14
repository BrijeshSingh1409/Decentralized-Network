// src/App.jsx
import { useEffect } from "react";
import { requestIP } from "./app/deviceConfig";

function App() {
  useEffect(() => {
    requestIP();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Decentralized Routing Simulator</h1>
      <p>Open multiple tabs to simulate multiple devices.</p>
    </div>
  );
}

export default App;
