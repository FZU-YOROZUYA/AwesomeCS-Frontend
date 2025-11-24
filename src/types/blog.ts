/**
 * 博客领域类型
 */
export type BlogCategory = '前端' | '后端' | '全栈' | '移动端' | '算法' | '数据库' | '运维' | '其他';

/**
 * 博客数据接口
 */
export interface BlogItem {
  /** 博客唯一标识ID */
  id: string;
  /** 博客标题 */
  title: string;
  /** 博客内容摘要 */
  content: string;
  /** 博客作者名称 */
  author: string;
  /** 博客作者头像URL */
  authorAvatar: string;
  /** 博客发表时间（格式：YYYY-MM-DD） */
  publishTime: string;
  /** 博客领域分类 */
  category: BlogCategory;
  /** 点赞数量 */
  likeCount: number;
  /** 评论数量 */
  commentCount: number;
  /** 浏览量 */
  viewCount?: number;
  /** 博客详情页路由路径 */
  detailPath?: string;
}

