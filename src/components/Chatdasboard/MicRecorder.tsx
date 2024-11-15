// MicRecorder.tsx
"use client";
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js'; // Import Wavesurfer.js
import { FaMicrophone, FaStop, FaPlay, FaPause, FaTrash } from 'react-icons/fa'; // Import icons

const MicRecorder = ({ audioUrl, setAudioUrl }: any) => {
  const waveformRef = useRef<HTMLDivElement | null>(null); // Ref for waveform container
  const wavesurferRef = useRef<WaveSurfer | null>(null); // Ref for WaveSurfer instance
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // Ref for MediaRecorder
  const audioChunksRef = useRef<Blob[]>([]); // Ref to store audio chunks
  const [isRecording, setIsRecording] = React.useState(false); // State for recording status
  const [isPlaying, setIsPlaying] = React.useState(false); // State for playback status

  useEffect(() => {
    // Initialize WaveSurfer on mount
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy',
        height: 40, // Height for the waveform
        responsive: true,
      });
    }

    // Cleanup when unmounted
    return () => {
      wavesurferRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (audioUrl) {
      wavesurferRef.current?.load(audioUrl); // Load the audio URL into WaveSurfer when available
    }
  }, [audioUrl]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl); // Set the audio URL to play it later
      wavesurferRef.current?.loadBlob(audioBlob); // Load the blob to wavesurfer
      audioChunksRef.current = []; // Clear the chunks
      setIsPlaying(false); // Reset playing state when recording stops
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const togglePlay = () => {
    if (audioUrl) {
      if (isPlaying) {
        wavesurferRef.current?.pause(); // Pause the audio
      } else {
        wavesurferRef.current?.play(); // Play the audio
      }
      setIsPlaying(!isPlaying); // Toggle playing state
    }
  };

  const deleteAudio = () => {
    // Stop playing if audio is playing
    if (isPlaying) {
      wavesurferRef.current?.pause();
      setIsPlaying(false);
    }
    setAudioUrl(null); // Remove the audio URL
  };

  return (
    <div className="mb-4"> {/* Margin Bottom for spacing */}
      <div className="flex items-center mb-2">
        {/* Play Button */}
        {audioUrl && !isRecording && (
          <button
            onClick={togglePlay}
            className="p-2 rounded bg-blue-300 flex items-center justify-center mr-2 transition duration-300 hover:bg-blue-400" // Lighter background color with hover effect
          >
            {isPlaying ? (
              <FaPause className="text-white" /> // Pause icon
            ) : (
              <FaPlay className="text-white" /> // Play icon
            )}
          </button>
        )}
        {/* Waveform Container */}
        {audioUrl && !isRecording && ( // Only show when audio is available and not recording
          <div ref={waveformRef} className="bg-gray-700" style={{ width: '100%', height: '40px' }}></div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-2 rounded-full flex items-center justify-center transition duration-300 ${isRecording ? 'bg-red-500' : 'bg-green-700'} w-12 h-12`}
        >
          {isRecording ? (
            <FaStop className="text-white" />
          ) : (
            <FaMicrophone className="text-white" />
          )}
        </button>
        {isRecording && (
          <span className="ml-2 text-red-500">Recording...</span>
        )}

        {/* Delete Button */}
        {audioUrl && (
          <button
            onClick={deleteAudio}
            className="p-2 rounded-full flex items-center justify-center bg-red-500 w-12 h-12 ml-4 transition duration-300 hover:bg-red-600"
          >
            <FaTrash className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MicRecorder;
