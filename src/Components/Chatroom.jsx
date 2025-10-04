import groq from "../utils/groqAi";
import React, { useRef, useState, useEffect } from "react";

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const inputRef = useRef();
  const chatContainerRef = useRef();
  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const nearTop = scrollTop < 50;
    const nearBottom = scrollTop + clientHeight > scrollHeight - 50;

    if (nearTop) setShowScrollBtn("bottom");
    else if (nearBottom) setShowScrollBtn("top");
    else setShowScrollBtn("bottom");
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPreciseResponse = async () => {
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    if (showWelcome) setShowWelcome(false);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    inputRef.current.value = "";
    setLoading(true);

    const prompt =
      "You are a highly intelligent assistant like Gemini/Groq. " +
      "Answer the following query dynamically and precisely. " +
      "Format the response so it is visually appealing, clear, and easy to read. " +
      "Use proper spacing, bullet points, numbering, or short paragraphs where appropriate. " +
      "Do NOT use raw tables, markdown code blocks, or unnecessary explanations. " +
      "Query: " +
      userMessage;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "openai/gpt-oss-20b",
      });

      const botReply =
        chatCompletion.choices[0]?.message?.content || "No response";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error fetching response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto h-[90vh] bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 relative"
      >
        {/* Welcome Message */}
        {showWelcome && messages.length === 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-600 font-medium text-sm sm:text-base bg-blue-100 px-6 py-4 rounded-2xl shadow-sm w-[90%] sm:w-auto">
            ✨ What's on your mind today? Ask me anything!
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-xl shadow-sm max-w-[85%] sm:max-w-[70%] whitespace-pre-line text-sm sm:text-base ${
                msg.role === "user"
                  ? "bg-blue-100 text-gray-800"
                  : "bg-white text-gray-700"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="mb-4 flex justify-start">
            <div className="px-4 py-3 rounded-xl shadow-sm bg-white text-gray-500 text-sm sm:text-base">
              ✨ Gemini is thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Scroll Buttons */}
      {showScrollBtn && (
        <button
          onClick={
            showScrollBtn === "bottom" ? scrollToBottom : scrollToTop
          }
          className="fixed bottom-24 sm:bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          {showScrollBtn === "bottom" ? "↓" : "↑"}
        </button>
      )}

      {/* Input Section */}
      <div className="flex items-center p-3 sm:p-4 border-t border-gray-300 bg-white">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask Gemini..."
          disabled={loading}
          className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100 text-sm sm:text-base"
          onKeyDown={(e) =>
            e.key === "Enter" && !loading && getPreciseResponse()
          }
        />
        <button
          onClick={getPreciseResponse}
          disabled={loading}
          className={`px-4 sm:px-6 py-2 rounded-lg text-white font-medium text-sm sm:text-base transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatroom;
