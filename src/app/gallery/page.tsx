'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData } from '@/data/content';
import { FiX, FiHeart } from 'react-icons/fi';

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof galleryData)[0] | null>(null);

  const heightMap = {
    tall: 'h-72 md:h-96',
    medium: 'h-56 md:h-72',
    short: 'h-44 md:h-56',
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-32 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-5xl mb-4"
          >
            📸
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-3">照片墙</h1>
          <p className="text-gray-400">每一张照片都是一段回忆</p>
        </motion.div>

        {/* 瀑布流布局 */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryData.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.random() * 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhoto(photo)}
              className="break-inside-avoid cursor-pointer group"
            >
              <div className="glass rounded-2xl overflow-hidden card-hover">
                {/* 照片占位 */}
                <div
                  className={`relative bg-gradient-to-br from-primary-50 to-purple-50 ${heightMap[photo.height as keyof typeof heightMap]} flex items-center justify-center overflow-hidden`}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* 悬停遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium drop-shadow-lg">{photo.caption}</p>
                  </div>
                </div>

                {/* 情话 */}
                <div className="p-3">
                  <p className="text-xs text-gray-400 text-center italic">
                    &ldquo;{photo.caption}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 灯箱查看 */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-500 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>

              <div className="glass rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-primary-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.caption}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <p className="text-lg text-gray-600 italic">
                    &ldquo;{selectedPhoto.caption}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
