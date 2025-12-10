import React, { useState } from 'react';
import { Layout } from 'antd';
import { SmileOutlined, PaperClipOutlined, PictureOutlined, SendOutlined } from '@ant-design/icons';

const { Footer } = Layout;

interface ChatInputProps {
  /** 发送消息的回调函数 */
  onSend?: (message: string) => void;
  /** 是否禁用输入 */
  disabled?: boolean;
}

/**
 * 聊天输入框组件
 * 包含表情、附件、图片等快捷按钮和消息输入框
 */
const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Footer
      className="border-t border-gray-200 p-4 bg-white flex-shrink-0"
      style={{ backgroundColor: 'white', flexShrink: 0 }}
    >
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            placeholder="输入消息..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <SendOutlined className="text-sm" />
        </button>
      </div>
    </Footer>
  );
};

export default ChatInput;
