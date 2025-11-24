import type {
  ConsultationResponse,
  ConsultationMessageResponse,
  ConsultationRelationResponse,
} from '../types';

/**
 * 咨询列表 Mock 数据
 */
export const mockConsultationList: ConsultationResponse[] = [
  {
    id: 1,
    expert_id: 2,
    seeker_id: 1,
    price: 299,
    status: 1,
    scheduled_time: '2024-01-15 10:00:00',
    created_at: '2024-01-15 09:30:00',
  },
  {
    id: 2,
    expert_id: 3,
    seeker_id: 1,
    price: 399,
    status: 1,
    scheduled_time: '2024-01-14 14:00:00',
    created_at: '2024-01-14 13:30:00',
  },
  {
    id: 3,
    expert_id: 4,
    seeker_id: 1,
    price: 329,
    status: 2,
    scheduled_time: '2024-01-13 16:00:00',
    created_at: '2024-01-13 15:30:00',
  },
];

/**
 * 专家信息 Mock 数据（用于侧边栏和 Header）
 * 注意：user_id 对应 expert_id，用于关联咨询和专家
 */
export const mockExpertRelations: ConsultationRelationResponse[] = [
  {
    id: 1,
    user_id: 2,
    avatar_url:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face',
    price: 299,
    domains: ['前端', 'React', 'Vue'],
    created_at: '2024-01-10',
  },
  {
    id: 2,
    user_id: 3,
    avatar_url:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face',
    price: 399,
    domains: ['后端', 'Java', '微服务'],
    created_at: '2024-01-08',
  },
  {
    id: 3,
    user_id: 4,
    avatar_url:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    price: 329,
    domains: ['全栈', 'Node.js', 'Python'],
    created_at: '2024-01-05',
  },
];

/**
 * 专家ID到名称的映射（用于显示专家名称）
 */
export const expertIdToName: Record<number, string> = {
  2: '李博士',
  3: '王教授',
  4: '张全栈',
};

/**
 * 咨询消息 Mock 数据
 * 注意：sender_id 为 1 表示咨询者发送的消息，不为 1 表示专家发送的消息
 */
export const mockConsultationMessages: Record<number, ConsultationMessageResponse[]> = {
  1: [
    {
      id: 1,
      consultation_id: 1,
      sender_id: 2, // 专家发送
      content: '您好！我是李博士，很高兴为您提供咨询服务。请问您今天想咨询什么问题呢？',
      message_type: 'text',
      created_at: '2024-01-15 10:30:00',
    },
    {
      id: 2,
      consultation_id: 1,
      sender_id: 1, // 咨询者发送
      content:
        '您好李博士！我想咨询一下关于前端架构设计的问题，最近想重构我们的项目，但是不太了解应该如何开始。',
      message_type: 'text',
      created_at: '2024-01-15 10:31:00',
    },
    {
      id: 3,
      consultation_id: 1,
      sender_id: 2, // 专家发送
      content: '好的，前端架构设计确实需要合理规划。首先我需要了解一下您的基本情况：',
      message_type: 'text',
      created_at: '2024-01-15 10:32:00',
    },
    {
      id: 4,
      consultation_id: 1,
      sender_id: 1, // 咨询者发送
      content: '我们团队有5个人，主要使用 React，项目规模中等，想要提升代码的可维护性和性能。',
      message_type: 'text',
      created_at: '2024-01-15 10:33:00',
    },
    {
      id: 5,
      consultation_id: 1,
      sender_id: 2, // 专家发送
      content:
        '明白了。我建议从以下几个方面入手：1. 组件化设计 2. 状态管理 3. 性能优化 4. 代码规范。我们可以详细讨论每个方面。',
      message_type: 'text',
      created_at: '2024-01-15 10:35:00',
    },
    {
      id: 1,
      consultation_id: 1,
      sender_id: 2, // 专家发送
      content: '您好！我是李博士，很高兴为您提供咨询服务。请问您今天想咨询什么问题呢？',
      message_type: 'text',
      created_at: '2024-01-15 10:30:00',
    },
    {
      id: 2,
      consultation_id: 1,
      sender_id: 1, // 咨询者发送
      content:
        '您好李博士！我想咨询一下关于前端架构设计的问题，最近想重构我们的项目，但是不太了解应该如何开始。',
      message_type: 'text',
      created_at: '2024-01-15 10:31:00',
    },
    {
      id: 3,
      consultation_id: 1,
      sender_id: 2, // 专家发送
      content: '好的，前端架构设计确实需要合理规划。首先我需要了解一下您的基本情况：',
      message_type: 'text',
      created_at: '2024-01-15 10:32:00',
    },
    {
      id: 4,
      consultation_id: 1,
      sender_id: 1, // 咨询者发送
      content: '我们团队有5个人，主要使用 React，项目规模中等，想要提升代码的可维护性和性能。',
      message_type: 'text',
      created_at: '2024-01-15 10:33:00',
    },
    {
      id: 5,
      consultation_id: 1,
      sender_id: 2, // 专家发送
      content:
        '明白了。我建议从以下几个方面入手：1. 组件化设计 2. 状态管理 3. 性能优化 4. 代码规范。我们可以详细讨论每个方面。',
      message_type: 'text',
      created_at: '2024-01-15 10:35:00',
    },
  ],
  2: [
    {
      id: 6,
      consultation_id: 2,
      sender_id: 3, // 专家发送
      content: '您好！我是王教授，很高兴为您提供咨询服务。',
      message_type: 'text',
      created_at: '2024-01-14 14:00:00',
    },
    {
      id: 7,
      consultation_id: 2,
      sender_id: 1, // 咨询者发送
      content: '您好！我想咨询一下关于微服务架构的问题。',
      message_type: 'text',
      created_at: '2024-01-14 14:05:00',
    },
  ],
  3: [
    {
      id: 8,
      consultation_id: 3,
      sender_id: 4, // 专家发送
      content: '谢谢您的咨询，有问题随时联系。',
      message_type: 'text',
      created_at: '2024-01-13 16:30:00',
    },
  ],
};
