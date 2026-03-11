import { useEffect, useState } from "react";
import { requestIP, getMyIP } from "./app/deviceConfig";
import { sendMessage } from "./app/sendMessage";
import { getRoutingTable } from "./app/routingTable";

function App() {

  const [myIP, setMyIP] = useState("");
  const [destIP, setDestIP] = useState("");
  const [message, setMessage] = useState("");
  const [routes, setRoutes] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    requestIP();

    const interval = setInterval(() => {
      setMyIP(getMyIP());
      setRoutes(getRoutingTable());
    }, 1000);

    const handler = (e) => {
      setMessages((prev) => [...prev, e.detail]);
    };

    window.addEventListener("MESSAGE_RECEIVED", handler);

    return () => {
      clearInterval(interval);
      window.removeEventListener("MESSAGE_RECEIVED", handler);
    };

  }, []);

  const handleSend = () => {
    if (!destIP || !message) return;

    sendMessage(destIP, message);
    setMessage("");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>

      <h2>Decentralized Chat Device</h2>

      <h3>Your IP: {myIP || "Assigning..."}</h3>

      <div style={{ marginTop: "20px" }}>

        <input
          type="text"
          placeholder="Destination IP"
          value={destIP}
          onChange={(e) => setDestIP(e.target.value)}
        />

        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleSend}>
          Send
        </button>

      </div>

      <h3 style={{ marginTop: "30px" }}>Messages</h3>

      <ul>
        {messages.map((m, i) => (
          <li key={i}>
            From {m.sourceIP}: {m.payload}
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: "40px" }}>Routing Table</h3>

      <table border="1" cellPadding="8">

        <thead>
          <tr>
            <th>Destination</th>
            <th>Next Hop</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(routes).map(([dest, route]) => (
            <tr key={dest}>
              <td>{dest}</td>
              <td>{route.nextHopIP}</td>
              <td>{route.cost}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default App;