'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ParticleEffect from '@/components/ParticleEffect';
import { anniversaryConfig } from '@/data/content';

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(anniversaryConfig.anniversaryDate + 'T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        milliseconds: Math.floor(diff % 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 50);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number, len: number = 2) => n.toString().padStart(len, '0');

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {[
        { value: timeLeft.days, label: '天', digits: 3 },
        { value: timeLeft.hours, label: '时', digits: 2 },
        { value: timeLeft.minutes, label: '分', digits: 2 },
        { value: timeLeft.seconds, label: '秒', digits: 2 },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <motion.div
            className="glass rounded-xl px-3 py-2 md:px-5 md:py-3 min-w-[60px] md:min-w-[80px]"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl md:text-4xl font-bold text-gradient font-mono">
              {pad(item.value, item.digits)}
            </span>
          </motion.div>
          <span className="text-xs md:text-sm text-gray-400 mt-1.5 font-medium">{item.label}</span>
        </div>
      ))}
      <div className="flex flex-col items-center">
        <motion.div
          className="glass rounded-xl px-2 py-2 md:px-3 md:py-3 min-w-[40px] md:min-w-[50px]"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-lg md:text-2xl font-bold text-primary-300 font-mono">
            {pad(Math.floor(timeLeft.milliseconds / 10))}
          </span>
        </motion.div>
        <span className="text-xs md:text-sm text-gray-400 mt-1.5 font-medium">毫秒</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [showContent, setShowContent] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <div className="relative min-h-screen">
      {!entered ? (
        <motion.div
          key="landing"
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          <ParticleEffect />

          {/* 背景装饰 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100/20 rounded-full blur-3xl" />
          </div>

          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative z-20 text-center px-6"
            >
              {/* 日期标题 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-gray-500 font-medium tracking-wider">
                  {anniversaryConfig.subtitle}
                </span>
              </motion.div>

              {/* 主标题 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-4xl md:text-7xl font-bold mb-3"
              >
                <span className="text-gradient">我们的第五个夏天</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-gray-400 text-sm md:text-base mb-10 tracking-wide"
              >
                Five Years of Us · 1826 Days of Love
              </motion.p>

              {/* 倒计时 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mb-12"
              >
                <p className="text-sm text-gray-400 mb-4">距离五周年纪念日</p>
                <Countdown />
              </motion.div>

              {/* 进入按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(244, 114, 182, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnter}
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-primary-400 via-purple-400 to-primary-500 text-white font-medium text-lg shadow-xl shadow-primary-300/30 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    开启我们的故事
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 via-primary-400 to-purple-500"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>

              {/* 底部装饰文字 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-16 text-xs text-gray-300 tracking-widest"
              >
                双击屏幕任意位置有惊喜 💕
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen pt-20 pb-32 md:pb-20"
        >
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            {/* 欢迎区域 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-16"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-6xl mb-6"
              >
                🌸
              </motion.div>
              <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
                欢迎来到我们的世界
              </h1>
              <p className="text-gray-500 text-lg max-w-lg mx-auto">
                这里记录了我们五年来每一个珍贵的瞬间，每一份感动，和每一句想说给你听的话。
              </p>
            </motion.div>

            {/* 功能卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  href: '/timeline',
                  emoji: '📖',
                  title: '我们的时间线',
                  desc: '五年来的每一个重要时刻',
                  gradient: 'from-pink-400 to-rose-400',
                },
                {
                  href: '/gallery',
                  emoji: '📸',
                  title: '照片墙',
                  desc: '定格每一个幸福的瞬间',
                  gradient: 'from-purple-400 to-indigo-400',
                },
                {
                  href: '/love-letter',
                  emoji: '💻',
                  title: '程序员情书',
                  desc: '用代码写给你的情书',
                  gradient: 'from-violet-400 to-purple-400',
                },
                {
                  href: '/messages',
                  emoji: '💌',
                  title: '留言板',
                  desc: '写下你想说的话',
                  gradient: 'from-primary-400 to-pink-400',
                },
              ].map((card, i) => (
                <motion.a
                  key={card.href}
                  href={card.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  className="glass rounded-2xl p-6 md:p-8 card-hover group cursor-pointer block"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="text-4xl"
                    >
                      {card.emoji}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-primary-500 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-400">{card.desc}</p>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 3 }}
                    >
                      <FiArrowRight className="w-5 h-5 text-primary-400" />
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* 底部情话 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-16"
            >
              <div className="glass rounded-2xl p-8 inline-block">
                <p className="text-gray-500 text-sm mb-2">—— 致最爱的你 ——</p>
                <p className="text-lg text-gray-600 italic">
                  &ldquo;你是我写过最长的代码，也是我调试最久的bug，但我永远不会按下停止运行。&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
