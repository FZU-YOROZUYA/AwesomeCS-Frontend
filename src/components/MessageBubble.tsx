import React from 'react';
import type { ConsultationMessageResponse } from '../types';

interface MessageBubbleProps {
  /** 消息数据 */
  message: ConsultationMessageResponse;
  /** 是否为咨询者发送的消息（sender_id === 1） */
  isSeeker: boolean;
  /** 发送者头像URL */
  avatarUrl?: string;
  /** 发送者名称 */
  senderName?: string;
}

/**
 * 消息气泡组件
 * 根据 sender_id 判断消息样式：咨询者（sender_id === 1）为蓝底白字右侧，专家为白底黑字左侧
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isSeeker,
  avatarUrl,
  senderName = '专家',
}) => {
  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  if (isSeeker) {
    // 咨询者消息：蓝底白字，右侧对齐
    return (
      <div className="flex items-start space-x-3 flex-row-reverse">
        <img
          src={avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'}
          alt="用户头像"
          className="w-8 h-8 rounded-full mt-1"
        />
        <div className="flex-1 text-right">
          <div className="flex items-center justify-end space-x-2 mb-1">
            <span className="text-xs text-gray-500">{formatTime(message.created_at)}</span>
            <span className="text-sm font-medium text-gray-900">我</span>
            <i className="fas fa-check-double text-blue-500 text-xs"></i>
          </div>
          <div className="bg-blue-500 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-md inline-block">
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  // 专家消息：白底黑字，左侧对齐
  return (
    <div className="flex items-start space-x-3">
      <img
        src={avatarUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=32&h=32&fit=crop&crop=face'}
        alt="专家头像"
        className="w-8 h-8 rounded-full mt-1"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-gray-900">{senderName}</span>
          <span className="text-xs text-gray-500">{formatTime(message.created_at)}</span>
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3 max-w-md">
          <p className="text-sm text-gray-800">{message.content}</p>
        </div>
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <i className="fas fa-eye mr-1"></i>
          <span>已读</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
