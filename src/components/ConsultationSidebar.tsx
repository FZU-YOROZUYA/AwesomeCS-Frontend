import React from 'react';
import { Layout, Menu } from 'antd';
import type { ConsultationResponse } from '../types';
import { useConsultation } from '../contexts/ConsultationContext';

const { Sider } = Layout;

interface ConsultationSidebarProps {
  /** 咨询列表 */
  consultations: ConsultationResponse[];
}

/**
 * 咨询聊天侧边栏组件
 * 显示咨询列表，支持切换不同专家的对话
 */
const ConsultationSidebar: React.FC<ConsultationSidebarProps> = ({ consultations }) => {
  const { selectedConsultation, setSelectedConsultation } = useConsultation();

  // 根据咨询列表和专家关系生成菜单项
  const menuItems = consultations.map((consultation) => {
    // 动态显示对方信息
    const isExpert = consultation.is_expert;
    const baseName = isExpert
      ? consultation.seeker_name || `用户${consultation.seeker_id}`
      : consultation.expert_name || `专家${consultation.expert_id}`;
    const roleSuffix = isExpert ? '【用户】' : '【专家】';
    const otherName = `${baseName}${roleSuffix}`;
    const otherAvatar = isExpert ? consultation.seeker_avatar : consultation.expert_avatar;
    return {
      key: consultation.consultation_id.toString(),
      label: (
        <div className="flex items-center space-x-3">
          <img
            src={
              otherAvatar ||
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
            }
            alt="对方头像"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {otherName}
              </h3>
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
    const consultation = consultations.find((c) => c.consultation_id === key);
    if (consultation) {
      setSelectedConsultation(consultation);
    }
  };

  // 默认选择第一个咨询对应的专家
  React.useEffect(() => {
    if (!selectedConsultation && consultations.length > 0) {
      setSelectedConsultation(consultations[0]);
    }
  }, [selectedConsultation, consultations, setSelectedConsultation]);

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
          selectedKeys={selectedConsultation ? [selectedConsultation.consultation_id] : []}
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
