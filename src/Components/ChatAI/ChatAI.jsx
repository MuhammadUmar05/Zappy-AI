import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";

function ChatAI() {
  const [messages, setMessages] = useState(
    () => JSON.parse(localStorage.getItem("chatMessages")) || []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, type: "sent" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const responseText = await askGemini(input);
      const botMessage = { text: marked.parse(responseText), type: "received" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: "Error fetching response",
        type: "received",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  async function askGemini(userMessage) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: userMessage,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI"
      );
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      throw error;
    }
  }

  return (
    <section className="flex flex-col items-center h-[92vh] w-full text-dark_primary dark:text-light_primary">
      <h1 className="text-center font-extrabold text-2xl md:pt-4 pt-1 ">
        Chat with AI
      </h1>
      <div className="md:w-3/5 w-full md:px-3 py-3 px-2 flex flex-col flex-1 h-full overflow-hidden">
        <div
          ref={chatBoxRef}
          className="w-full flex flex-col flex-1 overflow-y-auto chat-box"
        >
          {messages.length == 0 && (
            <p className="text-lg text-center pt-32">
              How can I help you today?
            </p>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.type}`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            ></div>
          ))}
          {loading && (
            <div className="message received flex items-center gap-3">
              Generating response
              <div className="animate-spin w-3 h-3 rounded-full border-white border-2 border-t-transparent"></div>
            </div>
          )}
        </div>

        <div className="border-t pt-3">
          <div className="flex gap-1 bg-light_secondary dark:bg-dark_secondary py-2 md:px-6 px-3 rounded-xl ">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="flex-1 bg-transparent border-none outline-none md:placeholder:text-base placeholder:text-sm overflow-y-auto"
              placeholder="Ask a question or say something..."
            />
            <button
              onClick={sendMessage}
              className="bg-primary md:px-5 px-2 py-1 rounded-xl text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatAI;
