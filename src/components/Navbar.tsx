'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiClock, FiImage, FiCode, FiMessageCircle, FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { href: '/', label: '首页', icon: FiHome },
  { href: '/timeline', label: '时间线', icon: FiClock },
  { href: '/gallery', label: '照片墙', icon: FiImage },
  { href: '/love-letter', label: '情书', icon: FiCode },
  { href: '/messages', label: '留言板', icon: FiMessageCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 首页不显示导航栏
  if (pathname === '/') return null;

  return (
    <>
      {/* 桌面端导航 */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
          scrolled ? 'glass shadow-lg shadow-primary-100/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 hover:text-primary-500'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* 移动端底部导航 */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-20 left-0 right-0 z-50 md:hidden"
      >
        <div className="mx-3 glass rounded-2xl shadow-lg shadow-primary-200/20">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                      isActive ? 'text-primary-500' : 'text-gray-400'
                    }`}
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1.2 : 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-[10px] font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-dot"
                        className="w-1 h-1 rounded-full bg-primary-400"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* 移动端汉堡菜单（备用） */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-64 glass shadow-2xl p-6 pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item, i) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-primary-400 to-purple-400 text-white'
                        : 'text-gray-600 hover:bg-primary-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
