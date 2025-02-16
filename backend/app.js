const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;

app.get("/", (_, res) => {
    res.send("Hello, World");
});

connectDB();

io.on('connection', (socket) => {
    console.log("socket connected");
    socket.on("message", (data) => {
        console.log("Message Receieved", data);
   });
})


server.listen(PORT, () => {
    console.log("Server connected to the PORT env var");
});


