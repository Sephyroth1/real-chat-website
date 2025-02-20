export interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  unreadCount: number
}

export interface Message {
  id: string
  text: string
  sender: "user" | "contact"
  timestamp: Date
}

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Hey, how are you doing?",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Did you see the game last night?",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Charlie Brown",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Can you help me with the project?",
    unreadCount: 1,
  },
  {
    id: "4",
    name: "Diana Ross",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Thanks for the birthday wishes!",
    unreadCount: 0,
  },
  {
    id: "5",
    name: "Ethan Hunt",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Mission accomplished!",
    unreadCount: 3,
  },
]

export const mockMessages: { [contactId: string]: Message[] } = {
  "1": [
    { id: "1", text: "Hey Alice, how are you doing?", sender: "user", timestamp: new Date("2023-05-01T10:00:00") },
    {
      id: "2",
      text: "Hi! I'm doing great, thanks for asking. How about you?",
      sender: "contact",
      timestamp: new Date("2023-05-01T10:05:00"),
    },
    {
      id: "3",
      text: "I'm good too. Just working on a new project.",
      sender: "user",
      timestamp: new Date("2023-05-01T10:10:00"),
    },
    {
      id: "4",
      text: "That sounds interesting! What kind of project is it?",
      sender: "contact",
      timestamp: new Date("2023-05-01T10:15:00"),
    },
  ],
  "2": [
    {
      id: "1",
      text: "Hey Bob, did you catch the game last night?",
      sender: "user",
      timestamp: new Date("2023-05-02T09:00:00"),
    },
    {
      id: "2",
      text: "Yeah, it was an amazing match! Our team played really well.",
      sender: "contact",
      timestamp: new Date("2023-05-02T09:05:00"),
    },
    {
      id: "3",
      text: "That last-minute goal was incredible.",
      sender: "user",
      timestamp: new Date("2023-05-02T09:10:00"),
    },
  ],
  "3": [
    {
      id: "1",
      text: "Charlie, how's the project coming along?",
      sender: "user",
      timestamp: new Date("2023-05-03T14:00:00"),
    },
    {
      id: "2",
      text: "It's going well, but I'm stuck on a particular problem. Could you help?",
      sender: "contact",
      timestamp: new Date("2023-05-03T14:05:00"),
    },
    {
      id: "3",
      text: "Sure, I'd be happy to help. What's the issue?",
      sender: "user",
      timestamp: new Date("2023-05-03T14:10:00"),
    },
  ],
  "4": [
    { id: "1", text: "Happy birthday, Diana! 🎉🎂", sender: "user", timestamp: new Date("2023-05-04T00:00:00") },
    {
      id: "2",
      text: "Thank you so much! It means a lot to me.",
      sender: "contact",
      timestamp: new Date("2023-05-04T08:00:00"),
    },
    { id: "3", text: "I hope you have a fantastic day!", sender: "user", timestamp: new Date("2023-05-04T08:05:00") },
  ],
  "5": [
    {
      id: "1",
      text: "Ethan, status report on the mission?",
      sender: "user",
      timestamp: new Date("2023-05-05T20:00:00"),
    },
    {
      id: "2",
      text: "Mission accomplished. Target secured.",
      sender: "contact",
      timestamp: new Date("2023-05-05T20:05:00"),
    },
    {
      id: "3",
      text: "Excellent work. Return to base for debriefing.",
      sender: "user",
      timestamp: new Date("2023-05-05T20:10:00"),
    },
    { id: "4", text: "Roger that. ETA 30 minutes.", sender: "contact", timestamp: new Date("2023-05-05T20:15:00") },
  ],
}

