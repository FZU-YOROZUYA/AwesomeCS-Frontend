import React from 'react';
import { Layout } from 'antd';
import type { ConsultationMessageResponse } from '../types';
import MessageBubble from './MessageBubble';
import { expertIdToName } from '../mock/mockConsultation';

const { Content } = Layout;

interface ChatContentProps {
  /** 消息列表 */
  messages: ConsultationMessageResponse[];
  /** 专家头像URL */
  expertAvatarUrl?: string;
  /** 专家名称 */
  expertName?: string;
}

/**
 * 聊天内容组件
 * 遍历消息列表并渲染消息气泡
 */
const ChatContent: React.FC<ChatContentProps> = ({ messages, expertAvatarUrl, expertName }) => {
  return (
    <Content
      className="px-6 bg-white"
      style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: 0,
        flex: '1 1 0%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
      }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>暂无消息</p>
        </div>
      ) : (
        <div className="py-4 space-y-4">
          {messages.map((message) => {
            const isSeeker = message.sender_id === 1;
            const senderName = isSeeker
              ? undefined
              : expertName || expertIdToName[message.sender_id] || '专家';
            const avatarUrl = isSeeker ? undefined : expertAvatarUrl;

            return (
              <MessageBubble
                key={message.id}
                message={message}
                isSeeker={isSeeker}
                avatarUrl={avatarUrl}
                senderName={senderName}
              />
            );
          })}
        </div>
      )}
    </Content>
  );
};

export default ChatContent;
