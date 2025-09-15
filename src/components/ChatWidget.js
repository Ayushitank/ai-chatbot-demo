import { useEffect, useMemo, useRef, useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("chat_widget_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(parsed.messages || []);
        setIsOpen(parsed.isOpen ?? false);
      } else {
        setIsOpen(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "chat_widget_state",
        JSON.stringify({ isOpen, messages })
      );
    } catch {}
  }, [isOpen, messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const placeholder = useMemo(
    () => "Ask about services, portfolio, pricing, or how we can help…",
    []
  );

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setError("");

    const userMsg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMsg.content,
          siteUrl: window?.location?.origin,
          messages: [...messages, userMsg], // ✅ send full chat history
        }),
      });

      const data = await res.json();
      const full = data.response || data.error || "No response";

      await simulateStreaming(full, (chunk) => {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "assistant" && last.streaming) {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: (last.content || "") + chunk,
              streaming: true,
            };
            return updated;
          }
          return [...prev, { role: "assistant", content: chunk, streaming: true }];
        });
      });

      // finalize
      setMessages((prev) => {
        const updated = [...prev];
        if (updated.length && updated[updated.length - 1].streaming) {
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content,
          };
        }
        return updated;
      });
    } catch (err) {
      setError("Unable to send message. Please try again.");
    } finally {
      setLoading(false);
      setIsStreaming(false);
    }
  };

  async function simulateStreaming(text, onChunk) {
    const chunks = text.split("");
    for (const c of chunks) {
      await new Promise((r) => setTimeout(r, 8));
      onChunk(c);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 60 }}>
      {isOpen && (
        <div
          style={{
            width: 360,
            height: 520,
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
            borderRadius: 16,
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  background: "#10b981",
                }}
              />
              <span style={{ fontWeight: 700 }}>Chat with us</span>
            </div>
            <button
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              style={{
                appearance: "none",
                background: "transparent",
                border: 0,
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ×
            </button>
          </div>

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              background: "#fafafa",
            }}
          >
            {messages.length === 0 && (
              <div style={{ color: "#6b7280", fontSize: 14 }}>
                Ask anything about our services, pricing, timeline, or how to
                start.
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "80%",
                  marginBottom: 10,
                  padding: "10px 12px",
                  borderRadius: 12,
                  whiteSpace: "pre-wrap",
                  background: m.role === "user" ? "#2563eb" : "#e5e7eb",
                  color: m.role === "user" ? "#ffffff" : "#111827",
                  marginLeft: m.role === "user" ? "auto" : 0,
                  marginRight: m.role === "user" ? 0 : "auto",
                }}
              >
                {m.content}
              </div>
            ))}
            {(loading || isStreaming) && (
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: "#dbeafe",
                  color: "#1e40af",
                }}
              >
                Thinking…
              </div>
            )}
            {error && (
              <div style={{ color: "#b91c1c", fontSize: 12 }}>{error}</div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            style={{
              display: "flex",
              gap: 8,
              padding: 12,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#111827",
                color: "#ffffff",
                padding: "10px 14px",
                borderRadius: 8,
                border: 0,
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          aria-label="Open chat"
          onClick={() => setIsOpen(true)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 9999,
            background: "#111827",
            color: "#ffffff",
            border: 0,
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
            cursor: "pointer",
          }}
        >
          💬
        </button>
      )}
    </div>
  );
}
