import { useState } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
import Box from "@mui/material/Box"
import { mockContacts } from "../mockData"

function Sidebar({ onSelectContact }: { onSelectContact: (contactId: string) => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
    onSelectContact(mockContacts[index].id)
  }

  return (
    <Box sx={{ width: 300, bgcolor: "#c1121f", overflowY: "auto" }}>
      <List>
        {mockContacts.map((contact, index) => (
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
                primary={contact.name}
                secondary={contact.lastMessage}
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

