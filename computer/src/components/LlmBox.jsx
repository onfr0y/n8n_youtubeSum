import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';

// This component now represents the entire chat interface.
function LlmBox() {
  // State for the conversation history
  const [history, setHistory] = useState([
    {
      role: 'model',
      parts: "Hey , what do you want to learn today?",
    },
    {
        role: 'model',
        parts: "Give me some of the video that i will help you to summarize.    !"
    }
  ]);

  // State for the user's current message
  const [newMessage, setNewMessage] = useState('');
  // State to track if the AI is currently generating a response
  const [loading, setLoading] = useState(false);
  // Ref for the chat container to enable auto-scrolling
  const chatContainerRef = useRef(null);

  // Automatically scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history, loading]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Don't send empty messages

    setLoading(true);
    const userMessage = { role: 'user', parts: newMessage };
    const updatedHistory = [...history, userMessage];
    setHistory(updatedHistory);
    setNewMessage(''); // Clear the input field

    // Instead of calling a backend, just echo the user's message as the model's response
    setTimeout(() => {
      const aiMessage = { role: 'model', parts: `Echo: ${userMessage.parts}` };
      setHistory(prevHistory => [...prevHistory, aiMessage]);
      setLoading(false);
    }, 700);
  };

  return (
    // Main container with glassmorphism effect
    <div className='flex flex-col w-full max-w-md h-[85vh] bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg overflow-hidden'>

      {/* Chat messages container */}
      <div ref={chatContainerRef} className="flex-grow p-6 overflow-y-auto space-y-4">
        {history.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${message.role === 'user' ? 'bg-blue-500/50 text-white' : 'bg-white/20 text-white'}`}>
              <p className="text-sm">{message.parts}</p>
            </div>
          </div>
        ))}
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
             <div className="px-4 py-2 rounded-lg bg-white/20 text-white">
                <LoaderCircle className="animate-spin" size={20} />
             </div>
          </div>
        )}
      </div>

      {/* Input form area */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-black/30 backdrop-blur-lg p-2 rounded-xl border border-white/20">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask LLM"
            className="flex-grow bg-transparent text-white placeholder-gray-300 focus:outline-none px-2"
            disabled={loading}
          />
          <button type="submit" className="bg-white/20 p-2 rounded-lg disabled:opacity-50" disabled={loading}>
            <ArrowRight size={20} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}


export default LlmBox;