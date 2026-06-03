'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easterEggs, consoleLoveMessages } from '@/data/content';
import { FiLock, FiX } from 'react-icons/fi';

export default function EasterEgg() {
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState('');
  const [revealedContent, setRevealedContent] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const key = password.toLowerCase().trim();
    if (easterEggs[key as keyof typeof easterEggs]) {
      setRevealedContent(easterEggs[key as keyof typeof easterEggs]);
      setPassword('');
    }
  }, [password]);

  // 控制台情话
  if (typeof window !== 'undefined') {
    consoleLoveMessages.forEach((msg) => {
      console.log(msg, 'color: #ec4899; font-size: 14px; font-weight: bold;');
    });
  }

  return (
    <>
      {/* 隐藏的密码入口 - 页面右下角小锁图标 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowInput(true)}
        className="fixed bottom-24 md:bottom-6 left-4 z-40 w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-primary-400 transition-colors opacity-50 hover:opacity-100"
        title="输入密码发现惊喜"
      >
        <FiLock className="w-4 h-4" />
      </motion.button>

      {/* 密码输入弹窗 */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
            onClick={() => setShowInput(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gradient">发现隐藏惊喜 ✨</h3>
                <button onClick={() => setShowInput(false)} className="text-gray-400 hover:text-gray-600">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">输入密码解锁专属惊喜（提示：试试 520、705、1314、love）</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入密码..."
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-primary-100 focus:border-primary-300 focus:ring-2 focus:ring-primary-200 outline-none text-center text-lg tracking-widest transition-all"
                  autoFocus
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-primary-400 to-purple-400 text-white font-medium shadow-md shadow-primary-200/30"
                >
                  解锁 💝
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 隐藏内容展示 */}
      <AnimatePresence>
        {revealedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
            onClick={() => setRevealedContent(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl p-8 w-full max-w-md shadow-2xl text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl mb-4"
              >
                💝
              </motion.div>
              <h2 className="text-2xl font-bold text-gradient mb-4">{revealedContent.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{revealedContent.message}</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setRevealedContent(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 text-white font-medium shadow-md"
              >
                我知道了 💕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
