'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { anniversaryConfig } from '@/data/content';

export default function AnniversarySpecial() {
  const [isAnniversary, setIsAnniversary] = useState(false);

  useEffect(() => {
    const today = new Date();
    const anniversary = new Date(anniversaryConfig.anniversaryDate);
    if (
      today.getMonth() === anniversary.getMonth() &&
      today.getDate() === anniversary.getDate()
    ) {
      setIsAnniversary(true);
    }
  }, []);

  if (!isAnniversary) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-gradient-to-br from-primary-200 via-purple-200 to-pink-200 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
          五周年快乐！
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-2">
          我们的第五个夏天 🌸
        </p>
        <p className="text-lg text-gray-500 mb-8">
          2021.07.05 - 2026.07.05
        </p>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-primary-500 font-medium"
        >
          今天是属于我们的日子 💝
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
