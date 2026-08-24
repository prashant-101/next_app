"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Bot,
  Send,
  X,
  MessageCircle,
  Sparkles,
  User,
} from "lucide-react";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const ErrorCircle = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hi! 👋 I'm your web assistant. How can I help you?",
    },
  ]);

  const quickQuestions = [
    "How do I use this website?",
    "Why isn't something working?",
    "Where can I find information?",
  ];

  const sendMessage = (text?: string) => {
    const message = text ?? input;

    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Temporary response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: getAssistantResponse(message),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  const getAssistantResponse = (question: string) => {
    const q = question.toLowerCase();

    if (q.includes("use") || q.includes("website")) {
      return "You can explore the sections of the website using the navigation menu. If you're looking for something specific, tell me what you're trying to find.";
    }

    if (
      q.includes("working") ||
      q.includes("error") ||
      q.includes("problem")
    ) {
      return "I can help troubleshoot it. Tell me what you clicked, what you expected to happen, and what happened instead.";
    }

    if (q.includes("find") || q.includes("where")) {
      return "Tell me what information you're looking for and I'll help you find the right section.";
    }

    return "I'm here to help! Could you give me a little more detail about your question?";
  };

  return (
    <div className="fixed right-6 bottom-6 z-[80]">
      {/* =====================================================
          ASSISTANT PANEL
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="absolute right-0 bottom-20 w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 text-white shadow-2xl"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
                  <Bot size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">Web Assistant</h3>

                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    Online
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}

            <div className="h-[330px] overflow-y-auto p-4">
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600">
                        <Bot size={14} />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        message.role === "user"
                          ? "rounded-br-sm bg-red-600 text-white"
                          : "rounded-bl-sm bg-neutral-800 text-neutral-200"
                      )}
                    >
                      {message.text}
                    </div>

                    {message.role === "user" && (
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-700">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Questions */}

            <div className="border-t border-white/10 px-4 py-3">
              <div className="mb-2 flex items-center gap-1 text-xs text-neutral-400">
                <Sparkles size={12} />
                Quick questions
              </div>

              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}

            <div className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-neutral-900 px-3 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          FLOATING BUTTON
      ===================================================== */}

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
        }}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className={cn(
          "flex h-[60px] w-[60px] items-center justify-center rounded-full shadow-xl",
          open
            ? "bg-neutral-800"
            : "bg-red-600 hover:bg-red-500"
        )}
      >
        {open ? (
          <X className="text-white" size={24} />
        ) : (
          <MessageCircle className="text-white" size={25} />
        )}
      </motion.button>
    </div>
  );
};

export default ErrorCircle;