"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaCommentAlt, FaEllipsisV } from "react-icons/fa"; // React Icon for the chat menu and 3-dot menu
import ProfileCard from "./Profilecard"; // Assuming ProfileCard is in the same folder

const ChatLayout = () => {
  const [showChatSidebar, setShowChatSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSidebarMenu, setShowSidebarMenu] = useState(false); // For 3-dot menu in sidebar
  const [showChatMenu, setShowChatMenu] = useState(false); // For 3-dot menu in chat page
  const [showProfileCard, setShowProfileCard] = useState(false); // New state for profile card visibility

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

  return (
    <div className="flex h-screen bg-black text-white">
      {/* First Sidebar with Chat Menu */}
      <div className="w-20 bg-gray-800 p-4 flex flex-col justify-between h-full relative">
        {/* Top Button: Chat Icon */}
        <div>
          <button
            className={`text-xl flex flex-col items-center text-yellow-500 hover:text-yellow-600 p-2 rounded-lg ${
              showChatSidebar ? "bg-gray-700" : ""
            }`}
            onClick={() => setShowChatSidebar(!showChatSidebar)}
          >
            <FaCommentAlt className="mb-1" />
            <span className="text-sm">Chat</span>
          </button>
        </div>

        {/* Bottom Button: Profile Image */}
        <div>
          <button
            className="text-xl flex flex-col items-center text-yellow-500 hover:text-yellow-600 p-2 rounded-lg"
            onClick={() => setShowProfileCard(!showProfileCard)} // Toggle profile card visibility
          >
            <img
              src="https://i.pravatar.cc/150?img=1" // Replace with the actual profile image URL
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover mb-1" // Circular image
            />
            <span className="text-sm">Profile</span>
          </button>
        </div>

        {/* Show Profile Card if the state is true */}
   
        {showProfileCard && (
          <div className="absolute bottom-10 right-[-270px] z-10 ">
  <ProfileCard
  
    name="User 1"
    email="user1@example.com"
    image="https://i.pravatar.cc/150?img=1"
    status="Hey there! I'm using WhatsApp"
    lastSeen="Last seen 10 minutes ago"
    onClose={() => setShowProfileCard(false)} // Close profile card
  />
  </div>
)}
      </div>

      {/* Second Sidebar: User List */}
      {showChatSidebar && (
        <div className="w-64 bg-gray-700 p-4 transition-all relative">
          {/* Header with Search Button, Search Input, and 3-Dot Menu */}
          <div className="flex justify-between items-center mb-4">
            {/* Search Icon and Input */}
            <div className="flex items-center bg-gray-600 p-2 rounded w-full">
              <button className="text-white pr-2">🔍</button>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent w-full text-white placeholder-gray-400"
              />
            </div>
            {/* 3-Dot Menu Button */}
            <button
              className="ml-4 text-gray-400 hover:text-white"
              onClick={() => setShowSidebarMenu(!showSidebarMenu)}
            >
              <FaEllipsisV />
            </button>
            {/* Popup Menu for 3-Dot (Now near the button) */}
            {showSidebarMenu && (
              <div className="absolute top-14 right-[-100px] z-10 bg-gray-800 text-white p-2 w-[150px] rounded shadow-lg">
                <p className="p-2 hover:bg-gray-600 cursor-pointer">Option 1</p>
                <p className="p-2 hover:bg-gray-600 cursor-pointer">Option 2</p>
              </div>
            )}
          </div>

          {/* User List - Scrollable */}
          <div className="overflow-y-auto h-[calc(100vh-160px)] custom-scroll rounded-md">
            {users.map((user: any) => (
              <Link
                href={`/Chat/${user.name}_${user.id}`}
                key={user.id}
                className="flex items-center p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={user.image}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{user.name}</h4>
                  <p className="text-sm text-gray-400">Last message</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
