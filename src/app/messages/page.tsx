'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiTrash2 } from 'react-icons/fi';

interface Message {
  id: string;
  text: string;
  emoji: string;
  color: string;
  timestamp: number;
}

const emojiList = ['💕', '🌸', '💗', '✨', '🎀', '💝', '🌙', '🌈', '🦋', '🍬', '🎊', '🍀'];

const colorList = [
  'from-primary-100 to-pink-100',
  'from-purple-100 to-indigo-100',
  'from-rose-100 to-pink-100',
  'from-violet-100 to-purple-100',
  'from-pink-100 to-rose-100',
  'from-fuchsia-100 to-pink-100',
];

const API_URL = '/api/messages';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💕');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        localStorage.setItem('anniversary-messages', JSON.stringify(data));
        return;
      }
    } catch {
      // API unavailable, use localStorage fallback
    }
    const saved = localStorage.getItem('anniversary-messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages().finally(() => setIsLoading(false));
  }, [fetchMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSubmitting) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      emoji: selectedEmoji,
      color: colorList[Math.floor(Math.random() * colorList.length)],
      timestamp: Date.now(),
    };

    const prevMessages = [...messages];
    setMessages([newMessage, ...prevMessages]);
    setInputText('');
    setIsSubmitting(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      if (res.ok) {
        localStorage.setItem('anniversary-messages', JSON.stringify([newMessage, ...prevMessages]));
      } else {
        setMessages(prevMessages);
        localStorage.setItem('anniversary-messages', JSON.stringify(prevMessages));
      }
    } catch {
      localStorage.setItem('anniversary-messages', JSON.stringify([newMessage, ...prevMessages]));
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMessage = async (id: string) => {
    const prevMessages = [...messages];
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem('anniversary-messages', JSON.stringify(updated));

    try {
      await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch {
      // already updated locally
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-32 md:pb-20">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-5xl mb-4"
          >
            💌
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-3">留言板</h1>
          <p className="text-gray-400">写下你想对TA说的话</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-5 mb-8"
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-2 mb-3">
              {emojiList.map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`text-xl p-1.5 rounded-lg transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-primary-100 scale-110'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="写下你的心里话..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/70 border border-primary-100 focus:border-primary-300 focus:ring-2 focus:ring-primary-200 outline-none text-gray-700 placeholder-gray-300 transition-all"
                maxLength={200}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!inputText.trim() || isSubmitting}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary-400 to-purple-400 text-white font-medium shadow-md shadow-primary-200/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FiSend className="w-4 h-4" />
                <span className="hidden md:inline">发送</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        <div className="space-y-4">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="text-4xl mb-4 inline-block"
              >
                💌
              </motion.div>
              <p className="text-gray-400">加载留言中...</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ delay: i * 0.05 }}
                  layout
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`glass rounded-2xl p-5 bg-gradient-to-br ${msg.color} relative group`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{msg.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-700 leading-relaxed break-words">{msg.text}</p>
                        <p className="text-xs text-gray-400 mt-2">{formatTime(msg.timestamp)}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteMessage(msg.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-400 p-1"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {!isLoading && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-4xl mb-4">📝</p>
              <p className="text-gray-400">还没有留言，写下第一条吧~</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
