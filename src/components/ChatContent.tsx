import React from 'react';
import { Layout } from 'antd';
import type { ConsultationMessageResponse } from '../types';
import MessageBubble from './MessageBubble';

const { Content } = Layout;

interface ChatContentProps {
  /** 消息列表 */
  messages: ConsultationMessageResponse[];
  /** 专家头像URL */
  expertAvatarUrl?: string;
  /** 专家名称 */
  expertName?: string;
  /** 当前咨询者ID，用于区分自己/对方 */
  seekerId?: string;
  /** 咨询者名称 */
  seekerName?: string;
  /** 咨询者头像URL */
  seekerAvatarUrl?: string;
  /** 当前用户ID（根据角色确定） */
  myUserId?: string;
  /** 当前用户头像URL */
  myAvatarUrl?: string;
  /** 当前用户是否是专家 */
  isExpert?: boolean | number;
}

/**
 * 聊天内容组件
 * 遍历消息列表并渲染消息气泡
 */
const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  expertAvatarUrl,
  expertName,
  seekerId,
  seekerName,
  seekerAvatarUrl,
  myUserId,
  myAvatarUrl,
  isExpert,
}) => {
  // 动态切换对方信息
  // 如果当前用户是专家，聊天对方是 seeker，否则是 expert
  return (
    <Content
      className="px-6 bg-white flex flex-col"
      style={{
        minHeight: 0,
        flex: '1 1 0%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        height: '100%',
      }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>暂无消息</p>
        </div>
      ) : (
        <div
          className="py-4 space-y-4 flex-1 overflow-y-auto"
          style={{ minHeight: 0, maxHeight: '100%' }}
        >
          {messages.map((message) => {
            const mineId = myUserId || seekerId;
            const isMine = mineId ? String(message.sender_id) === String(mineId) : false;
            let otherName = expertName;
            let otherAvatar = expertAvatarUrl;
            if (isExpert) {
              // 当前用户是专家，对方是咨询者
              otherName = seekerName;
              otherAvatar = seekerAvatarUrl;
            }
            if (isMine) {
              // 自己发的消息，显示自己头像和“我”
              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isSeeker={true}
                  avatarUrl={myAvatarUrl}
                  senderName={'我'}
                />
              );
            } else {
              // 对方发的消息，显示对方头像和名字
              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isSeeker={false}
                  avatarUrl={otherAvatar}
                  senderName={otherName}
                />
              );
            }
          })}
        </div>
      )}
    </Content>
  );
};

export default ChatContent;
