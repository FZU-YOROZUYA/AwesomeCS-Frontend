/**
 * 咨询响应
 */
export interface ConsultationResponse {
  /** 咨询ID */
  id: number;
  /** 专家ID */
  expert_id: number;
  /** 咨询者ID */
  seeker_id: number;
  /** 咨询价格 */
  price: number;
  /** 状态：0-待支付，1-已预约，2-已完成，3-已取消 */
  status: 0 | 1 | 2 | 3;
  /** 预约时间 */
  scheduled_time: string;
  /** 创建时间 */
  created_at: string;
}

/**
 * 咨询消息响应
 */
export interface ConsultationMessageResponse {
  /** 消息ID */
  id: number;
  /** 咨询ID */
  consultation_id: number;
  /** 发送者ID */
  sender_id: number;
  /** 消息内容 */
  content: string;
  /** 消息类型 */
  message_type: string;
  /** 创建时间 */
  created_at: string;
}

/**
 * 咨询关系响应（专家信息）
 */
export interface ConsultationRelationResponse {
  /** 关系ID */
  id: number;
  /** 用户ID */
  user_id: number;
  /** 用户头像URL */
  avatar_url: string;
  /** 咨询价格 */
  price: number;
  /** 领域列表 */
  domains: string[];
  /** 创建时间 */
  created_at: string;
}

/**
 * 创建咨询关系请求
 */
export interface CreateConsultationRelationRequest {
  /** 咨询价格 */
  price: number;
  /** 领域列表 */
  domains: string[];
}

/**
 * 更新咨询关系请求
 */
export interface UpdateConsultationRelationRequest {
  /** 咨询价格 */
  price: number;
  /** 领域列表 */
  domains: string[];
}

/**
 * 预定咨询请求参数
 */
export interface BookConsultationRequest {
  /** 咨询关系ID */
  relation_id: number;
}

/**
 * 支付回调请求参数
 */
export interface PayCallbackRequest {
  /** 咨询ID */
  id: number;
  /** 交易ID */
  transaction_id: string;
}
