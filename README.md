# 我们的第五个夏天 - 五周年恋爱纪念网站

> 2021.07.05 - 2026.07.05 | 写给最爱的你

## 功能概览

- **首页浪漫开场** - 全屏渐入动画、实时倒计时、樱花/爱心粒子特效
- **时间线页面** - 垂直时间线展示五年重要时刻，滚动渐入动画
- **照片墙页面** - 瀑布流布局、点击放大查看、情话标注
- **程序员情书** - 代码风格情书、语法高亮、逐行打字机效果
- **互动留言板** - 留言保存到 localStorage、emoji 表情、彩色卡片
- **音乐播放器** - 底部迷你播放器、播放控制、进度条拖动
- **惊喜彩蛋** - 密码解锁隐藏内容、双击爱心特效、控制台情话、纪念日特别页面

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- Framer Motion
- React Icons
- 纯前端实现，无需后端

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 3. 构建生产版本

```bash
npm run build
```

## 如何替换内容

### 替换照片

1. 将你的合照放入 `public/images/` 目录
2. 在 `src/data/content.ts` 中修改对应的图片路径：

```typescript
// 时间线照片
export const timelineData = [
  {
    id: 1,
    date: '2021.07.05',
    title: '我们的开始',
    description: '你的描述...',
    image: '/images/your-photo.jpg',  // 修改这里
    icon: '💕',
  },
  // ...
];

// 照片墙照片
export const galleryData = [
  { id: 1, src: '/images/your-photo.jpg', caption: '你的情话', height: 'tall' },
  // ...
];
```

### 替换文字内容

所有文字内容集中在 `src/data/content.ts` 文件中，可以直接修改：

- `timelineData` - 时间线的故事内容
- `galleryData` - 照片墙的情话
- `loveLetterCode` - 程序员情书的代码内容
- `easterEggs` - 彩蛋密码和隐藏内容
- `anniversaryConfig` - 纪念日日期配置

### 替换音乐

1. 将音乐文件放入 `public/music/` 目录
2. 在 `src/data/content.ts` 中修改 `musicList`

### 修改主题色

在 `tailwind.config.ts` 中修改 `primary` 和 `purple` 色值。

## 部署到 Vercel

### 方式一：一键部署

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 导入仓库
3. 自动检测 Next.js 配置，点击部署

### 方式二：Vercel CLI

```bash
npm i -g vercel
vercel
```

## 彩蛋说明

| 密码 | 内容 |
|------|------|
| 520 | 我爱你 |
| 705 | 我们的日子 |
| 1314 | 一生一世 |
| love | 爱意溢出 |

- **双击屏幕** - 出现爱心特效
- **控制台** - 打开浏览器开发者工具，查看程序员专属情话
- **纪念日当天** - 自动显示特别祝福页面

## 项目结构

```
anniversary/
├── public/
│   ├── images/          # 照片资源
│   └── music/           # 音乐资源
├── src/
│   ├── app/
│   │   ├── layout.tsx   # 根布局
│   │   ├── page.tsx     # 首页
│   │   ├── globals.css  # 全局样式
│   │   ├── timeline/    # 时间线页面
│   │   ├── gallery/     # 照片墙页面
│   │   ├── love-letter/ # 情书页面
│   │   └── messages/    # 留言板页面
│   ├── components/
│   │   ├── Navbar.tsx          # 导航栏
│   │   ├── MusicPlayer.tsx     # 音乐播放器
│   │   ├── ParticleEffect.tsx  # 粒子特效
│   │   ├── EasterEgg.tsx       # 彩蛋功能
│   │   ├── ClickHeart.tsx      # 点击爱心
│   │   └── AnniversarySpecial.tsx # 纪念日特效
│   └── data/
│       └── content.ts   # 所有内容数据
├── tailwind.config.ts
├── next.config.js
├── vercel.json
└── package.json
```

---

Made with 💕 by a programmer who loves you
