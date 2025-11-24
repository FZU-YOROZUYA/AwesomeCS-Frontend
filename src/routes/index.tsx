import type { ReactElement } from 'react';
import BlogHome from '../views/BlogHome';
import BlogDetail from '../views/BlogDetail';
import AIInterviewCreate from '../views/AIInterviewCreate';
import LearningPath from '../views/LearningPath';
import ExpertList from '../views/ExpertList';
import ConsultationChat from '../views/ConsultationChat';
import PersonalInfo from '../views/PersonalInfo';
import WriteBlog from '../views/WriteBlog';
import BecomeExpert from '../views/BecomeExpert';
import MyBlogs from '../views/MyBlogs';
import LikeHistory from '../views/LikeHistory';
import AccountSettings from '../views/AccountSettings';
import { PersonalInfoContent } from '../views/PersonalInfo';

// 路由表项接口
export interface RouteItem {
  name: string;
  path: string;
  element: ReactElement;
}

// 个人信息子路由配置
export interface PersonalInfoRouteItem {
  name: string;
  path: string;
  element: ReactElement;
}

export const personalInfoRoutes: PersonalInfoRouteItem[] = [
  {
    name: '个人信息',
    path: '',
    element: <PersonalInfoContent />,
  },
  {
    name: '我的博客',
    path: 'my-blogs',
    element: <MyBlogs />,
  },
  {
    name: '点赞历史',
    path: 'like-history',
    element: <LikeHistory />,
  },
  {
    name: '写博客',
    path: 'write-blog',
    element: <WriteBlog />,
  },
  {
    name: '账号设置',
    path: 'account-settings',
    element: <AccountSettings />,
  },
];

// 路由表配置（子路由，不包含根路由）
export const routes: RouteItem[] = [
  {
    name: '首页',
    path: 'blog-home',
    element: <BlogHome />,
  },
  {
    name: '博客详情',
    path: 'blog-detail/:id',
    element: <BlogDetail />,
  },
  {
    name: 'AI面试',
    path: 'ai-interview-create',
    element: <AIInterviewCreate />,
  },
  {
    name: '学习路线',
    path: 'learning-path',
    element: <LearningPath />,
  },
  {
    name: '付费咨询',
    path: 'expert-list',
    element: <ExpertList />,
  },
  {
    name: '咨询聊天',
    path: 'consultation-chat',
    element: <ConsultationChat />,
  },
  {
    name: '个人信息',
    path: 'personal-info',
    element: <PersonalInfo />,
  },
  {
    name: '成为专家',
    path: 'become-expert',
    element: <BecomeExpert />,
  },
];
