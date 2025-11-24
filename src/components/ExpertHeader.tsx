import React, { useMemo } from 'react';
import { Layout } from 'antd';
import { useConsultation } from '../contexts/ConsultationContext';
import { expertIdToName, mockConsultationList } from '../mock/mockConsultation';

const { Header } = Layout;

/**
 * 专家头部组件
 * 显示当前选中的专家信息，使用 Context 获取选中的专家
 */
const ExpertHeader: React.FC = () => {
  const { selectedExpert } = useConsultation();

  // 根据选中的专家找到对应的咨询
  const currentConsultation = useMemo(() => {
    if (!selectedExpert) return null;
    return mockConsultationList.find((c) => c.expert_id === selectedExpert.user_id) || null;
  }, [selectedExpert]);

  const price = currentConsultation?.price;
  const status = currentConsultation?.status;

  if (!selectedExpert) {
    return (
      <Header
        className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white flex-shrink-0"
        style={{ backgroundColor: 'white', height: '64px', flexShrink: 0 }}
      >
        <div className="text-gray-500">请选择咨询</div>
      </Header>
    );
  }

  const expertName = expertIdToName[selectedExpert.user_id] || `专家${selectedExpert.user_id}`;
  const isActive = status === 1; // 咨询进行中

  return (
    <Header
      className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white flex-shrink-0"
      style={{ backgroundColor: 'white', height: '64px', flexShrink: 0 }}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img src={selectedExpert.avatar_url} alt="专家头像" className="w-10 h-10 rounded-full" />
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full ${
              isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{expertName}</h3>
          <p className={`text-xs ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
            {isActive ? '在线 · 平均5分钟内回复' : '离线'}
          </p>
        </div>
      </div>

      {price !== undefined && status === 1 && (
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-lg">
            <i className="fas fa-clock text-blue-600 text-sm"></i>
            <span className="text-sm font-medium text-blue-700">23:45</span>
            <span className="text-xs text-blue-600">¥{price}</span>
          </div>

          <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
            结束咨询
          </button>
        </div>
      )}
    </Header>
  );
};

export default ExpertHeader;
