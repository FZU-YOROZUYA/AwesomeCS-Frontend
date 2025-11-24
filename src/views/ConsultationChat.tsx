import React, { useMemo } from 'react';
import { Layout } from 'antd';
import { ConsultationProvider, useConsultation } from '../contexts/ConsultationContext';
import ConsultationSidebar from '../components/ConsultationSidebar';
import ExpertHeader from '../components/ExpertHeader';
import ChatContent from '../components/ChatContent';
import ChatInput from '../components/ChatInput';
import {
  mockConsultationList,
  mockExpertRelations,
  mockConsultationMessages,
  expertIdToName,
} from '../mock/mockConsultation';

const { Content } = Layout;

/**
 * 咨询聊天内容组件（内部组件，使用 Context）
 */
const ConsultationChatContent: React.FC = () => {
  const { selectedExpert } = useConsultation();

  // 根据选中的专家获取当前咨询和消息
  const currentConsultation = useMemo(() => {
    if (!selectedExpert) return null;
    return mockConsultationList.find((c) => c.expert_id === selectedExpert.user_id) || null;
  }, [selectedExpert]);

  const currentMessages = useMemo(() => {
    if (!currentConsultation) return [];
    return mockConsultationMessages[currentConsultation.id] || [];
  }, [currentConsultation]);

  const handleSendMessage = (message: string) => {
    console.log('发送消息:', message);
    // TODO: 实现发送消息的逻辑
  };

  if (!selectedExpert || !currentConsultation) {
    return (
      <Content
        className="flex-1 flex items-center justify-center bg-white"
        style={{ overflow: 'hidden' }}
      >
        <div className="text-gray-500">请从左侧选择咨询</div>
      </Content>
    );
  }

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {currentConsultation.status === 1 && (
        <div
          className="bg-yellow-50 border-t border-yellow-200 px-6 py-2 flex-shrink-0"
          style={{ flexShrink: 0 }}
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-yellow-700">
              <i className="fas fa-info-circle"></i>
              <span>咨询进行中 · 按分钟计费 ¥{currentConsultation.price}/小时</span>
            </div>
            <div className="text-yellow-700 font-medium">当前费用: ¥180</div>
          </div>
        </div>
      )}

      <div style={{ flex: '1 1 0%', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <ChatContent
          messages={currentMessages}
          expertAvatarUrl={selectedExpert.avatar_url}
          expertName={expertIdToName[selectedExpert.user_id]}
        />
      </div>

      <div style={{ flexShrink: 0 }}>
        <ChatInput onSend={handleSendMessage} disabled={currentConsultation.status !== 1} />
      </div>
    </div>
  );
};

/**
 * 咨询聊天页面主组件
 * 使用 Ant Design Layout 组件构建：Sider + Header + Content + Footer
 */
const ConsultationChat: React.FC = () => {
  return (
    <ConsultationProvider>
      <Layout
        style={{
          overflow: 'hidden',
          height: '100vh',
          display: 'flex',
          maxHeight: '100vh',
        }}
      >
        <ConsultationSidebar
          consultations={mockConsultationList}
          expertRelations={mockExpertRelations}
        />

        <Layout
          className="flex-1 flex flex-col bg-white"
          style={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxHeight: '100%',
          }}
        >
          <ExpertHeader />
          <ConsultationChatContent />
        </Layout>
      </Layout>
    </ConsultationProvider>
  );
};

export default ConsultationChat;
