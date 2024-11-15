import React, { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import MessageInput from './Messageinput';
import Pollmessage from './Pollmessage';

const ChatPage = ({ selectedUser }: any) => {
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [myMessages, setMyMessages] = useState<any>([]);
  const [otherUserMessages, setOtherUserMessages] = useState<any>([]);
  const [isPollVisible, setIsPollVisible] = useState(false);
  const [pollResults, setPollResults] = useState<any>({});
  const [audioUrl, setAudioUrl] = useState('');

  const handleSendMessage = (messageData: any) => {
    const messageWithSender = { ...messageData, from: 'me', time: new Date().toLocaleTimeString() };
    setMyMessages((prevMessages: any) => [...prevMessages, messageWithSender]);
  };

  const handlePollVote = ({ question, selectedOption }: any) => {
    setPollResults((prevResults: any) => {
      const newResults: any = { ...prevResults };
      if (!newResults[question]) {
        newResults[question] = {};
      }
      newResults[question][selectedOption] = (newResults[question][selectedOption] || 0) + 1;
      return newResults;
    });
    handleSendMessage({ poll: { question, selectedOption } });
  };

  const exampleMessages = [
    { text: "Hello! How's it going?", from: "otherUser", time: new Date().toLocaleTimeString() },
    { text: "Are you ready for the meeting?", from: "otherUser", time: new Date().toLocaleTimeString() },
  ];

  useEffect(() => {
    setOtherUserMessages(exampleMessages);
  }, []);

  const handleSendAudio = () => {
    if (audioUrl) {
      handleSendMessage({ audio: audioUrl });
      setAudioUrl('');
    }
  };

  const handlePollSubmit = (pollData: any) => {
    handleSendMessage({ poll: { question: pollData.question, options: pollData.options } });
    setIsPollVisible(false); // Close the poll input after submission
  };

  const renderMessage = (msg: any, isMyMessage: any) => {
    const isMediaMessage = msg.audio || msg.image || msg.video;
    const messageBgColor = isMediaMessage ? 'bg-gray-600' : (isMyMessage ? 'bg-gray-600' : 'bg-blue-600');
    const messageClassName = `${messageBgColor} p-3 rounded-lg max-w-xs text-white shadow-md`;

    return (
      <div className={`mb-2 flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
        <div className={messageClassName}>
          {msg.text && <p>{msg.text}</p>}
          {msg.audio && <audio controls src={msg.audio} className="mt-2" />}
          {msg.image && <img src={msg.image} alt="User upload" className="mt-2 w-[350px] h-[300px] object-cover rounded" />}
          {msg.video && <video controls src={msg.video} className="mt-2 max-w-full rounded" />}
          {msg.poll && (
            <Pollmessage
              msg={msg.poll}
              pollResults={pollResults}
              handlePollVote={handlePollVote}
            />
          )}
          <p className="text-xs text-gray-300 mt-1">{msg.time}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[97vh] flex flex-col relative bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-800 shadow-md">
        <img
          src={selectedUser?.image}
          alt="User Avatar"
          className="w-12 h-12 rounded-full mr-4 border-2 border-green-400"
        />
        <div className="flex-1">
          <h4 className="font-bold text-white">{selectedUser?.name}</h4>
          <p className="text-sm text-gray-400">{selectedUser?.status}</p>
        </div>
        <button
          className="ml-4 text-gray-400 hover:text-white relative"
          onClick={() => setShowChatMenu(!showChatMenu)}
        >
          <FaEllipsisV />
        </button>
        {showChatMenu && (
          <div className="absolute top-16 right-4 bg-gray-800 text-white p-2 rounded shadow-lg">
            <p className="p-2 hover:bg-gray-600 cursor-pointer">Mute</p>
            <p className="p-2 hover:bg-gray-600 cursor-pointer">Block</p>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-gray-800 p-4 overflow-y-scroll scrollbar-hide flex flex-col-reverse">
        {myMessages.slice().reverse().map((msg: any, index: any) => renderMessage(msg, true))}
        {otherUserMessages.slice().reverse().map((msg: any, index: any) => renderMessage(msg, false))}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
