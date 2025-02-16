# 📩 Real-Time Messaging Website

A real-time chat application built with Node.js, Express, Socket.io, and React (Vite).

## 🚀 Features

- Real-time messaging with WebSockets
- User authentication & registration
- Typing indicators
- Online/offline status
- Responsive design

## 🛠 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT

## 📦 Installation

### Clone the repository

```sh
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
```

### Backend Setup

```sh
cd backend
npm install
npm start
```

### Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (`backend/.env`):

```
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`):

```
VITE_API_URL=http://localhost:5000
```

## Screenshots

![Chat UI](https://via.placeholder.com/800x400.png?text=Chat+UI+Screenshot)

## API Endpoints

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | /api/auth/register    | User Registration |
| POST   | /api/auth/login       | User Login        |
| GET    | /api/messages/:chatId | Get Messages      |
| POST   | /api/messages         | Send Message      |

## Contributors

- [Sudhamshu](https://github.com/Sephyroth1)

## License

This project is licensed under the MIT License.
