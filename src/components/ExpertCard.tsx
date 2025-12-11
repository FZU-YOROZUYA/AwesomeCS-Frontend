import React from 'react';
import axios from 'axios';
import { StarFilled } from '@ant-design/icons';

interface ExpertCardProps {
  /** 专家头像URL */
  avatar: string;
  /** 专家姓名 */
  name: string;
  /** 专家简介 */
  description: string;
  /** 咨询价格（单位：元/小时） */
  price: number;
  /** 专家领域分类 */
  category?: string;
  /** 评分（1-5星） */
  rating?: number;
  /** 咨询次数 */
  consultationCount?: number;
  /** 专家标签 */
  tags?: string[];
  /** 咨询关系ID */
  relationId?: string;
}

/**
 * 专家卡片组件
 * 用于展示专家列表中的单个专家项
 */
const ExpertCard: React.FC<ExpertCardProps> = ({
  avatar,
  name,
  description,
  price,
  category,
  rating = 5,
  consultationCount,
  tags,
  relationId,
}) => {
  // 渲染评分星星
  const renderRating = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarFilled
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
          style={{ fontSize: '14px' }}
        />
      );
    }
    return <div className="flex items-center">{stars}</div>;
  };

  const handleConsult = async () => {
    if (!relationId) {
      alert('缺少咨询关系ID，无法发起咨询');
      return;
    }

    try {
      // 1. 预约接口
      const bookRes = await axios.post('/api/consultations/book', null, {
        params: { relation_id: relationId },
      });
      const bookData = bookRes?.data || {};
      if (bookData.code === '0020' && bookData.info === '已有此咨询') {
        window.location.href = '/consultation-chat';
        return;
      }
      const consultationId = bookData.data?.id ?? bookData.data;
      if (!consultationId) {
        alert('预约失败，未获取到咨询ID');
        return;
      }
      // 2. 支付回调
      await axios.post(`/api/consultations/${consultationId}/pay-callback`, null, {
        params: { transaction_id: 1 },
      });
      // 3. 跳转
      window.location.href = '/consultation-chat';
    } catch (err) {
      alert('操作失败，请稍后重试');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={`${name}的头像`}
          className="w-12 h-12 rounded-full mr-3 object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          {rating && <div className="flex items-center mt-1">{renderRating()}</div>}
        </div>
      </div>

      {category && (
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
            {category}
          </span>
        </div>
      )}

      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{description}</p>

      {tags && tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <span className="text-2xl font-bold text-orange-600">￥{price}</span>
      </div>

      {consultationCount !== undefined && (
        <div className="text-xs text-gray-500 mb-3">已咨询 {consultationCount} 次</div>
      )}

      <button
        onClick={handleConsult}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
      >
        立即咨询
      </button>
    </div>
  );
};

export default ExpertCard;
