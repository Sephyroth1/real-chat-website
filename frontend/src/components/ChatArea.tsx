"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { type Message, type Chat } from "../mockData";

function ChatArea({ selectedContact }: { selectedContact: string | null }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [contacts, setContacts] = useState<Chat[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  // Fetch initial messages once when the component mounts
  useEffect(() => {
    async function fetchMessages() {
      try {
        const chatResponse = await axios.get(`http://localhost:3000/api/v1/chat`);
        const chat_id = chatResponse.data.id;
        const response = await axios.get(`http://localhost:3000/api/v1/message/${chat_id}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, []);

  // Fetch contacts for the sidebar
  useEffect(() => {
    async function loadContacts() {
      try {
        const userChatResponse = await axios.get(`http://localhost:3000/api/v1/userChat`);
        setContacts(userChatResponse.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
    loadContacts();
  }, []);

  // Fetch the current user's ID (adjust the endpoint as needed)
  useEffect(() => {
    async function fetchCurrentUserId() {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/profile`);
        setCurrentUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }
    fetchCurrentUserId();
  }, []);

  // Helper function to get the current chat id
  async function fetchChatId(): Promise<string | null> {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/chat`);
      return response.data.id;
    } catch (error) {
      console.error("Error fetching chat id:", error);
      return null;
    }
  }

  // Function to post a new message
  async function postNewMessage() {
    try {
      const chat_id = await fetchChatId();
      if (!chat_id) return;
      const response = await axios.post(`http://localhost:3000/api/v1/message/${chat_id}`, {
        message: inputMessage,
      });
      const newMessage: Message = response.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    } catch (error) {
      console.error("Error posting new message:", error);
    }
  }

  // Handler for sending a message
  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "" && selectedContact) {
      await postNewMessage();
    }
  };

  // Format the created_at timestamp into a readable time
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}>
      {selectedContact ? (
        <>
          <Typography variant="h6" sx={{ mb: 2, color: "#003049" }}>
            {contacts.find((contact: Chat) => contact.id === selectedContact)?.chat_name || "Contact"}
          </Typography>
          <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
            {messages.map((message) => (
              <Box
                key={message.message_id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: message.sender_id === currentUserId ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    bgcolor: message.sender_id === currentUserId ? "#669bbc" : "#780000",
                    color: "#fdf0d5",
                    p: 1,
                    borderRadius: 1,
                    maxWidth: "70%",
                  }}
                >
                  {message.message}
                </Box>
                <Typography variant="caption" sx={{ mt: 0.5, color: "#003049" }}>
                  {formatTimestamp(message.created_at)}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField
              fullWidth
              variant="outlined"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              sx={{ mr: 1 }}
            />
            <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Typography variant="h6" sx={{ color: "#003049" }}>
            Select a contact to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ChatArea;

