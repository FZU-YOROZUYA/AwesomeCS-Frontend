import React from 'react';
import { Layout, Menu } from 'antd';
import type { ConsultationResponse, ConsultationRelationResponse } from '../types';
import { useConsultation } from '../contexts/ConsultationContext';
import { expertIdToName } from '../mock/mockConsultation';

const { Sider } = Layout;

interface ConsultationSidebarProps {
  /** 咨询列表 */
  consultations: ConsultationResponse[];
  /** 专家关系列表（用于获取专家信息） */
  expertRelations: ConsultationRelationResponse[];
}

/**
 * 咨询聊天侧边栏组件
 * 显示咨询列表，支持切换不同专家的对话
 */
const ConsultationSidebar: React.FC<ConsultationSidebarProps> = ({
  consultations,
  expertRelations,
}) => {
  const { selectedExpert, setSelectedExpert } = useConsultation();

  // 根据咨询列表和专家关系生成菜单项
  const menuItems = consultations.map((consultation) => {
    const expert = expertRelations.find((rel) => rel.user_id === consultation.expert_id);
    const expertName = expert
      ? expertIdToName[consultation.expert_id] || `专家${consultation.expert_id}`
      : `专家${consultation.expert_id}`;

    return {
      key: consultation.id.toString(),
      label: (
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={
                expert?.avatar_url ||
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
              }
              alt="专家头像"
              className="w-10 h-10 rounded-full"
            />
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full ${
                consultation.status === 1 ? 'bg-green-500' : 'bg-gray-400'
              }`}
            ></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 truncate">{expertName}</h3>
              <span className="text-xs text-gray-500">
                {new Date(consultation.created_at).toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate mt-1">
              {consultation.status === 1
                ? '咨询进行中'
                : consultation.status === 2
                  ? '已完成'
                  : '待支付'}
            </p>
          </div>
        </div>
      ),
    };
  });

  const handleMenuClick = ({ key }: { key: string }) => {
    const consultationId = parseInt(key, 10);
    const consultation = consultations.find((c) => c.id === consultationId);
    if (consultation) {
      const expert = expertRelations.find((rel) => rel.user_id === consultation.expert_id);
      if (expert) {
        setSelectedExpert(expert);
      }
    }
  };

  // 默认选择第一个咨询对应的专家
  React.useEffect(() => {
    if (!selectedExpert && consultations.length > 0 && expertRelations.length > 0) {
      const firstConsultation = consultations[0];
      const expert = expertRelations.find((rel) => rel.user_id === firstConsultation.expert_id);
      if (expert) {
        setSelectedExpert(expert);
      }
    }
  }, [selectedExpert, consultations, expertRelations, setSelectedExpert]);

  return (
    <Sider
      width={320}
      theme="light"
      className="bg-white border-r border-gray-200 flex flex-col overflow-hidden"
      style={{ height: '100%', overflow: 'hidden' }}
    >
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">我的咨询</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="搜索专家或消息..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <i className="fas fa-search absolute left-3 top-2.5 text-gray-400 text-sm"></i>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={
            selectedExpert
              ? [
                  consultations
                    .find((c) => c.expert_id === selectedExpert.user_id)
                    ?.id.toString() || '',
                ]
              : []
          }
          onClick={handleMenuClick}
          className="border-none bg-white"
          style={{ backgroundColor: 'white' }}
          items={menuItems}
        />
      </div>
    </Sider>
  );
};

export default ConsultationSidebar;
