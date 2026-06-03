'use client';

import { motion } from 'framer-motion';
import { timelineData } from '@/data/content';
import { FiCalendar, FiHeart } from 'react-icons/fi';

export default function TimelinePage() {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-32 md:pb-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-5xl mb-4"
          >
            📖
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-3">我们的时间线</h1>
          <p className="text-gray-400">五年，每一步都算数</p>
        </motion.div>

        {/* 时间线 */}
        <div className="relative">
          {/* 中间线 */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-purple-300 to-primary-300 md:-translate-x-0.5" />

          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative mb-12 md:mb-16 ${
                  isLeft ? 'md:pr-[52%]' : 'md:pl-[52%] md:ml-auto'
                } pl-16 md:pl-0`}
              >
                {/* 时间线节点 */}
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="absolute left-4 md:left-1/2 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 shadow-lg shadow-primary-300/30 md:-translate-x-2.5 z-10 flex items-center justify-center"
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </motion.div>

                {/* 卡片 */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="glass rounded-2xl p-5 md:p-6 card-hover"
                >
                  {/* 日期标签 */}
                  <div className="flex items-center gap-2 mb-3">
                    <FiCalendar className="w-3.5 h-3.5 text-primary-400" />
                    <span className="text-xs font-medium text-primary-400 tracking-wider">
                      {item.date}
                    </span>
                  </div>

                  {/* 图标和标题 */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  </div>

                  {/* 描述 */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* 照片占位 */}
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary-50 to-purple-50 aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <FiHeart className="w-8 h-8 text-primary-200 mx-auto mb-1" />
                      <p className="text-xs text-gray-300">替换为你们的照片</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* 时间线终点 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute left-6 md:left-1/2 bottom-0 -translate-x-1/2 translate-y-4"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 flex items-center justify-center shadow-lg shadow-primary-300/30">
              <span className="text-white text-lg">💕</span>
            </div>
          </motion.div>
        </div>

        {/* 底部文字 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 text-sm mb-2">我们的故事</p>
          <p className="text-lg text-gradient font-medium">未完待续...</p>
        </motion.div>
      </div>
    </div>
  );
}
