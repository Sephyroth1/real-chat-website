const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mountRoutes = require("./routes/index.js");
const poolConnect = require("./databaseConnect.js");

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;

app.get("/", (_, res) => {
    res.send("Hello, World");
});

app.set("io", io);

connectDB();
mountRoutes(app);

io.on('connection', (socket) => {
    console.log("socket connected");
    
    socket.on("joinChat", async (userId, chatId) => {
        socket.join(`chat-${chatId}`)
        socket.to(`chat-${chatId}`).emit("userJoined", { userId, chatId });
        await poolConnect(
            "INSERT INTO userchats (user_id, chat_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
            [userId, chatId]
        );
    })

    socket.on("leaveChat", async ({ userId, chatId, permanent }) => {
        socket.leave(`chat-${chatId}`);
        console.log(`User ${userId} left chat: ${chatId}`);

        // Notify others in the chat
        socket.to(`chat-${chatId}`).emit("userLeft", { userId, chatId });

        // If leaving permanently, remove from database
        if (permanent) {
            await poolConnect("DELETE FROM userchats WHERE user_id = $1 AND chat_id = $2", [userId, chatId]);
        }
    });

    socket.on("newMessage", (data) => {
        console.log("Message Receieved", data);
    });

    socket.on("disconnect", () => {
        console.log("client disconnected");
    })
})


server.listen(PORT, () => {
    console.log("Server connected to the PORT env var");
});


