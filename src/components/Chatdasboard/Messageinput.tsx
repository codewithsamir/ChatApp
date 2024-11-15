import React, { useState, useRef, useEffect } from 'react';
import {
  FaPlus,
  FaPaperPlane,
  FaCamera,
  FaImage,
  FaFileAlt,
  FaPoll,
} from 'react-icons/fa';
import MicRecorder from './MicRecorder'; // Ensure your MicRecorder handles audio correctly
import PollComponent from './Poll'; // Ensure your PollComponent is correctly structured

const MessageInput = ({ onSendMessage }: { onSendMessage: (data: any) => void }) => {
  const [message, setMessage] = useState('');
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const mediaOptionsRef = useRef<HTMLDivElement | null>(null);
  const pollRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (message || audioUrl) {
      onSendMessage({ text: message, audio: audioUrl });
      setMessage('');
      setAudioUrl(null);
      setShowPoll(false);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = (url: string) => {
    setIsRecording(false);
    setAudioUrl(url);
  };

  const handlePollSubmit = (pollData: any) => {
    onSendMessage({ poll: pollData });
    setShowPoll(false);
  };

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoTracks = stream.getVideoTracks();
      console.log('Using video device: ' + videoTracks[0].label);
      stream.getTracks().forEach(track => track.stop());
      setShowMediaOptions(false);
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mediaOptionsRef.current &&
        !mediaOptionsRef.current.contains(event.target as Node) &&
        pollRef.current &&
        !pollRef.current.contains(event.target as Node)
      ) {
        setShowMediaOptions(false);
        setShowPoll(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative bg-gray-800 p-4 flex items-center">
      <button
        className={`text-white mr-2 transition-transform duration-300 ${showMediaOptions ? 'rotate-45' : ''}`}
        style={{ color: showMediaOptions ? 'red' : '#32CD32' }}
        onClick={() => setShowMediaOptions(!showMediaOptions)}
      >
        <FaPlus />
      </button>

      {!isRecording && !showPoll && (
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 rounded-l bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setShowMediaOptions(false)}
        />
      )}

      {!showPoll && (
        <MicRecorder
          audioUrl={audioUrl}
          setAudioUrl={setAudioUrl}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      )}

      {!isRecording && !showPoll && (
        <button className="ml-2 text-white" onClick={handleSend}>
          <FaPaperPlane />
        </button>
      )}

      {showMediaOptions && (
        <div ref={mediaOptionsRef} className="absolute left-0 bottom-full mb-2 bg-gray-700 text-white p-2 rounded shadow-lg w-48 z-10">
          <div className="flex flex-col">
            <button className="flex items-center p-2 hover:bg-gray-600 cursor-pointer" onClick={handleCameraAccess}>
              <FaCamera className="mr-2 text-blue-400" /> Camera
            </button>
            <label className="flex items-center p-2 hover:bg-gray-600 cursor-pointer">
  <FaImage className="mr-2 text-pink-400" />
  <input
    type="file"
    accept="image/*,video/*" // Accept both image and video files
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file); // Create a URL for the file
        if (file.type.startsWith('image/')) {
          onSendMessage({ image: fileUrl }); // Pass the URL if it's an image
        } else if (file.type.startsWith('video/')) {
          onSendMessage({ video: fileUrl }); // Pass the URL if it's a video
        }
        setShowMediaOptions(false);
      }
    }}
  />
  Image/Video
</label>
            <label className="flex items-center p-2 hover:bg-gray-600 cursor-pointer">
              <FaFileAlt className="mr-2 text-yellow-400" />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onSendMessage({ document: file });
                    setShowMediaOptions(false);
                  }
                }}
              />
              Document
            </label>
            <button
              className="flex items-center p-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => {
                setShowPoll(true);
                setShowMediaOptions(false);
              }}
            >
              <FaPoll className="mr-2 text-teal-400" /> Poll
            </button>
          </div>
        </div>
      )}

      {showPoll && (
        <div ref={pollRef}>
          <PollComponent onSubmit={handlePollSubmit} setShowPoll={setShowPoll} />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
