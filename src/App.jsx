import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
const BASE_URL = "https://travel-agent-kecc.onrender.com";
// const BASE_URL = "http://localhost:3002";

// 3D Model Viewer Component

// Fallback component when model is loading or errors
function ModelFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#2ea043" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <ambientLight intensity={0.5} />
    </mesh>
  );
}

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingEnabled, setSpeakingEnabled] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState("");
  const [assistantMessageLoading, setAssistantMessageLoading] = useState(false);

  // Thread-related state
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [newThreadStarted, setNewThreadStarted] = useState(false);

  const chatAreaRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, currentAssistantMessage]);

  // Load threads on initial mount
  useEffect(() => {
    fetchThreads();
  }, []);

  // Fetch all conversation threads
  const fetchThreads = async () => {
    try {
      const response = await fetch(`${BASE_URL}/threads`);
      if (response.ok) {
        const data = await response.json();
        setThreads(data.threads || []);
      } else {
        console.error("Failed to fetch threads");
      }
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  // Load a specific thread's messages
  const loadThread = async (threadId) => {
    setActiveThreadId(threadId);
    setMessages([]);
    setCurrentAssistantMessage("");
    setAssistantMessageLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          // Format messages to match our app's structure
          const formattedMessages = data.messages.map((msg) => ({
            ...msg,
            text: msg.content,
            sender: msg.role === "user" ? "user" : "assistant",
          }));
          setMessages(formattedMessages);
        }
      } else {
        console.error("Failed to load thread messages");
      }
    } catch (error) {
      console.error("Error loading thread:", error);
    } finally {
      setAssistantMessageLoading(false);
      setNewThreadStarted(false);
    }
  };

  // Create a new thread
  const startNewThread = () => {
    setActiveThreadId(null);
    setMessages([]);
    setCurrentAssistantMessage("");
    setNewThreadStarted(true);
    setSidebarVisible(false);
  };

  // Initialize speech synthesis
  useEffect(() => {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech when component mounts
    return () => {
      window.speechSynthesis.cancel(); // Cleanup on unmount
    };
  }, []);

  // Load voices asynchronously
  useEffect(() => {
    const loadVoices = () => {
      // Voices might not be available immediately
      if (typeof window !== "undefined" && window.speechSynthesis) {
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = handleVoicesChanged;
        }
        handleVoicesChanged();
      }
    };

    const handleVoicesChanged = () => {
      // Log available voices for debugging
      const voices = window.speechSynthesis.getVoices();
      console.log(
        "Available voices:",
        voices.map((v) => `${v.name} (${v.lang})`)
      );
    };

    loadVoices();
  }, []);

  const speakMessage = (text) => {
    // Don't speak if speaking is disabled
    if (!speakingEnabled || !text || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create new speech utterance - browser
    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice settings
    utterance.rate = 1.0; // Speed
    utterance.pitch = 1.1; // Slightly higher pitch for female voice
    utterance.volume = 1.0; // Volume

    // Get available voices and set to a female English voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoices = voices.filter(
      (voice) =>
        voice.name.includes("female") ||
        voice.name.includes("Samantha") ||
        voice.name.includes("Victoria") ||
        voice.name.includes("Karen") ||
        voice.name.includes("Moira") ||
        voice.name.includes("Tessa") ||
        voice.name.includes("Heera")
    );

    if (femaleVoices.length > 0) {
      utterance.voice = femaleVoices[0];
    } else {
      // Fallback to any English voice with higher pitch
      const englishVoices = voices.filter((voice) =>
        voice.lang.startsWith("en-")
      );
      if (englishVoices.length > 0) {
        utterance.voice = englishVoices[0];
      }
    }
    console.log("Selected voice:", utterance.voice);

    // Add event listeners
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      setIsSpeaking(false);
    };

    // Speak the message
    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Failed to speak:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || assistantMessageLoading) {
      return;
    }

    const userMessage = inputMessage.trim();

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      {
        text: userMessage,
        sender: "user",
        timestamp: new Date().toString(),
      },
    ]);
    setInputMessage("");
    setAssistantMessageLoading(true);
    setCurrentAssistantMessage("");

    try {
      const thread_id = activeThreadId;
      // Direct passthrough of the user's message to the LLM
      const response = await fetch(`${BASE_URL}/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage,
          threadId: thread_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Use a TextDecoder to properly handle UTF-8 text
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Response body isn't readable");
      }

      let accumulatedMessage = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Decode the chunk and process as SSE format
        const chunk = decoder.decode(value, { stream: true });

        // Process each line in the chunk
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const dataContent = line.substring(5).trim();

            // Check if it's the end marker
            if (dataContent === "[DONE]") {
              break;
            }

            try {
              // Parse the JSON content
              const jsonData = JSON.parse(dataContent);

              // Check for threadId in the first message
              if (jsonData.threadId && !activeThreadId) {
                setActiveThreadId(jsonData.threadId);
                setNewThreadStarted(false);
                // Update the threads list
                fetchThreads();
              }

              if (jsonData.text) {
                // Add to accumulated message
                accumulatedMessage += jsonData.text;
                setCurrentAssistantMessage(accumulatedMessage);
              }
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          }
        }
      }

      // Add the complete assistant message to the messages array
      if (accumulatedMessage) {
        setMessages((prev) => [
          ...prev,
          {
            text: accumulatedMessage,
            sender: "assistant",
            timestamp: new Date().toString(),
          },
        ]);
        speakMessage(accumulatedMessage); // Speak the AI response
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      const errorMessage =
        "Sorry, there was an error connecting to the assistant.";
      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          sender: "assistant",
          timestamp: new Date().toString(),
        },
      ]);
      speakMessage(errorMessage);
    } finally {
      setCurrentAssistantMessage("");
      setAssistantMessageLoading(false);
    }
  };

  // Format relative date for thread display
  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  // Format thread title from first message or date
  const getThreadTitle = (thread) => {
    if (thread.title) return thread.title;
    if (thread.firstMessage) {
      // Truncate long messages
      return thread.firstMessage.length > 30
        ? thread.firstMessage.substring(0, 30) + "..."
        : thread.firstMessage;
    }
    return `Chat ${formatRelativeDate(thread.createdAt)}`;
  };

  return (
    <div className="h-screen w-screen flex bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
      {/* Sidebar */}
      <div
        className={`w-[280px] bg-[#111111]/70 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } absolute left-0 top-0 h-full z-20`}
      >
        {/* App Logo */}
        <div className="px-6 h-16 flex items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2ea043] to-[#34d399] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </div>
            <span className="font-semibold text-white">AI Travel Agent</span>
          </div>
        </div>

        {/* Conversation Threads */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            <div className="text-gray-400 text-xs font-medium uppercase mb-3 px-3">
              CONVERSATIONS
            </div>

            {threads.length === 0 && (
              <div className="text-gray-500 text-sm px-3 py-2">
                No conversations yet
              </div>
            )}

            {threads.map((thread) => (
              <button
                key={thread.threadId}
                onClick={() => loadThread(thread.threadId)}
                className={`w-full flex items-start gap-3 px-4 py-2.5 rounded-xl text-left ${
                  activeThreadId === thread.threadId
                    ? "bg-[#2ea043]/10 text-[#2ea043]"
                    : "text-gray-300 hover:bg-white/5"
                } transition-colors duration-200`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {getThreadTitle(thread)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatRelativeDate(thread.updatedAt || thread.createdAt)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={startNewThread}
            className="w-full bg-gradient-to-r from-[#2ea043] to-[#34d399] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New thread
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarVisible(!sidebarVisible)}
        className="absolute top-4 left-4 z-30 w-10 h-10 rounded-lg bg-gradient-to-br from-[#2ea043] to-[#34d399] flex items-center justify-center shadow-lg shadow-[#2ea043]/20 hover:brightness-110 transition-all duration-200 group"
      >
        <div className="relative w-5 h-4 flex flex-col justify-between transition-all duration-300">
          <span
            className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${
              sidebarVisible ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white rounded-full transition-opacity duration-300 ${
              sidebarVisible ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${
              sidebarVisible ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </div>
        <div className="absolute -right-2 -bottom-2 w-5 h-5 bg-[#111111]/70 backdrop-blur-xl opacity-0 group-hover:opacity-100 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 text-[9px] text-white overflow-hidden">
          <div
            className={`transition-all duration-300 ${
              sidebarVisible ? "translate-y-0" : "translate-y-5"
            }`}
          >
            ×
          </div>
          <div
            className={`absolute transition-all duration-300 ${
              sidebarVisible ? "translate-y-5" : "translate-y-0"
            }`}
          >
            ≡
          </div>
        </div>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Area - Restructured layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-full">
          {/* 3D Model Display - Left Side */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#0a0a0a] border-r border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2ea043]/5 via-transparent to-[#34d399]/5"></div>
            {/* Ambient glow effects */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#2ea043]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#34d399]/20 rounded-full blur-3xl"></div>
            <div className="relative h-full w-full">
              <Canvas camera={{ position: [0, -2, 6], fov: 24 }}>
                {/* Base ambient light - increased intensity */}
                <ambientLight intensity={0.8} color="#ffffff" />

                {/* Main key light - increased intensity and adjusted position */}
                <spotLight
                  position={[3, 3, 5]}
                  angle={0.4}
                  penumbra={0.5}
                  intensity={3}
                  color="#ffffff"
                  castShadow
                />

                {/* Fill light - increased intensity */}
                <spotLight
                  position={[-3, 1, 3]}
                  angle={0.5}
                  penumbra={0.5}
                  intensity={2}
                  color="#34d399"
                  castShadow
                />

                {/* Rim light - increased intensity */}
                <spotLight
                  position={[0, 3, -5]}
                  angle={0.5}
                  penumbra={0.5}
                  intensity={1.8}
                  color="#2ea043"
                  castShadow
                />

                {/* Bottom fill light - increased intensity */}
                <pointLight
                  position={[0, -3, 2]}
                  intensity={1.2}
                  color="#ffffff"
                />

                {/* Accent lights - increased intensity */}
                <pointLight
                  position={[3, 0, 2]}
                  intensity={1.2}
                  color="#2ea043"
                />
                <pointLight
                  position={[-3, 0, 2]}
                  intensity={1.2}
                  color="#34d399"
                />

                {/* Additional front fill light - increased intensity and moved forward */}
                <spotLight
                  position={[0, 0, 10]}
                  angle={0.6}
                  penumbra={0.5}
                  intensity={1.5}
                  color="#ffffff"
                />

                {/* Additional top fill light - increased intensity */}
                <pointLight
                  position={[0, 5, 0]}
                  intensity={1.4}
                  color="#ffffff"
                />

                {/* New: Direct front light for better face illumination */}
                <spotLight
                  position={[0, 1, 8]}
                  angle={0.3}
                  penumbra={0.2}
                  intensity={2.5}
                  color="#ffffff"
                  castShadow
                />

                {/* New: Soft fill light from below for eliminating dark shadows */}
                <pointLight
                  position={[0, -2, 4]}
                  intensity={1}
                  color="#ffffff"
                />

                {/* Wrap the Model component in Suspense to handle loading */}
                <Suspense fallback={<ModelFallback />}>
                  <Model isSpeaking={isSpeaking} />
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={false}
                  minDistance={4.8}
                  maxDistance={4.8}
                />
              </Canvas>

              {/* Zira Name Label */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center">
                <div className="relative">
                  {/* Animated background glow */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2ea043]/40 to-[#34d399]/40 rounded-full blur-lg transform scale-110 animate-pulse"></div>

                  {/* Name badge */}
                  <div className="px-6 py-2 bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3 shadow-lg shadow-[#2ea043]/20">
                    {/* Dot indicator */}
                    <div className="w-2 h-2 rounded-full bg-[#2ea043] animate-pulse"></div>

                    {/* Name with gradient */}
                    <span className="text-xl font-semibold bg-gradient-to-r from-[#2ea043] to-[#34d399] bg-clip-text text-transparent tracking-wide">
                      Zira
                    </span>

                    {/* Optional subtitle */}
                    <span className="text-xs text-gray-400 opacity-80">
                      AI Travel Guide
                    </span>
                  </div>

                  {/* Decorative line elements */}
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent to-[#2ea043]/50"></div>
                  <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gradient-to-l from-transparent to-[#34d399]/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages - Right Side */}
          <div className="w-full md:w-1/2 flex flex-col h-full">
            <div
              ref={chatAreaRef}
              className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-4"
            >
              <div className="max-w-2xl mx-auto">
                {/* Mobile Welcome Section */}
                <div className="md:hidden text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-[#2ea043] to-[#34d399] bg-clip-text text-transparent">
                    Chat with Me
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Ask me anything about travel planning
                  </p>
                </div>

                {/* Desktop Welcome - Hidden on Mobile */}
                <div className="hidden md:block text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-[#2ea043] to-[#34d399] bg-clip-text text-transparent">
                    Chat with me
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Ask me anything about travel planning
                  </p>
                </div>

                {/* Messages */}
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-[#2ea043] to-[#34d399] text-white"
                            : "bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300"
                        }`}
                      >
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                          {message.text}
                        </p>
                        <p
                          className={`text-xs mt-2 ${
                            message.sender === "user"
                              ? "text-white/70"
                              : "text-gray-500"
                          }`}
                        >
                          {formatRelativeDate(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Streaming message display */}
                  {currentAssistantMessage && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl px-5 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300">
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                          {currentAssistantMessage}
                        </p>
                        <p className="text-xs mt-2 text-gray-500">
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  {assistantMessageLoading && !currentAssistantMessage && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3.5">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#111111]/70 backdrop-blur-xl border-t border-white/5 sticky bottom-0 left-0 right-0 z-10">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full bg-white/5 text-gray-300 rounded-xl pl-5 pr-28 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#2ea043]/50 transition-all duration-200"
                    onKeyPress={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSendMessage()
                    }
                  />

                  {/* Speaking Toggle Button */}
                  <button
                    onClick={() => {
                      if (
                        typeof window !== undefined &&
                        window.speechSynthesis
                      ) {
                        if (speakingEnabled) {
                          window.speechSynthesis.cancel();
                        }
                      }
                      setSpeakingEnabled(!speakingEnabled);
                    }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full text-white transition-all duration-200 group overflow-hidden"
                    title={
                      speakingEnabled ? "Disable speaking" : "Enable speaking"
                    }
                  >
                    <div
                      className={`absolute inset-0 ${
                        speakingEnabled
                          ? "bg-gradient-to-r from-[#2ea043]/80 to-[#34d399]/80"
                          : "bg-black"
                      } rounded-full`}
                    ></div>

                    {/* Audio Waveform Icon */}
                    <div className="relative z-10 w-5 h-5 flex items-center justify-center">
                      {/* Center dot */}
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>

                      {/* Sound waves - conditional rendering based on enabled state */}
                      {speakingEnabled && (
                        <>
                          {/* Inner wave */}
                          <div
                            className="absolute inset-0 border border-white rounded-full animate-ping opacity-30"
                            style={{ animationDuration: "1.5s" }}
                          ></div>

                          {/* Middle wave */}
                          <div
                            className="absolute w-full h-full border border-white rounded-full animate-ping opacity-20"
                            style={{
                              animationDuration: "2s",
                              animationDelay: "0.3s",
                            }}
                          ></div>

                          {/* Outer wave */}
                          <div
                            className="absolute w-full h-full border border-white rounded-full animate-ping opacity-10"
                            style={{
                              animationDuration: "2.5s",
                              animationDelay: "0.6s",
                            }}
                          ></div>
                        </>
                      )}
                    </div>

                    {/* Crossed line for disabled state */}
                    <div
                      className={`absolute top-1/2 left-0 w-full h-0.5 bg-white/90 rotate-45 transform transition-opacity duration-300 ${
                        speakingEnabled ? "opacity-0" : "opacity-100"
                      }`}
                    ></div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200"></div>
                  </button>

                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-[#2ea043] to-[#34d399] rounded-lg text-white disabled:opacity-50 hover:opacity-90 transition-opacity duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
