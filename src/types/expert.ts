/**
 * 专家领域类型
 */
export type ExpertCategory =
  | '前端'
  | '后端'
  | '全栈'
  | '移动端'
  | '算法'
  | '数据库'
  | '运维'
  | '设计'
  | '产品'
  | '其他';

/**
 * 专家数据接口
 */
export interface ExpertItem {
  /** 专家唯一标识ID */
  id: string;
  /** 专家姓名 */
  name: string;
  /** 专家头像URL */
  avatar: string;
  /** 专家简介 */
  description: string;
  /** 专家领域分类 */
  category: ExpertCategory;
  /** 咨询价格（单位：元/小时） */
  price: number;
  /** 评分（1-5星） */
  rating?: number;
  /** 咨询次数 */
  consultationCount?: number;
  /** 专家标签 */
  tags?: string[];
}

