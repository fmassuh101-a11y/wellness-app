"use client";
import React, { useState, useRef, useEffect } from "react";

// Preguntas sugeridas
const suggestedQuestions = [
  "What is a hackathon?",
  "How can I reduce stress?",
  "Recommend me a productivity book",
  "What is an API?",
  "How to win a hackathon?",
  "Give me a study tip",
  "What is GitHub?",
  "Show me a useful keyboard shortcut",
  "What playlist do you recommend for coding?",
  "Tell me a joke"
];

// Respuestas predefinidas (¡asegúrate de que las preguntas y llaves estén en minúsculas!)
const botResponses: { [key: string]: string | string[] } = {
  "hello": "Hello! I'm your virtual assistant. How can I help you today? You can ask me about hackathons, wellness, programming, study tips, and much more.",
  "what is a hackathon?": [
    "A hackathon is an event, typically lasting between 24 and 72 hours, where programmers, designers, and other innovators come together to collaborate intensively on software or hardware projects.",
    "Key points about hackathons:",
    "- 💡 Participants form teams to brainstorm, design, and build a functional prototype or solution.",
    "- 🏆 Prizes are often awarded for the best projects in categories such as innovation, usability, impact, or technical complexity.",
    "- 🤝 Hackathons foster creativity, learning, networking, and teamwork.",
    "- 🌎 Many hackathons are open to people of all skill levels, from beginners to experts, and are a great way to learn new technologies.",
    "- 📝 At the end, teams typically present their projects to judges and the community.",
    "- 🧑‍💻 It's not just about coding! You can also participate as a designer, project manager, or storyteller.",
    "- 🥪 Food, swag, and a fun, collaborative environment are common perks.",
    "- 🚀 Hackathons are hosted by universities, companies, and organizations around the world, both in-person and online.",
    "- Why join a hackathon? To learn, make friends, build your portfolio, network with industry professionals, and possibly even launch a real product!",
    "",
    "If you want tips on how to win a hackathon, ideas for projects, or want to know more about the schedule, just ask me!"
  ],
  "how can i reduce stress?": [
    "Here are some tips to reduce stress:",
    "- Take deep breaths and try simple breathing exercises.",
    "- Go for a walk or do some light physical activity.",
    "- Listen to relaxing music or meditate for a few minutes.",
    "- Talk to a friend or write your thoughts in a journal.",
    "- Remember: Break big tasks into smaller steps.",
    "Would you like to try a guided breathing exercise?"
  ],
  "recommend me a productivity book": "I suggest 'Deep Work' by Cal Newport for productivity, or 'Atomic Habits' by James Clear to improve your habits.",
  "what is an api?": "An API (Application Programming Interface) is a set of rules that allows different programs to communicate with each other.",
  "how to win a hackathon?": [
    "Here are some tips on how to win a hackathon:",
    "- Form a diverse team with complementary skills (coding, design, pitching, etc).",
    "- Brainstorm ideas that are innovative but feasible within the time limit.",
    "- Define clear roles and plan your work (divide and conquer!).",
    "- Focus on building a working prototype or demo.",
    "- Communicate frequently and help each other out.",
    "- Prepare a strong pitch: explain the problem, your solution, and its impact.",
    "- Don’t neglect the presentation! A live demo, clear slides, and confident delivery can make a big difference.",
    "- Most importantly, have fun and be open to learning.",
    "",
    "If you want project ideas or more advice, just ask!"
  ],
  "give me a study tip": "Take short breaks every 25 minutes (Pomodoro technique), study in blocks, use mind maps, and don't hesitate to ask questions. Consistency is key!",
  "what is github?": "GitHub is a collaborative development platform where you can host, version, and share code using Git. It's key for modern software projects.",
  "show me a useful keyboard shortcut": "On Windows: Ctrl+C (copy), Ctrl+V (paste). On Mac: Cmd+C (copy), Cmd+V (paste).",
  "what playlist do you recommend for coding?": "Search for 'Lo-fi beats' on Spotify to focus, or 'Epic Coding Playlist' for motivation while programming.",
  "tell me a joke": "Why do programmers confuse Halloween with Christmas? Because OCT 31 == DEC 25 😁",
  "hey i'm not ok boost me up": [
    "Hey, first of all, thank you for reaching out. You matter, and what you feel is important.",
    "Remember: Every champion was once a beginner. The struggles you’re facing now are shaping the strong person you’re becoming.",
    "You have unique talents and so much potential. Even if today feels tough, brighter days are ahead.",
    "Take a deep breath, believe in yourself, and know that you can overcome anything. The world is better with you in it! 💪🌟",
    "If you want, I can share some relaxation exercises or motivational quotes. You're not alone!"
  ],
};

const fallbackReplies = [
  "Interesting question. Can you specify a bit more?",
  "That sounds great! Would you like me to look up information about it?",
  "I don't have the exact answer, but I can help you find resources.",
  "I'm here to help! Try asking me in another way."
];

// Bubble UI component
const Bubble = ({ text, sender }: { text: string | string[], sender: "user" | "bot" }) => {
  const content = Array.isArray(text) ? text.join("\n") : text;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: sender === "user" ? "flex-end" : "flex-start",
        margin: "14px 0",
      }}
    >
      <span
        style={{
          background: sender === "user"
            ? "linear-gradient(90deg, #a8ff78 0%, #78ffd6 100%)"
            : "linear-gradient(90deg, #e0e7ff 0%, #c7d2fe 100%)",
          color: "#222",
          borderRadius: sender === "user" ? "22px 22px 4px 22px" : "22px 22px 22px 4px",
          padding: "15px 22px",
          maxWidth: 420,
          fontSize: 17,
          whiteSpace: "pre-wrap",
          textAlign: "left",
          fontWeight: sender === "user" ? 500 : 400,
          border: sender === "user"
            ? "1.5px solid #52e19f"
            : "1.5px solid #a5b4fc",
          animation: "fadeInBubble 0.3s"
        }}
      >
        {content}
      </span>
    </div>
  );
};

const bubbleStyle = `
@keyframes fadeInBubble {
  from { opacity: 0; transform: translateY(16px);}
  to { opacity: 1; transform: translateY(0);}
}
`;

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string | string[]; sender: "user" | "bot" }[]>([
    { text: "Hello! I'm Wellness Chatbot, your virtual assistant for hackathons, wellness, study, and programming. What would you like to talk about today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  function randomDelayMs() {
    return 3000 + Math.random() * 2000; // 3-5 segundos
  }

  const getBotReply = (userText: string): (string | string[]) => {
    const lower = userText.trim().toLowerCase();
    if (botResponses[lower]) return botResponses[lower];
    const randomIdx = Math.floor(Math.random() * fallbackReplies.length);
    return fallbackReplies[randomIdx];
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input.trim();

    setMessages(prev => [...prev, { text: userText, sender: "user" }]);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    setTimeout(() => {
      setMessages(prev => [...prev, { text: "⏳ Typing...", sender: "bot" }]);
      setTimeout(() => {
        setMessages(prev => {
          const msgs = prev.filter(m => m.text !== "⏳ Typing...");
          const replyLines = getBotReply(userText);
          return [
            ...msgs,
            { text: replyLines, sender: "bot" as const }
          ];
        });
        setLoading(false);
      }, randomDelayMs());
    }, 300);
  };

  const handleSuggestion = (q: string) => {
    setInput(q);
    setShowSuggestions(false);
  };

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "3.5rem auto 2rem auto",
        border: "2px solid #6366f1",
        borderRadius: 26,
        padding: 0,
        background: "#f8fafc",
        boxShadow: "0 8px 32px 2px #dbeafe",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <style>{bubbleStyle}</style>
      <div style={{
        background: "linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)",
        color: "#fff",
        padding: "1.2rem 2.2rem 1rem 2.2rem",
        borderRadius: "0 0 60% 60% / 0 0 14% 14%",
        fontWeight: 600,
        fontSize: 24,
        letterSpacing: 0.5,
        display: "flex",
        alignItems: "center",
        gap: 16
      }}>
        <span role="img" aria-label="Bot">🤖</span>
        <span>Wellness Chatbot</span>
      </div>
      <div
        ref={chatRef}
        style={{
          minHeight: 260,
          maxHeight: 400,
          overflowY: "auto",
          background: "#f9fafb",
          padding: "28px 20px 18px 20px"
        }}
      >
        {messages.map((msg, idx) =>
          <Bubble text={msg.text} sender={msg.sender} key={idx} />
        )}
        {loading && (
          <div style={{ color: "#888", marginLeft: 12, fontStyle: "italic" }}>Bot is typing...</div>
        )}
      </div>

      {showSuggestions && (
        <div style={{
          borderTop: "1px solid #e0e7ff",
          background: "#f1f5f9",
          padding: "9px 18px",
          display: "flex",
          flexWrap: "wrap",
          gap: "9px 11px",
          justifyContent: "flex-start",
        }}>
          {suggestedQuestions.map((q, i) =>
            <button
              key={i}
              style={{
                background: "linear-gradient(90deg, #c7d2fe 0%, #a5b4fc 100%)",
                color: "#222",
                border: "none",
                borderRadius: 16,
                padding: "7px 18px",
                fontSize: 15,
                cursor: "pointer",
                fontWeight: 500,
                letterSpacing: 0.1,
                boxShadow: "0 1.5px 6px #e0e7ff",
                transition: "background 0.18s"
              }}
              onClick={() => handleSuggestion(q)}
            >{q}</button>
          )}
        </div>
      )}

      <form
        onSubmit={sendMessage}
        style={{
          borderTop: "2px solid #6366f1",
          background: "#fff",
          padding: "22px 24px",
          display: "flex",
          gap: 12,
          alignItems: "center"
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            border: "2px solid #a5b4fc",
            borderRadius: 14,
            padding: "13px 16px",
            fontSize: 17,
            outline: "none",
            background: "#f8fafc",
            fontWeight: 500
          }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: "linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            padding: "12px 32px",
            fontWeight: "bold",
            fontSize: 17,
            cursor: (!input.trim() || loading) ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
      <div
        style={{
          background: "linear-gradient(90deg, #a5b4fc 0%, #f0fdfa 100%)",
          color: "#444",
          fontSize: 14,
          padding: "12px 30px",
          fontWeight: 500,
          borderRadius: "0 0 22px 22px",
          textAlign: "center"
        }}
      >
        <span>
          WellnessHub Hackathon &middot; <span style={{ color: "#6366f1", fontWeight: 700 }}>Chatbot Demo</span> &middot; <span style={{ color: "#16a34a" }}>Offline, fast, pre-defined answers</span>
        </span>
      </div>
    </div>
  );
};

export default Chatbot;