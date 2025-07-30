import React, { useState, useEffect, useRef } from 'react';
import { Mic, Play, StopCircle } from 'lucide-react';

function VoiceAiPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Still useful for visual feedback
  const [userTranscript, setUserTranscript] = useState('');
  const [aiResponseText, setAiResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Still useful for "AI is thinking..."
  const [error, setError] = useState(''); // Still useful for displaying errors

  // Removed audioRef, mediaRecorderRef, audioChunksRef as they are for audio processing

  // Function to handle starting "recording" (UI only)
  const startRecordingUI = () => {
    setError('');
    setIsRecording(true);
    setUserTranscript('Listening...');
    setAiResponseText(''); // Clear previous AI response
    // Simulate a delay for "processing"
    setTimeout(() => {
      setIsRecording(false);
      setUserTranscript('You said: "This is a simulated user input."');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setAiResponseText('This is a simulated AI response.');
      }, 1500); // Simulate AI thinking time
    }, 2000); // Simulate recording time
  };

  // Function to handle stopping "recording" (UI only)
  const stopRecordingUI = () => {
    setIsRecording(false);
    setUserTranscript('Processing...');
    // The timeout in startRecordingUI will handle the rest of the flow
  };

  // Function to handle play/stop (UI only)
  const handlePlayStop = () => {
    if (aiResponseText) {
      setIsSpeaking(!isSpeaking); // Just toggle the speaking state for visual feedback
      // In a real app, this would trigger audio playback
    }
  };

  // Common button styling based on FeatureCard
  const commonButtonClasses = "group relative p-4 rounded-2xl h-24 w-24 sm:h-28 sm:w-28 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer flex items-center justify-center";
  const innerButtonBgClasses = "absolute inset-0 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl group-hover:bg-white/25 transition-colors duration-300";
  const iconClasses = "relative z-10 w-10 h-10 text-white/70 group-hover:text-white transition-colors duration-300";


  return (
    <div className='relative font-sans bg-[url("https://i.pinimg.com/736x/70/db/ce/70dbce51b26f600caf765a11be507543.jpg")] bg-cover bg-center min-h-screen w-full flex items-center justify-center p-4'>
      {/* The main content box, similar to the LlmBox style, but now within the new background */}
      <div className='flex flex-col w-full max-w-xl mx-auto h-[85vh] bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-6'>
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Voice AI Assistant</h1>

        {/* User Input Display Area */}
        <div className="flex-grow bg-white/10 rounded-lg p-4 mb-4 overflow-y-auto text-white text-lg leading-relaxed border border-white/20 shadow-inner">
          {userTranscript ? (
            <p className="text-gray-200">{userTranscript}</p>
          ) : (
            <p className="text-gray-400">Press the microphone to start speaking...</p>
          )}
        </div>

        {/* AI Response Display Area */}
        <div className="flex-grow bg-white/10 rounded-lg p-4 mb-6 overflow-y-auto text-white text-lg leading-relaxed border border-white/20 shadow-inner">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="ml-3 text-gray-300">AI is thinking...</p>
            </div>
          ) : aiResponseText ? (
            <p>{aiResponseText}</p>
          ) : (
            <p className="text-gray-400">AI response will appear here.</p>
          )}
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>

        {/* Microphone and Play/Stop Buttons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Microphone Button */}
          <button
            onClick={isRecording ? stopRecordingUI : startRecordingUI}
            className={`${commonButtonClasses} ${isRecording ? 'ring-4 ring-red-500/50' : ''}`} // Added ring for recording state
            disabled={isLoading}
          >
            <div className={innerButtonBgClasses}></div>
            <Mic className={iconClasses} />
            {isRecording && (
              <div className="absolute inset-0 rounded-2xl bg-red-500/50 animate-ping-slow"></div>
            )}
          </button>

          {/* Play/Stop Button */}
          <button
            onClick={handlePlayStop}
            className={`${commonButtonClasses} ${!aiResponseText || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!aiResponseText || isLoading}
          >
            <div className={innerButtonBgClasses}></div>
            {isSpeaking ? <StopCircle className={iconClasses} /> : <Play className={iconClasses} />}
          </button>
        </div>

        <p className="text-gray-400 text-sm text-center mt-auto">
          Powered by Gemini AI (Frontend Only)
        </p>
      </div>
    </div>
  );
}

export default VoiceAiPage;
