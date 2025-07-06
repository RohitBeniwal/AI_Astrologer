"use client";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./page.module.css";
import ApiInfo from "./components/ApiInfo";

const MODEL_OPTIONS = [
    { label: "Groq", value: "groq" }, // Add Groq option
    { label: "OpenRouter", value: "openrouter" },
  { label: "Gemini", value: "gemini" },
  

];

export default function Home() {
  const [messages, setMessages] = useState<{ text: string; from: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("groq");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((msgs) => [...msgs, { text: userMessage, from: "user" }]);
    setInput("");
    setLoading(true);
    
    // Keep focus on input field after sending message
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);

    // Choose API route based on selected model
    let apiRoute = "/api/gemini";
    if (model === "openrouter") apiRoute = "/api/openrouter";
    else if (model === "groq") apiRoute = "/api/groq";

    try {
      const res = await fetch(apiRoute, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { text: data.text, from: "bot" },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { text: "Sorry, something went wrong.", from: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>Cosmic Oracle</div>
        <div className={styles.messagesArea}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`${styles.messageRow} ${msg.from === "user" ? styles.user : ""}`}
            >
              <span className={styles.messageBubble}>
                {msg.from === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </span>
            </div>
          ))}
          {loading && (
            <div className={styles.messageRow}>
              <span className={styles.messageBubble}>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form className={styles.inputArea} onSubmit={handleSend}>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{
              borderRadius: 8,
              padding: "8px 12px",
              border: "1px solid #ccc",
              fontSize: 16,
              marginRight: 8,
              background: "#232a36",
              color: "#fff",
            }}
            disabled={loading}
            title="Select your preferred cosmic channel"
          >
            {MODEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} {opt.value === 'groq' ? '✨' : opt.value === 'openrouter' ? '🌌' : '🔮'}
              </option>
            ))}
          </select>
          <input
            className={styles.inputBox}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the stars about your destiny..."
            disabled={loading}
            ref={inputRef}
            autoFocus
          />
          <button className={styles.sendButton} type="submit" disabled={loading}>
            Send
          </button>
        </form>
        <ApiInfo />
      </div>
    </div>
  );
}