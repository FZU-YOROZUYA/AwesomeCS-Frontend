import type { ExpertItem } from '../types';

/**
 * 专家列表 Mock 数据
 */
export const mockExpertList: ExpertItem[] = [
  {
    id: '1',
    name: '王技术',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    description:
      '10年前端开发经验，精通 React、Vue、TypeScript，曾就职于多家知名互联网公司，擅长前端架构设计和性能优化。',
    category: '前端',
    price: 299,
    rating: 5,
    consultationCount: 128,
    tags: ['React', 'Vue', 'TypeScript'],
  },
  {
    id: '2',
    name: '李架构',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    description:
      '资深后端架构师，15年Java开发经验，精通微服务架构、分布式系统设计，曾主导多个大型项目的架构设计。',
    category: '后端',
    price: 399,
    rating: 5,
    consultationCount: 256,
    tags: ['Java', '微服务', '架构设计'],
  },
  {
    id: '3',
    name: '张全栈',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
    description:
      '全栈开发专家，精通前后端技术栈，擅长 Node.js、Python、React，有丰富的全栈项目实战经验。',
    category: '全栈',
    price: 349,
    rating: 5,
    consultationCount: 189,
    tags: ['Node.js', 'Python', '全栈'],
  },
  {
    id: '4',
    name: '陈移动',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop&crop=face',
    description:
      '移动端开发专家，8年iOS和Android开发经验，精通 Flutter、React Native，曾开发多款百万级用户应用。',
    category: '移动端',
    price: 329,
    rating: 4,
    consultationCount: 156,
    tags: ['Flutter', 'React Native', '移动端'],
  },
  {
    id: '5',
    name: '周算法',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face',
    description: '算法与数据结构专家，ACM竞赛金牌得主，精通各种算法设计，擅长解决复杂算法问题。',
    category: '算法',
    price: 449,
    rating: 5,
    consultationCount: 98,
    tags: ['算法', '数据结构', '竞赛'],
  },
  {
    id: '6',
    name: '吴数据',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face',
    description:
      '数据库专家，精通 MySQL、PostgreSQL、MongoDB，擅长数据库优化和性能调优，有丰富的数据库架构设计经验。',
    category: '数据库',
    price: 379,
    rating: 5,
    consultationCount: 142,
    tags: ['MySQL', 'PostgreSQL', '数据库优化'],
  },
  {
    id: '7',
    name: '刘设计',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    description: 'UI/UX设计专家，10年设计经验，精通用户体验设计，曾为多家知名公司设计产品界面。',
    category: '设计',
    price: 279,
    rating: 4,
    consultationCount: 203,
    tags: ['UI设计', 'UX设计', '产品设计'],
  },
  {
    id: '8',
    name: '赵产品',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    description:
      '产品经理专家，12年产品经验，擅长产品规划、需求分析、用户体验设计，曾主导多个成功产品。',
    category: '产品',
    price: 319,
    rating: 5,
    consultationCount: 167,
    tags: ['产品规划', '需求分析', '用户体验'],
  },
  {
    id: '9',
    name: '孙运维',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    description:
      'DevOps专家，精通 Docker、Kubernetes、CI/CD，擅长云原生架构和自动化运维，有丰富的运维实战经验。',
    category: '运维',
    price: 359,
    rating: 5,
    consultationCount: 134,
    tags: ['Docker', 'Kubernetes', 'DevOps'],
  },
  {
    id: '10',
    name: '钱前端',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    description:
      '前端性能优化专家，精通前端工程化、构建工具、性能优化，擅长解决复杂的前端技术难题。',
    category: '前端',
    price: 329,
    rating: 5,
    consultationCount: 178,
    tags: ['性能优化', '工程化', '构建工具'],
  },
  {
    id: '11',
    name: '郑后端',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    description:
      'Go语言专家，精通 Go、微服务架构、高并发系统设计，有丰富的大型分布式系统开发经验。',
    category: '后端',
    price: 389,
    rating: 5,
    consultationCount: 145,
    tags: ['Go', '微服务', '高并发'],
  },
  {
    id: '12',
    name: '冯全栈',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    description:
      'Python全栈专家，精通 Django、Flask、FastAPI，擅长Web开发和数据分析，有丰富的全栈项目经验。',
    category: '全栈',
    price: 339,
    rating: 4,
    consultationCount: 192,
    tags: ['Python', 'Django', '数据分析'],
  },
];

