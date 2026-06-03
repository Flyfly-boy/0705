'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'sakura';
}

export default function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const createParticle = useCallback((width: number, height: number): Particle => {
    const type = Math.random() > 0.5 ? 'heart' : 'sakura';
    return {
      x: Math.random() * width,
      y: -20,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      type,
    };
  }, []);

  const drawHeart = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = `rgba(244, 114, 182, ${opacity})`;
    ctx.beginPath();
    const s = size / 2;
    ctx.moveTo(x, y + s / 4);
    ctx.bezierCurveTo(x, y, x - s, y, x - s, y + s / 4);
    ctx.bezierCurveTo(x - s, y + s / 2, x, y + s, x, y + s * 1.2);
    ctx.bezierCurveTo(x, y + s, x + s, y + s / 2, x + s, y + s / 4);
    ctx.bezierCurveTo(x + s, y, x, y, x, y + s / 4);
    ctx.fill();
    ctx.restore();
  }, []);

  const drawSakura = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, rotation: number) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillStyle = `rgba(252, 206, 237, ${opacity})`;

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.ellipse(0, -size / 3, size / 4, size / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.rotate((72 * Math.PI) / 180);
    }
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 初始化粒子
    for (let i = 0; i < 30; i++) {
      const p = createParticle(canvas.width, canvas.height);
      p.y = Math.random() * canvas.height;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 随机添加新粒子
      if (particlesRef.current.length < 40 && Math.random() > 0.95) {
        particlesRef.current.push(createParticle(canvas.width, canvas.height));
      }

      particlesRef.current.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity);
        } else {
          drawSakura(ctx, p.x, p.y, p.size, p.opacity, p.rotation);
        }

        // 移除超出画布的粒子
        if (p.y > canvas.height + 20) {
          particlesRef.current[index] = createParticle(canvas.width, canvas.height);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createParticle, drawHeart, drawSakura]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
