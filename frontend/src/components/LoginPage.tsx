"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const isValidEmail = regex.test(email);
        if(isValidEmail) {
          const response= await axios.post(`http://localhost:3000/api/v1/user`, {username, email, password})
          return response.data;
        }
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fdf0d5",
      }}
    >
      <Box sx={{ maxWidth: 600, textAlign: "center", mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: "#003049" }}>
          Welcome to ChatConnect
        </Typography>
        <Typography variant="h5" sx={{ color: "#780000" }}>
          Connect with friends and family in real-time!
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: 300,
          gap: 2,
        }}
      >
        <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Log In
        </Button>
      </Box>
    </Box>
  )
}

export default LoginPage

