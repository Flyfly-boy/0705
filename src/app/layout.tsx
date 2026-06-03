import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import MusicPlayer from '@/components/MusicPlayer';
import EasterEgg from '@/components/EasterEgg';
import ClickHeart from '@/components/ClickHeart';
import AnniversarySpecial from '@/components/AnniversarySpecial';

export const metadata: Metadata = {
  title: '我们的第五个夏天 | 五周年纪念',
  description: '2021.07.05 - 2026.07.05 我们的第五年，写给最爱的你',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        {children}
        <Navbar />
        <MusicPlayer />
        <EasterEgg />
        <ClickHeart />
        <AnniversarySpecial />
      </body>
    </html>
  );
}
