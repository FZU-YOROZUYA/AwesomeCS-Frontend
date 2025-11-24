import type { PageRequest } from './api';

/**
 * 文章摘要响应
 */
export interface PostSummaryResponse {
  /** 文章ID */
  id: number;
  /** 文章标题 */
  title: string;
  /** 文章摘要 */
  summary: string;
  /** 作者ID */
  author: string;
  /** 创建时间 */
  create_time: string;
  /** 浏览量 */
  view_count: number;
}

/**
 * 文章详情响应
 */
export interface PostDetailResponse {
  /** 文章ID */
  id: number;
  /** 文章标题 */
  title: string;
  /** 文章内容 */
  content: string;
  /** 作者ID */
  author: string;
  /** 标签列表 */
  tags: string[];
  /** 创建时间 */
  create_time: string;
  /** 点赞数 */
  like_count: number;
  /** 是否已点赞 */
  is_liked: boolean;
}

/**
 * 创建文章请求
 */
export interface CreatePostRequest {
  /** 文章标题 */
  title: string;
  /** 文章内容 */
  content: string;
  /** 文章摘要 */
  summary?: string;
  /** 文章分类 */
  category: string;
  /** 标签列表 */
  tags: string[];
  /** 状态：0-草稿，1-发布 */
  status: 0 | 1;
}

/**
 * 更新文章请求
 */
export interface UpdatePostRequest {
  /** 文章标题 */
  title: string;
  /** 文章内容 */
  content: string;
  /** 文章摘要 */
  summary?: string;
  /** 文章分类 */
  category: string;
  /** 标签列表 */
  tags: string[];
  /** 状态：0-草稿，1-发布 */
  status: 0 | 1;
}

/**
 * 评论响应
 */
export interface CommentResponse {
  /** 评论ID */
  id: number;
  /** 评论内容 */
  content: string;
  /** 用户头像 */
  avatar: string;
  /** 回复列表 */
  replies: CommentResponse[] | null;
  /** 文章ID */
  post_id: number;
  /** 用户ID */
  user_id: number;
  /** 创建时间 */
  created_at: string;
  /** 用户名 */
  user_name: string;
}

/**
 * 创建评论请求
 */
export interface CreateCommentRequest {
  /** 父评论ID，可为空，回复时传入父评论ID */
  parent_id?: number;
  /** 评论内容 */
  content: string;
}

/**
 * 文章列表查询参数
 */
export interface PostListQuery extends PageRequest {
  /** 关键词搜索 */
  keyword?: string;
}
