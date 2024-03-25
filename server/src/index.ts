import http from "http";
import path from "path";
import { spawn } from "child_process";
import express from "express";
import { Server as SocketIO } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const options = [
  "-i",
  "-",
  "-c:v",
  "libx264",
  "-preset",
  "ultrafast",
  "-tune",
  "zerolatency",
  "-r",
  `${25}`,
  "-g",
  `${25 * 2}`,
  "-keyint_min",
  25,
  "-crf",
  "25",
  "-pix_fmt",
  "yuv420p",
  "-sc_threshold",
  "0",
  "-profile:v",
  "main",
  "-level",
  "3.1",
  "-c:a",
  "aac",
  "-b:a",
  "128k",
  "-ar",
  128000 / 4,
  "-f",
  "flv",
  `rtmp:url`,
];

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);
  socket.on("binarystream", (stream) => {
    console.log("Binary incoming....");
    // ffmpegProcess.stdin.write(stream, (err) => {
    //     console.log("error", err)
    // }
  });
  socket.on("rtmp", (url) => {
    console.log("URL received:", url);
    // Handle the received URL here...
  });
});

server.listen(3000, () =>
  console.log("HTTP server running on http://localhost:3000")
);
