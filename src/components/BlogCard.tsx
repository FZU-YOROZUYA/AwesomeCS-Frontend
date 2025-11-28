import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { BlogItem } from '../types';

interface BlogCardProps {
  /** 博客领域分类 */
  category: BlogItem['category'];
  /** 博客标题 */
  title: string;
  /** 博客内容摘要 */
  content: string;
  /** 博客作者名称 */
  author: string;
  /** 博客作者头像URL */
  authorAvatar: string;
  /** 博客发表时间 */
  publishTime: string;
  /** 点赞数量 */
  likeCount: number;
  /** 评论数量 */
  commentCount: number;
  /** 浏览量（可选） */
  viewCount?: number;
  /** 博客详情页路由路径 */
  detailPath?: string;
  /** 博客 id（优先用于跳转） */
  postId?: number | string;
}

/**
 * 博客卡片组件
 * 用于展示博客列表中的单个博客项
 */
const BlogCard: React.FC<BlogCardProps> = ({
  category,
  title,
  content,
  author,
  authorAvatar,
  publishTime,
  likeCount,
  commentCount,
  viewCount,
  detailPath,
  postId,
}) => {
  const navigate = useNavigate();

  // 计算相对时间
  const getRelativeTime = (timeStr: string): string => {
    const publishDate = new Date(timeStr);
    const now = new Date();
    const diffTime = now.getTime() - publishDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return '今天';
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks}周前`;
    } else {
      return timeStr;
    }
  };

  // 获取分类对应的颜色样式
  const getCategoryColor = (cat: string): string => {
    const colorMap: Record<string, string> = {
      前端: 'bg-green-100 text-green-700',
      后端: 'bg-blue-100 text-blue-700',
      全栈: 'bg-purple-100 text-purple-700',
      移动端: 'bg-orange-100 text-orange-700',
      算法: 'bg-red-100 text-red-700',
      数据库: 'bg-yellow-100 text-yellow-700',
      运维: 'bg-indigo-100 text-indigo-700',
      其他: 'bg-gray-100 text-gray-700',
    };
    return colorMap[cat] || colorMap['其他'];
  };

  const handleCardClick = () => {
    // if (detailPath) {
    //   navigate(detailPath);
    //   return;
    // }
    console.log('Card clicked:', { detailPath, postId });
    
    if (postId !== undefined && postId !== null) {
      navigate(`/blog-detail/${postId}`);
      return;
    }
  };

  return (
    <article
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
        {title}
      </h2>
      <div className="flex items-center space-x-4 mb-3">
        <img
          src={authorAvatar}
          alt={`${author}的头像`}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm text-gray-600">{author}</span>
        <span className="text-sm text-gray-400">{getRelativeTime(publishTime)}</span>
        <span className={`px-2 py-1 ${getCategoryColor(category)} text-xs rounded-full`}>
          {category}
        </span>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{content}</p>
      <div className="flex items-center space-x-6 text-sm text-gray-500">
        <span className="flex items-center">
          <i className="far fa-thumbs-up mr-1"></i> {likeCount}
        </span>
        <span className="flex items-center">
          <i className="far fa-comment mr-1"></i> {commentCount}
        </span>
        {viewCount !== undefined && (
          <span className="flex items-center">
            <i className="far fa-eye mr-1"></i> {viewCount >= 1000 ? `${(viewCount / 1000).toFixed(1)}k` : viewCount}
          </span>
        )}
      </div>
    </article>
  );
};

export default BlogCard;


