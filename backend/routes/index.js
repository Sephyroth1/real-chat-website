import userRoutes from "./userRoutes.js";
import chatRoutes from "./chatRoutes.js";
import userChatRoutes from "./userChatRoutes.js";
import messageRoutes from './messageRoutes.js'


const mountRoutes = (app) => {
    app.use("/api/v1/user", userRoutes);
    app.use("/api/v1/chat", chatRoutes);
    app.use("/api/v1/userChat", userChatRoutes);
    app.use("/api/v1/message", messageRoutes);
}

export default mountRoutes;
