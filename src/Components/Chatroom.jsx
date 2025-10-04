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

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

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
    <div className="flex flex-col w-10/12 mx-auto h-screen relative">
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 bg-gray-50 relative"
      >
        {showWelcome && messages.length === 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 font-bold text-xl bg-blue-200 p-5 rounded-3xl">
            ✨ What's on your mind today? Ask me anything!
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-xl shadow-sm max-w-[70%] whitespace-pre-line ${
                msg.role === "user" ? "bg-blue-100" : "bg-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="mb-4 flex justify-start">
            <div className="px-4 py-3 rounded-xl shadow-sm bg-white">
              ✨ Gemini is thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {showScrollBtn === "bottom" && (
        <button
          onClick={scrollToBottom}
          className="absolute left-1/2 bottom-30 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          ↓
        </button>
      )}
      {showScrollBtn === "top" && (
        <button
          onClick={scrollToTop}
          className="absolute left-1/2 bottom-30 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          ↑
        </button>
      )}

      <div className="flex items-center mb-10 p-4 border-t border-gray-300 bg-white">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask Gemini..."
          disabled={loading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-100"
          onKeyDown={(e) =>
            e.key === "Enter" && !loading && getPreciseResponse()
          }
        />
        <button
          onClick={getPreciseResponse}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${
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
