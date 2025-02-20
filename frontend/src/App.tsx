"use client"

import { useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar.tsx"
import ChatArea from "./components/ChatArea"
import LoginPage from "./components/LoginPage"
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003049",
    },
    secondary: {
      main: "#669bbc",
    },
    error: {
      main: "#c1121f",
    },
    warning: {
      main: "#780000",
    },
    background: {
      default: "#fdf0d5",
    },
  },
})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedContact, setSelectedContact] = useState<string | null>(null)

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />
        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          <Sidebar onSelectContact={setSelectedContact} />
          <ChatArea selectedContact={selectedContact} />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App


