import React, { useState, useRef, useEffect } from 'react';

type CustomAudioPlayerProps = {
  src: string; // Audio source URL
};

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle Play/Pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update current time and progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setProgress((audioRef.current.currentTime / duration) * 100);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Set audio duration on load
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle progress bar click to seek
  const handleSeek = (event: React.MouseEvent) => {
    if (audioRef.current) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = (clickX / rect.width) * 100;
      audioRef.current.currentTime = (percentage / 100) * duration;
      setProgress(percentage);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg shadow-md w-full max-w-xs">
      {/* Play/Pause Button */}
      <button onClick={togglePlayPause} className="p-2 bg-green-500 rounded-full">
        {isPlaying ? (
          // Pause icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zM10 6h2v12h-2z" />
          </svg>
        ) : (
          // Play icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Progress Bar */}
      <div className="flex-1 relative cursor-pointer" onClick={handleSeek}>
        <div className="bg-gray-600 h-2 rounded-full">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div
          className="absolute top-0 left-0 text-xs text-gray-400"
          style={{ left: `${progress}%` }}
        >
          {Math.floor(currentTime)}s
        </div>
      </div>

      {/* Audio Duration */}
      <div className="text-xs text-gray-400">{Math.floor(duration)}s</div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={src} onLoadedMetadata={handleLoadedMetadata} />
    </div>
  );
};

export default CustomAudioPlayer;
