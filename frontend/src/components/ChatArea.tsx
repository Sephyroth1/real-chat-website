"use client"

import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import SendIcon from "@mui/icons-material/Send"
import { mockMessages, mockContacts, type Message } from "../mockData"

function ChatArea({ selectedContact }: { selectedContact: string | null }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")

  useEffect(() => {
    if (selectedContact) {
      setMessages(mockMessages[selectedContact])
    }
  }, [selectedContact])

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "" && selectedContact) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInputMessage("")
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}>
      {selectedContact ? (
        <>
          <Typography variant="h6" sx={{ mb: 2, color: "#003049" }}>
            {mockContacts.find((contact) => contact.id === selectedContact)?.name}
          </Typography>
          <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: message.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    bgcolor: message.sender === "user" ? "#669bbc" : "#780000",
                    color: "#fdf0d5",
                    p: 1,
                    borderRadius: 1,
                    maxWidth: "70%",
                  }}
                >
                  {message.text}
                </Box>
                <Typography variant="caption" sx={{ mt: 0.5, color: "#003049" }}>
                  {formatTimestamp(message.timestamp)}
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
  )
}

export default ChatArea

