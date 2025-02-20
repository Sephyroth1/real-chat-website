import { useEffect, useState } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Box from "@mui/material/Box"
import { type User } from "../mockData"
import axios from "axios";


function Sidebar({ onSelectContact }: { onSelectContact: (contactId: string) => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [userChat, setUserChat] = useState<User[] | null>();

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
    if(!userChat) return null
    onSelectContact(userChat[index].id)
  }
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/userChat`); 
        const users: User[] = response.data;
        setUserChat(users);
      } catch (error: unknown) {
        throw new Error(`Error: ${error}`)
      }
    }
    fetchData();
  })

  return (
    <Box sx={{ width: 300, bgcolor: "#c1121f", overflowY: "auto" }}>
      <List>
        {userChat?.map((contact, index) => (
          <ListItem key={contact.id} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "#669bbc",
                },
                "&:hover": {
                  bgcolor: "#669bbc",
                },
              }}
            >
              {/*<ListItemAvatar>
                <Badge badgeContent={contact.unreadCount} color="error">
                  <Avatar alt={contact.name} src={contact.avatar} />
                </Badge>
              </ListItemAvatar>*/}
              <ListItemText
                primary={contact.username}
                primaryTypographyProps={{ color: "#fdf0d5" }}
                secondaryTypographyProps={{ color: "#fdf0d5", noWrap: true }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar

