/**
 * 聊天消息响应
 */
export interface ChatMessageResponse {
  /** 角色："user" or "assistant" */
  role: 'user' | 'assistant';
  /** 消息内容 */
  content: string;
}

/**
 * 学习路径推荐请求参数
 */
export interface StudyPathRecommendRequest {
  /** 用户输入文本 */
  text?: string;
}
