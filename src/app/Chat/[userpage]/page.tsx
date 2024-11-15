// src/app/Chat/[userpage]/page.tsx
"use client"; // Make sure this is a client component
import React, { useEffect, useState } from "react";
import ChatPage from "@/components/Chatdasboard/Userchatpage"; // Assuming this will display user info

const UserChatPage = ({ params }: { params: { userpage: string } }) => {
  const users = [
    { id: 1, name: "User 1", image: "https://i.pravatar.cc/150?img=1", status: "Online" },
    { id: 2, name: "User 2", image: "https://i.pravatar.cc/150?img=2", status: "Offline" },
    { id: 3, name: "User 3", image: "https://i.pravatar.cc/150?img=3", status: "Offline" },
    { id: 4, name: "User 4", image: "https://i.pravatar.cc/150?img=4", status: "Offline" },
    { id: 5, name: "User 5", image: "https://i.pravatar.cc/150?img=5", status: "Offline" },
    { id: 6, name: "User 6", image: "https://i.pravatar.cc/150?img=6", status: "Offline" },
    { id: 7, name: "User 7", image: "https://i.pravatar.cc/150?img=7", status: "Offline" },
    { id: 8, name: "User 8", image: "https://i.pravatar.cc/150?img=8", status: "Offline" },
    { id: 9, name: "User 9", image: "https://i.pravatar.cc/150?img=9", status: "Offline" },
    { id: 10, name: "User 10", image: "https://i.pravatar.cc/150?img=10", status: "Offline" },
    { id: 11, name: "User 11", image: "https://i.pravatar.cc/150?img=11", status: "Offline" },
    { id: 12, name: "User 12", image: "https://i.pravatar.cc/150?img=12", status: "Offline" },
  ];

  const [user, setUser] = useState<any>(null); // Use a more generic type

  useEffect(() => {
   
    const userId = decodeURIComponent(params.userpage).split("_")[1]
    console.log(userId);
    
    const fetchedUser = users.find((u) => u.id === Number(userId));
    setUser(fetchedUser || null);
  }, [params.userpage]);

  return (
    <div className="flex-1 p-2 bg-gray-900">
      {user ? <ChatPage selectedUser={user} /> : <p>Loading...</p>}
    </div>
  );
};

export default UserChatPage;
