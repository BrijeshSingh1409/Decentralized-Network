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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(18,93,120,0.35),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(219,142,72,0.24),transparent_28%),linear-gradient(135deg,#07111f_0%,#0f1f33_48%,#15253c_100%)] text-slate-100">
      <main className="mx-auto w-[calc(100%-1rem)] max-w-7xl px-2 py-6 sm:w-[calc(100%-2rem)] sm:px-0 sm:py-10">
        <section className="flex flex-col gap-6 rounded-[28px] border border-slate-300/15 bg-slate-950/70 p-5 shadow-2xl shadow-black/30 backdrop-blur md:flex-row md:items-end md:justify-between md:p-7">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-sky-400/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              Mesh Routing Console
            </span>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Decentralized Chat Device
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Send packets across your simulated peer network with dynamic IP
              assignment and shortest-path routing.
            </p>
          </div>

          <div className="min-w-full rounded-3xl border border-sky-200/20 bg-gradient-to-br from-sky-500/20 to-slate-900/80 p-5 md:min-w-[240px]">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              Current Device IP
            </span>
            <strong className="mt-2 block text-xl font-bold text-white">
              {myIP || "Assigning..."}
            </strong>
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-slate-300/15 bg-slate-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur md:p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Send Message</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Choose a destination node and forward a packet.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-200">
                Destination IP
              </span>
              <input
                type="text"
                placeholder="10.0.0.2"
                value={destIP}
                onChange={(e) => setDestIP(e.target.value)}
                className="rounded-2xl border border-slate-400/20 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/70 focus:ring-4 focus:ring-sky-500/15"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-200">
                Message
              </span>
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-2xl border border-slate-400/20 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/70 focus:ring-4 focus:ring-sky-500/15"
              />
            </label>
          </div>

          <button
            className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/20 sm:w-auto"
            onClick={handleSend}
          >
            Send Packet
          </button>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[24px] border border-slate-300/15 bg-slate-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur md:p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Messages</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Packets delivered to this device appear here.
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-400/20 bg-slate-950/50 px-4 py-6 text-center text-slate-400">
                No messages received yet.
              </div>
            ) : (
              <ul className="mt-5 space-y-4">
                {messages.map((m, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-slate-400/15 bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-4"
                  >
                    <div className="flex flex-wrap justify-between gap-2 text-sm">
                      <span className="font-medium text-sky-300">
                        From {m.sourceIP}
                      </span>
                      <span className="font-medium text-amber-300">
                        To {m.destIP}
                      </span>
                    </div>
                    <p className="mt-3 leading-7 text-slate-100">{m.payload}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-[24px] border border-slate-300/15 bg-slate-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur md:p-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Routing Table</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Live next-hop entries computed from current topology.
              </p>
            </div>

            {Object.keys(routes).length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-400/20 bg-slate-950/50 px-4 py-6 text-center text-slate-400">
                No routes available yet.
              </div>
            ) : (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-400/15">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-sky-400/10 text-left text-xs uppercase tracking-[0.16em] text-slate-200">
                      <th className="px-4 py-4">Destination</th>
                      <th className="px-4 py-4">Next Hop</th>
                      <th className="px-4 py-4">Cost</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(routes).map(([dest, route]) => (
                      <tr
                        key={dest}
                        className="border-t border-slate-400/10 text-sm text-slate-100 odd:bg-white/[0.03]"
                      >
                        <td className="px-4 py-4">{dest}</td>
                        <td className="px-4 py-4">{route.nextHopIP}</td>
                        <td className="px-4 py-4">{route.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
