'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiMusic, FiX } from 'react-icons/fi';
import { musicList } from '@/data/content';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentSong = musicList[currentIndex];

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // 浏览器阻止自动播放
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const playNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % musicList.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 100);
  }, [currentIndex]);

  const playPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + musicList.length) % musicList.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 100);
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playNext]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(percent);
    if (audioRef.current.duration) {
      audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio ref={audioRef} src={currentSong.src} preload="metadata" />

      {/* 音乐提示按钮 */}
      <AnimatePresence>
        {!showPlayer && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPlayer(true)}
            className="fixed bottom-24 md:bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 text-white shadow-lg shadow-primary-300/30 flex items-center justify-center"
          >
            <FiMusic className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 迷你播放器 */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md"
          >
            <div className="glass rounded-t-2xl md:rounded-2xl shadow-xl shadow-primary-200/20 overflow-hidden">
              {/* 进度条 */}
              <div
                ref={progressRef}
                className="h-1 bg-gray-200/50 cursor-pointer group"
                onClick={handleProgressClick}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-400 to-purple-400 relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>

              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  {/* 歌曲信息 */}
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    <motion.p
                      className="text-sm font-medium text-gray-800 truncate"
                      animate={{ x: isPlaying ? [0, 2, 0] : 0 }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {currentSong.title}
                    </motion.p>
                    <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
                  </div>

                  {/* 控制按钮 */}
                  <div className="flex items-center gap-2 ml-4">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={playPrev}
                      className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                    >
                      <FiSkipBack className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={togglePlay}
                      className="p-2.5 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 text-white shadow-md shadow-primary-300/30"
                    >
                      {isPlaying ? (
                        <FiPause className="w-4 h-4" />
                      ) : (
                        <FiPlay className="w-4 h-4 ml-0.5" />
                      )}
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={playNext}
                      className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                    >
                      <FiSkipForward className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => setShowPlayer(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors md:hidden"
                    >
                      <FiX className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* 展开的播放列表 */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 space-y-1">
                        {musicList.map((song, i) => (
                          <motion.button
                            key={song.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setCurrentIndex(i);
                              setIsPlaying(false);
                              setTimeout(() => {
                                if (audioRef.current) {
                                  audioRef.current.load();
                                  audioRef.current.play().catch(() => {});
                                  setIsPlaying(true);
                                }
                              }, 100);
                              setIsExpanded(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                              i === currentIndex
                                ? 'bg-primary-50 text-primary-600 font-medium'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-medium">{song.title}</span>
                            <span className="text-gray-300 mx-2">·</span>
                            <span className="text-xs">{song.artist}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
