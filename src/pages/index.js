import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: query }]);

    // Call backend
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    // Add bot response
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply || data.error || "No reply" },
    ]);

    setQuery("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>

      {/* Chat window */}
      <div className="border rounded p-4 h-96 overflow-y-auto bg-gray-50 mb-4 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.role === "user"
                ? "bg-blue-100 text-blue-900 self-end text-right"
                : "bg-green-100 text-green-900 self-start text-left"
            }`}
          >
            <strong>{m.role === "user" ? "You" : "Bot"}:</strong> <br />
            <pre className="whitespace-pre-wrap">{m.content}</pre>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border flex-1 p-2 rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
