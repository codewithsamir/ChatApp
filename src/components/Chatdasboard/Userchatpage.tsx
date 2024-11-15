import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import MessageInput from './Messageinput';
import Pollmessage from './Pollmessage';
import Poll from './Poll';
import CustomAudioPlayer from './CustomAudioPlayer'; // Import the custom audio player

type ChatPageProps = {
  selectedUser: {
    image: string;
    name: string;
    status: string;
  };
};

const ChatPage: React.FC<ChatPageProps> = ({ selectedUser }) => {
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [myMessages, setMyMessages] = useState<any[]>([]); // Messages from the current user
  const [otherUserMessages, setOtherUserMessages] = useState<any[]>([]); // Messages from the selected user
  const [isPollVisible, setIsPollVisible] = useState(false);
  const [pollResults, setPollResults] = useState<any>({});
  const [audioUrl, setAudioUrl] = useState('');
  const chatMenuRef = useRef<HTMLDivElement | null>(null);
  // Send a new text or poll message
  const handleSendMessage = (messageData: any) => {
    const messageWithSender = { ...messageData, from: 'me', time: new Date().toLocaleTimeString() };
    setMyMessages((prevMessages) => [...prevMessages, messageWithSender]);

    // For demo, simulate receiving a message from the other user
    if (messageData.text) {
      setOtherUserMessages((prevMessages) => [
        ...prevMessages,
        { text: `Reply to: ${messageData.text}`, from: 'other', time: new Date().toLocaleTimeString() },
      ]);
    }

    // If there is an audio URL, simulate the other user's response with an audio message
    if (audioUrl) {
      setOtherUserMessages((prevMessages) => [
        ...prevMessages,
        { audio: audioUrl, from: 'other', time: new Date().toLocaleTimeString() },
      ]);
      setAudioUrl(''); // Clear the audio URL after sending
    }
  };


    // Handle click outside to close chat menu
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (chatMenuRef.current && !chatMenuRef.current.contains(event.target as Node)) {
          setShowChatMenu(false);  // Close menu if clicked outside
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  // Update poll results without sending a new message
  const handlePollVote = ({ question, selectedOption }: { question: string; selectedOption: string }) => {
    setPollResults((prevResults) => {
      const newResults = { ...prevResults };
      if (!newResults[question]) {
        newResults[question] = {};
      }
      newResults[question][selectedOption] = (newResults[question][selectedOption] || 0) + 1;
      return newResults;
    });
  };

  // Add a new poll message to messages when the poll is submitted
  const handlePollSubmit = (pollData: { question: string; options: string[] }) => {
    handleSendMessage({ poll: { question: pollData.question, options: pollData.options } });
    setIsPollVisible(false);
  };

  const renderMessage = (msg: any, isMyMessage: boolean) => (
    <div className={`mb-2 flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
      <div className="p-3 rounded-lg max-w-xs text-white shadow-md" style={{ backgroundColor: isMyMessage ? '#1f2937' : '#2563eb' }}>
        {msg.text && <p>{msg.text}</p>}
        {msg.audio && (
          <CustomAudioPlayer src={msg.audio} /> // Display custom audio player if it's an audio message
        )}
        {msg.image && <img src={msg.image} alt="Sent Image" className="w-full mt-2 rounded-lg" />}
        {msg.video && <video controls src={msg.video} className="w-full mt-2 rounded-lg" />}
        {msg.document && (
          <a href={msg.document} download>
            <button className="bg-gray-700 text-white p-2 rounded mt-2 w-full">Download Document</button>
          </a>
        )}
        {msg.poll && (
          <Pollmessage
            msg={{ question: msg.poll.question, options: msg.poll.options, votes: pollResults[msg.poll.question] || [] }}
            totalVotes={Object.values(pollResults[msg.poll.question] || {}).reduce((a, b) => a + b, 0)}
            handlePollVote={handlePollVote}
          />
        )}
        <p className="text-xs text-gray-300 mt-1">{msg.time}</p>
      </div>
    </div>
  );

  return (
    <div className="h-[97vh] flex flex-col relative bg-gray-900 text-white">
      <div className="flex items-center p-4 bg-gray-800 shadow-md">
        <img src={selectedUser.image} alt="User Avatar" className="w-12 h-12 rounded-full mr-4 border-2 border-green-400" />
        <div className="flex-1">
          <h4 className="text-lg font-semibold">{selectedUser.name}</h4>
          <p className="text-sm text-gray-400">{selectedUser.status}</p>
        </div>
        <FaEllipsisV className="text-xl cursor-pointer" onClick={() => setShowChatMenu(!showChatMenu)} />
        {showChatMenu && (
          <div ref={chatMenuRef} className="absolute top-12 right-0 bg-gray-700 p-4 w-[150px] z-10 rounded shadow-lg">
            <p className="cursor-pointer" onClick={() => setIsPollVisible(true)}>Create Poll</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 w-full">
         {/* Display messages from the other user */}
         {otherUserMessages.map((msg, index) => renderMessage(msg, false))}
        {/* Display messages from current user */}
        {myMessages.map((msg, index) => renderMessage(msg, true))}
       
      </div>

      {isPollVisible && <Poll onSubmit={handlePollSubmit} setShowPoll={setIsPollVisible} />}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
