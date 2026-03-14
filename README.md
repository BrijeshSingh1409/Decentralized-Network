
# Decentralized Chat Network Simulation

A web-based simulation of a decentralized network where multiple devices communicate using dynamic routing. Each device is assigned a virtual IP address and sends messages through calculated routes using routing algorithms.

---

## Project Overview

This project demonstrates how devices in a decentralized network communicate without relying on a central message broker. Instead, devices calculate routing paths using a topology map and forward packets through intermediate nodes.

Key concepts demonstrated:

* Dynamic IP assignment
* Network topology discovery
* Routing table generation
* Packet forwarding between devices
* Simulation of decentralized communication

The system uses **WebSockets (Socket.IO)** for real-time communication between simulated devices.

---

## Tech Stack

Frontend

* React
* JavaScript
* Socket.IO Client

Backend

* Node.js
* Express
* Socket.IO

---

## Project Architecture

```
Frontend (React Devices)
        │
        │ WebSocket
        ▼
Backend Socket Server
        │
        ▼
Virtual Network Topology
        │
        ▼
Routing Algorithm (Dijkstra)
```

Each browser tab represents a **separate device** in the network.

---

## How It Works

### 1. Device Connection

When a device connects to the server:

* The device sends a `REQUEST_IP` event
* The server assigns a virtual IP address

Example:

```
Device connected
Assigning IP: 10.0.0.1
```

---

### 2. Topology Creation

The server builds a network topology connecting all devices:

```
10.0.0.1 ↔ 10.0.0.2
10.0.0.1 ↔ 10.0.0.3
10.0.0.2 ↔ 10.0.0.3
```

This topology is broadcast to all devices.

---

### 3. Routing Table Generation

Each device runs the **Dijkstra algorithm** to compute the shortest paths.

Example routing table:

| Destination | Next Hop | Cost |
| ----------- | -------- | ---- |
| 10.0.0.2    | 10.0.0.2 | 1    |
| 10.0.0.3    | 10.0.0.2 | 2    |

---

### 4. Message Transmission

When a device sends a message:

1. The routing table determines the next hop
2. The packet is forwarded
3. Intermediate devices forward until the destination is reached

Example packet:

```
Source: 10.0.0.1
Destination: 10.0.0.3
Payload: Hello
```
## Installation

### 1. Clone Repository

```
git clone https://github.com/yourusername/decentralized-chat.git
cd decentralized-chat
```

---

### 2. Install Backend Dependencies

```
cd backend
npm install
```

---

### 3. Install Frontend Dependencies

```
cd frontend
npm install
```

---

## Running the Application

### Start Backend Server

```
cd backend
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

### Start Frontend

```
cd frontend
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Testing the Network

1. Open multiple browser tabs
2. Each tab becomes a **separate network device**
3. Each device receives a unique IP
4. Send messages between devices using destination IP

Example:

```
Destination IP: 10.0.0.2
Message: Hello
```

---

## Example Output

Device A

```
Your IP: 10.0.0.1
```

Device B

```
Your IP: 10.0.0.2
Message Received:
From 10.0.0.1: Hello
```

---

## Features

* Virtual device simulation
* Dynamic IP assignment
* Automatic topology updates
* Routing table visualization
* Packet forwarding simulation
* Real-time communication

---

## Future Improvements

* Visual network graph
* Link failure simulation
* Multiple routing algorithms
* Latency simulation
* Packet loss simulation

---

## Educational Purpose

This project is designed to help understand:

* Computer networking fundamentals
* Routing algorithms
* Distributed communication systems
* WebSocket based networking

---

## Author

Developed as a **network simulation project for learning decentralized routing concepts**.
