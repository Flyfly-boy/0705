'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { loveLetterCode } from '@/data/content';
import { FiPlay, FiPause, FiRewind } from 'react-icons/fi';

// 单次遍历语法高亮，避免正则冲突
function highlightCode(code: string): string {
  // 先转义 HTML 实体
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 单次遍历，用捕获组区分不同 token 类型
  const tokenPattern =
    /(\/\/[^\n]*)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\b(?:class|const|let|var|new|return|if|while|async|await|function|true|false|Infinity|this)\b)|(\b\d+\b)|(\.\w+\()|(\b[A-Z]\w+\b)/g;

  return escaped.replace(
    tokenPattern,
    (match, comment, str, keyword, number, method, className) => {
      if (comment !== undefined) return `<span class="text-gray-400 italic">${match}</span>`;
      if (str !== undefined) return `<span class="text-emerald-400">${match}</span>`;
      if (keyword !== undefined) return `<span class="text-purple-400 font-medium">${match}</span>`;
      if (number !== undefined) return `<span class="text-amber-300">${match}</span>`;
      if (method !== undefined) return `.<span class="text-sky-300">${match.slice(1, -1)}</span>(`;
      if (className !== undefined) return `<span class="text-yellow-300">${match}</span>`;
      return match;
    }
  );
}

export default function LoveLetterPage() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const codeLines = loveLetterCode.split('\n');
  const containerRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(false);

  const startTyping = () => {
    setDisplayedLines(0);
    setIsTyping(true);
    setIsPaused(false);
    pauseRef.current = false;

    const typeLine = () => {
      if (pauseRef.current) return;
      if (displayedLines >= codeLines.length) {
        setIsTyping(false);
        return;
      }

      setDisplayedLines((prev) => prev + 1);

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 10);

      setTimeout(typeLine, 50 + Math.random() * 80);
    };

    typeLine();
  };

  const togglePause = () => {
    if (!isTyping) return;
    const newPaused = !isPaused;
    setIsPaused(newPaused);
    pauseRef.current = newPaused;
  };

  useEffect(() => {
    const timer = setTimeout(startTyping, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isPaused && isTyping && displayedLines < codeLines.length && !pauseRef.current) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          if (prev >= codeLines.length) {
            setIsTyping(false);
            return prev;
          }
          return prev + 1;
        });
      }, 50 + Math.random() * 80);
      return () => clearTimeout(timer);
    }
  }, [displayedLines, isTyping, isPaused]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-32 md:pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* 页面标题 */}
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
            💻
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-3">程序员情书</h1>
          <p className="text-gray-400">用代码写给你的情书，每一行都是真心</p>
        </motion.div>

        {/* 代码编辑器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden shadow-2xl shadow-primary-200/10"
        >
          {/* 编辑器标题栏 */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-gray-400 text-xs font-mono">love_letter.js</span>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={startTyping}
                className="text-gray-400 hover:text-white transition-colors"
                title="重新播放"
              >
                <FiRewind className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={togglePause}
                className="text-gray-400 hover:text-white transition-colors"
                title={isPaused ? '继续' : '暂停'}
              >
                {isPaused ? (
                  <FiPlay className="w-4 h-4" />
                ) : (
                  <FiPause className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>

          {/* 代码区域 */}
          <div
            ref={containerRef}
            className="bg-gray-900 p-4 md:p-6 overflow-auto max-h-[60vh] md:max-h-[70vh]"
          >
            <pre className="font-mono text-sm md:text-base leading-relaxed">
              {codeLines.slice(0, displayedLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  <span className="text-gray-600 w-8 md:w-10 text-right mr-4 select-none flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-200 flex-1 whitespace-pre">
                    {line || '\u00A0'}
                  </span>
                </motion.div>
              ))}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="text-primary-400 ml-12"
                >
                  ▊
                </motion.span>
              )}
            </pre>
          </div>
        </motion.div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <div className="glass rounded-2xl p-6 inline-block">
            <p className="text-gray-500 text-sm">
              💡 这封情书用 <span className="text-purple-400 font-medium">JavaScript</span> 写成，
              每一行代码都是我对你的告白
            </p>
            <p className="text-gray-400 text-xs mt-2">
              while(true) {'{'} love(you); {'}'} — 爱你是一个无限循环
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
