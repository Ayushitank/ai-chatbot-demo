import { useState } from "react";

export default function Chat() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const sendMessage = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;

		// Add user message to state
		const newMessage = { role: "user", content: input };
		setMessages([...messages, newMessage]);
		setInput("");
		setLoading(true);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query: newMessage.content }),
			});

			const data = await res.json();
			const botMessage = { role: "assistant", content: data.response || data.error || "No response" };

			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			console.error("Chat error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-gray-50">
			<h1 className="text-2xl font-bold mb-4 text-center text-blue-600">💬 my assistant</h1>
			<p className="text-sm text-gray-600 text-center mb-4">Ask me about our services, portfolio, or how we can help your business!</p>

			{/* Chat window */}
			<div className="flex-1 overflow-y-auto p-4 space-y-3 border rounded bg-white shadow">
				{messages.map((msg, idx) => (
					<div
						key={idx}
						className={`p-3 rounded-lg max-w-[75%] ${
							msg.role === "user"
								? "ml-auto bg-blue-500 text-white"
								: "mr-auto bg-gray-200 text-gray-900"
						}`}
					>
						{msg.content}
					</div>
				))}

				{loading && (
					<div className="mr-auto bg-blue-100 text-blue-700 px-3 py-2 rounded-lg animate-pulse">
						Redlio Designs is thinking...
					</div>
				)}
			</div>

			{/* Input */}
			<form onSubmit={sendMessage} className="mt-4 flex">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Ask about Redlio Designs services, portfolio, or how we can help..."
					className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
				/>
				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
				>
					Send
				</button>
			</form>
		</div>
	);
}


