"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // In a real app, you would validate the credentials here
    if (username && password) {
      onLogin()
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

