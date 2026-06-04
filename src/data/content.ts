export const timelineData = [
  {
    id: 1,
    date: '2021.07.05',
    title: '我们的开始',
    description: '那一天，你走进了我的世界，从此我的代码里多了一个最美好的变量。',
    image: '/images/1.jpg',
    icon: '💕',
  },
  {
    id: 2,
    date: '2021.09.01',
    title: '第一次一起开学',
    description: '新的学期，因为有你，每一天都充满了期待。',
    image: '/images/2.jpg',
    icon: '📚',
  },
  {
    id: 3,
    date: '2021.12.25',
    title: '第一个圣诞节',
    description: '和你在一起的每个节日，都像是程序运行成功的提示音一样让人开心。',
    image: '/images/3.jpg',
    icon: '🎄',
  },
  {
    id: 4,
    date: '2022.02.14',
    title: '第一个情人节',
    description: '你是我写过最浪漫的代码，每一行都是心动。',
    image: '/images/4.jpg',
    icon: '💝',
  },
  {
    id: 5,
    date: '2022.07.05',
    title: '一周年纪念',
    description: '365天的陪伴，我们的故事才刚刚开始。',
    image: '/images/5.jpg',
    icon: '🎂',
  },
  {
    id: 6,
    date: '2022.10.01',
    title: '第一次旅行',
    description: '和你一起看世界，每一处风景都因为有你而更加美丽。',
    image: '/images/6.jpg',
    icon: '✈️',
  },
  {
    id: 7,
    date: '2023.07.05',
    title: '两周年纪念',
    description: '两年的时光，我们共同debug了生活中的每一个难题。',
    image: '/images/7.jpg',
    icon: '🎉',
  },
  {
    id: 8,
    date: '2023.12.31',
    title: '跨年夜',
    description: '和你一起倒数迎接新年，是我最想要的跨年方式。',
    image: '/images/8.jpg',
    icon: '🎆',
  },
  {
    id: 9,
    date: '2024.07.05',
    title: '三周年纪念',
    description: '三年了，我们的commit记录已经写满了爱的日志。',
    image: '/images/9.jpg',
    icon: '🌟',
  },
  {
    id: 10,
    date: '2024.11.11',
    title: '光棍节也快乐',
    description: '有你的光棍节，比任何节日都甜蜜。',
    image: '/images/10.jpg',
    icon: '🍬',
  },
  {
    id: 11,
    date: '2025.07.05',
    title: '四周年纪念',
    description: '四年了，我们的爱就像一个永不宕机的服务器，稳定而温暖。',
    image: '/images/1.jpg',
    icon: '🎊',
  },
  {
    id: 12,
    date: '2026.07.05',
    title: '五周年 · 我们的第五个夏天',
    description: '五年，1826天，43824小时，每一秒都是你。我们的故事，还在继续...',
    image: '/images/2.jpg',
    icon: '🌸',
  },
];

export const galleryData = [
  { id: 1, src: '/images/1.jpg', caption: '你笑起来真好看', height: 'tall' },
  { id: 2, src: '/images/2.jpg', caption: '和你一起的每个瞬间', height: 'short' },
  { id: 3, src: '/images/3.jpg', caption: '最爱的你', height: 'medium' },
  { id: 4, src: '/images/4.jpg', caption: '我们的日常', height: 'tall' },
  { id: 5, src: '/images/5.jpg', caption: '你的眼睛像星星', height: 'short' },
  { id: 6, src: '/images/6.jpg', caption: '一起走过的路', height: 'medium' },
  { id: 7, src: '/images/7.jpg', caption: '永远牵着手', height: 'tall' },
  { id: 8, src: '/images/8.jpg', caption: '你是我最甜的bug', height: 'short' },
  { id: 9, src: '/images/9.jpg', caption: '余生请多指教', height: 'medium' },
  { id: 10, src: '/images/10.jpg', caption: '最好的我们', height: 'tall' },
  { id: 11, src: '/images/1.jpg', caption: '你是我最想commit的人', height: 'short' },
  { id: 12, src: '/images/2.jpg', caption: '第五个夏天', height: 'medium' },
];

// 程序员情书代码
export const loveLetterCode = `// love_letter.js
// 致我最爱的人 —— 写于我们的第五个夏天

class LoveStory {
  constructor() {
    this.startDate = new Date('2021-07-05');
    this.you = new Person('我的宝贝', {
      charm: Infinity,
      beauty: 'unlimited',
      kindness: 'overflow',
    });
    this.me = new Person('你的程序员', {
      love: Infinity,
      devotion: 'eternal',
      bugs: 'many', // 但我会一直修
    });
  }

  // 从相遇那天起，我的世界就不再一样
  async sinceWeMet() {
    const days = Date.now() - this.startDate.getTime();
    const love = days * Infinity; // 每一天的爱都在增长
    return love; // 返回值：无穷大
  }

  // 你是我生命中最美好的 feature
  commit(message) {
    return \`git commit -m "\${message}: 我爱你，今天也是"\`;
  }

  // 我们的故事永远不会 merge conflict
  merge(ourLives) {
    return {
      status: 'resolved',
      result: 'happily ever after',
      conflicts: 0,
    };
  }

  // 就算遇到 bug，有你在就不怕
  debug(problem) {
    if (problem.includes('你')) {
      return '有你在，一切都不是问题';
    }
    return this.you.hug() + this.me.tryHarder();
  }

  // 主循环：永远爱你
  async run() {
    while (true) {
      await this.love(this.you);
      await this.care(this.you);
      await this.makeHappy(this.you);
      // 这个循环没有 break
      // 因为爱你是我的无限循环
    }
  }
}

// Hello World 是程序员的第一行代码
// 而你，是我人生中最美的 Hello
const ourStory = new LoveStory();
ourStory.run();

console.log(\`
  ╔══════════════════════════════╗
  ║   520 - 我爱你              ║
  ║   705 - 我们的纪念日         ║
  ║   5th - 我们的第五个夏天     ║
  ║                              ║
  ║   你是我写过最美的代码       ║
  ║   永远不会 deprecated        ║
  ╚══════════════════════════════╝
\`);`;

// 音乐列表
export const musicList = [
  {
    id: 1,
    title: '我们的歌',
    artist: '专属回忆',
    src: '/music/1.mp3',
  },
  {
    id: 2,
    title: '小幸运',
    artist: '田馥甄',
    src: '/music/2.mp3',
  },
  {
    id: 3,
    title: '告白气球',
    artist: '周杰伦',
    src: '/music/3.mp3',
  },
];

// 彩蛋密码和隐藏内容
export const easterEggs = {
  '520': {
    title: '我爱你 💕',
    message: '520，我爱你。不是一时的冲动，是每一天的选择。从2021到2026，每一天我都在更爱你。',
  },
  '705': {
    title: '我们的日子 🌸',
    message: '7月5日，是我们故事开始的日子。这一天，我的世界因为你的出现而变得完整。第五个705，快乐！',
  },
  '1314': {
    title: '一生一世 💍',
    message: '1314，一生一世。五年只是开始，余生还很长，我想和你一起走完每一步。',
  },
  'love': {
    title: 'Love Overflow 💗',
    message: 'Error: Stack Overflow - 爱意溢出！我的心里装的全是你，已经没有空间给其他人了。',
  },
};

// 控制台情话
export const consoleLoveMessages = [
  '%c💕 你好呀，我的宝贝！',
  '%c🌸 你发现了一个程序员的小秘密~',
  '%c💝 这个网站是用爱写的代码',
  '%c✨ 2021.07.05 - 永远',
  '%c🎀 你是我生命中最美的feature',
  '%c💗 while(true) { love(you); }',
  '%c🌈 我们的love永远不会throw error',
  '%c💫 你是我最想commit的人',
  '%c🦄 我们的story没有merge conflict',
  '%c🌙 晚安，我的全世界',
];

// 纪念日配置
export const anniversaryConfig = {
  startDate: '2021-07-05',
  anniversaryDate: '2026-07-05',
  title: '我们的第五个夏天',
  subtitle: '2021.07.05 - 2026.07.05',
  years: 5,
};
