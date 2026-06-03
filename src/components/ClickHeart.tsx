'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function ClickHeart() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const idRef = useRef(0);

  const createHeart = useCallback((x: number, y: number) => {
    const id = idRef.current++;
    const heart: Heart = {
      id,
      x,
      y,
      size: Math.random() * 20 + 15,
      opacity: 1,
    };
    setHearts((prev) => [...prev, heart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1500);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 只在特定区域触发（双击）
    };
    const handleDoubleClick = (e: MouseEvent) => {
      createHeart(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('dblclick', handleDoubleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [createHeart]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-fade-in-up"
          style={{
            left: heart.x - heart.size / 2,
            top: heart.y - heart.size / 2,
            fontSize: heart.size,
            opacity: heart.opacity,
            transition: 'all 1.5s ease-out',
            transform: `translateY(-${60}px)`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
}
