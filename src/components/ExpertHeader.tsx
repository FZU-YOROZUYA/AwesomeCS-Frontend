import React, { useState } from 'react';
import { Layout, message } from 'antd';
import axios from 'axios';
import { useConsultation } from '../contexts/ConsultationContext';

const { Header } = Layout;

/**
 * 专家头部组件
 * 显示当前选中的专家信息，使用 Context 获取选中的专家
 */
const ExpertHeader: React.FC = () => {
  const [ending, setEnding] = useState(false);
  const { selectedConsultation } = useConsultation();

  if (!selectedConsultation) {
    return (
      <Header
        className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white flex-shrink-0"
        style={{ backgroundColor: 'white', height: '64px', flexShrink: 0 }}
      >
        <div className="text-gray-500">请选择咨询</div>
      </Header>
    );
  }

  // 当前聊天对方：如果我是专家，展示咨询者；否则展示专家
  const isExpert = !!selectedConsultation.is_expert;
  const otherName = isExpert
    ? selectedConsultation.seeker_name || `用户${selectedConsultation.seeker_id}`
    : selectedConsultation.expert_name || `专家${selectedConsultation.expert_id}`;
  const otherAvatar = isExpert
    ? selectedConsultation.seeker_avatar
    : selectedConsultation.expert_avatar;

  const isCompleted = selectedConsultation.status === 2;

  const handleAction = async () => {
    if (!selectedConsultation || ending) return;
    setEnding(true);
    try {
      if (isCompleted) {
        await axios.post(
          `/api/consultations/${selectedConsultation.consultation_id}/pay-callback`,
          null,
          { params: { transaction_id: 1 } },
        );
        message.success('已发起再次咨询');
      } else {
        await axios.put(`/api/consultations/${selectedConsultation.consultation_id}/end`);
        message.success('已结束咨询');
      }
    } catch (err) {
      console.error('consultation action failed', err);
      message.error(isCompleted ? '再次咨询失败' : '结束咨询失败');
    } finally {
      setEnding(false);
    }
  };

  return (
    <Header
      className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white flex-shrink-0"
      style={{ backgroundColor: 'white', height: '64px', flexShrink: 0 }}
    >
      <div className="flex items-center space-x-3">
        <img
          src={otherAvatar}
          alt="对方头像"
          className="w-10 h-10 rounded-full"
        />
        <h3 className="text-sm font-semibold text-gray-900">{otherName}</h3>
      </div>

      {!isExpert && (
        <button
          className={
            `px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60 ` +
            (isCompleted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600')
          }
          onClick={handleAction}
          disabled={ending}
        >
          {ending ? '处理中...' : isCompleted ? '再次咨询' : '结束咨询'}
        </button>
      )}

    </Header>
  );
};

export default ExpertHeader;
