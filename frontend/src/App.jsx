import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [query, setQuery] = useState(""); // State for user input
  const [messages, setMessages] = useState([]); // State to store conversation history
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const messagesEndRef = useRef(null); // Reference to scroll to the latest message

  // Function to handle user input and fetch response from API
  const handleSearch = async () => {
    if (!query.trim() || isLoading) return; // Prevent empty queries and multiple calls

    setIsLoading(true);

    try {
      // const response = await fetch(`http://localhost:3001/query?q=${query}`);
      const response = await fetch(
        `https://cdp-chatbot-x0h0.onrender.com/query?q=${query}`
      );
      const data = await response.json();

      // Update messages state with user query and AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        { query, summary: data.summary, sources: data.sources },
      ]);

      setQuery(""); // Clear input field after sending query
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to the latest message when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="app-container">
      <div className="chatbot-container">
        <div className="messages-container">
          <div>CDP ChatBot</div>
          {/* Display initial message when chat is empty */}
          {messages.length === 0 && (
            <div className="initial-message">
              <strong>AI:</strong> Hi! How can I assist you today?
            </div>
          )}
          {/* Render chat messages dynamically */}
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <div className="user-message">
                <strong>You:</strong> {msg.query}
              </div>
              <div className="ai-message">
                <strong>AI:</strong>
                <ReactMarkdown>{msg.summary}</ReactMarkdown>
              </div>
              {/* Display sources if available */}
              <div className="sources">
                <strong>Sources:</strong>
                <ul>
                  {msg.sources.map((source, i) => (
                    <li key={i}>
                      <a
                        href={source.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Auto-scroll anchor */}
        </div>

        {/* Input field and send button */}
        <div className="input-container">
          <input
            type="text"
            className="query-input"
            placeholder="Ask me anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            disabled={isLoading} // Disable input when request is in progress
          />
          <button
            className="send-button"
            onClick={handleSearch}
            disabled={isLoading} // Disable button when request is in progress
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
