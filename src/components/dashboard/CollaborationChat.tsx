'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Users, X, Paperclip, Sparkles, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
  isSelf: boolean;
}

export function CollaborationChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Harsha M (Lead)',
      avatar: 'H',
      text: 'Hey team, I generated the new 10,000 row ecommerce dataset using Crawl4AI.',
      time: '10:42 AM',
      isSelf: false,
    },
    {
      id: '2',
      sender: 'Manogna (Research)',
      avatar: 'M',
      text: 'Great! Checked the Kolmogorov-Smirnov score, fidelity is at 98.4%.',
      time: '10:44 AM',
      isSelf: false,
    },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: 'Y',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };

    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-110 transition-all duration-300 flex items-center gap-2 font-bold text-xs"
        >
          <MessageSquare className="size-5" />
          <span>Team Chat</span>
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Slide-Out Chat Box */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-3xl bg-card border border-border/60 shadow-2xl overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="size-5" />
              <div>
                <h4 className="font-bold text-sm leading-tight">Team Collaboration</h4>
                <p className="text-[10px] opacity-80 flex items-center gap-1 font-medium">
                  <span className="size-1.5 rounded-full bg-emerald-400" /> 4 Strategists Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-primary-foreground/20 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-muted/20 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[9px] text-muted-foreground font-semibold mb-1">
                  {m.sender} • {m.time}
                </span>
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.isSelf
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-card border border-border/40 text-foreground rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={sendMessage} className="p-3 bg-card border-t border-border/40 flex items-center gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type message or paste schema URL..."
              className="h-10 text-xs rounded-xl bg-muted/40 border-border/40"
            />
            <Button type="submit" size="icon" className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex-shrink-0">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
