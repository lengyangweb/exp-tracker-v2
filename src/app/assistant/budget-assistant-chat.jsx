'use client';

import React, { useState, useRef } from "react";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function BudgetAssistantChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "init",
      role: "system",
      content:
        "Hi! Ask me anything about your expenses (e.g. 'How much did I spend on Food last month?').",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: String(Date.now()),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Assistant request failed");
      }

      const payload = await res.json();
      const assistantText = payload.answer || "Sorry, I couldn't generate a response.";

      const assistantMessage = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: assistantText,
        createdAt: new Date().toISOString(),
      };

      setMessages((m) => [...m, assistantMessage]);
    } catch (e) {
      const errorMsg = {
        id: String(Date.now() + 2),
        role: "assistant",
        content: `Error: ${e.message || "Unknown error"}`,
        createdAt: new Date().toISOString(),
      };
      setMessages((m) => [...m, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(scrollToBottom, 50);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-full mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Budget Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Ask anything about your expenses
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Powered by OpenAI</div>
          </div>
        </CardHeader>

        <CardContent className="px-3 py-2">
          <div className="h-96 border rounded-md overflow-hidden">
            <ScrollArea className="h-full" ref={scrollRef}>
              <div className="p-4 flex flex-col gap-4">
                {messages.map((m) => (
                  <div key={m.id} className="flex items-start gap-3">
                    {m.role === "user" ? (
                      <div className="ml-auto max-w-[80%]">
                        <div className="bg-sky-100 text-sky-900 px-4 py-2 rounded-xl break-words">
                          <div className="text-sm">{m.content}</div>
                          <div className="text-[11px] opacity-70 mt-1 text-right">
                            {new Date(m.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-[80%]">
                        <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-xl break-words">
                          <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                          <div className="text-[11px] opacity-70 mt-1">
                            {new Date(m.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="flex items-center gap-3">
          <Input
            placeholder="Ask about your spending, e.g. 'How much did I spend on groceries last month?'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={loading}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={loading}>
            {loading ? "Thinking..." : "Ask"}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-4 text-sm text-muted-foreground">
        Tip: Keep questions specific (include timeframe & category) for the most accurate answers.
      </div>
    </div>
  );
}
