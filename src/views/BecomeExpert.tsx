import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;

const BecomeExpert: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price: '',
    introduction: '',
  });
  const [consultationRelationsId, setConsultationRelationsId] = useState<string | null>(null);
  const [isExpert, setIsExpert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);

  const fetchBeen = useCallback(async () => {
    try {
      const res = await axios.get('/api/consultation-relations/been');
      const id = res?.data?.data ?? res?.data;
      if (id !== undefined && id !== null) {
        const strId = String(id);
        setConsultationRelationsId(strId);
        setIsExpert(strId !== '-1' && strId !== '');
      }
    } catch (err) {
      console.error('fetch consultation-relations/been error', err);
    }
  }, []);

  const handleSubmit = async () => {
    if (!formData.price || !formData.introduction) {
      message.error('请填写必填项');
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        price: formData.price,
        info: formData.introduction,
      };

      let res;
      if (!isExpert || !consultationRelationsId || consultationRelationsId === '-1') {
        res = await axios.post('/api/consultation-relations', payload);
      } else {
        res = await axios.put(`/api/consultation-relations/${consultationRelationsId}`, payload);
      }

      // 如果返回新的 id，保存起来（状态仍以 /been 接口为准）
      const newId = res?.data?.data || res?.data?.id;
      if (newId) setConsultationRelationsId(String(newId));

      // 重新拉取是否已是专家的状态
      await fetchBeen();

      message.success('申请已提交，我们会尽快审核');
      navigate('/expert-list');
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.message || '提交失败';
      message.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBeen();
  }, [fetchBeen]);

  useEffect(() => {
    const fetchDetail = async () => {
      // 只有已是专家且拿到有效 id 时才拉取详情
      if (!isExpert) return;
      if (!consultationRelationsId || consultationRelationsId === '-1') return;
      setIsFetchingDetail(true);
      try {
        const res = await axios.get(`/api/consultation-relations/${consultationRelationsId}`);
        const data = res?.data?.data ?? res?.data;
        if (data) {
          setFormData({
            price: data.price ?? '',
            introduction: data.info ?? '',
          });
          // 若接口返回 id 也同步存储
          if (data.consultation_relations_id) {
            setConsultationRelationsId(String(data.consultation_relations_id));
          }
        }
      } catch (err) {
        console.error('fetch consultation-relations detail error', err);
      } finally {
        setIsFetchingDetail(false);
      }
    };

    fetchDetail();
  }, [isExpert, consultationRelationsId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">成为专家</h1>
          <p className="text-gray-600">分享您的专业知识，帮助更多人成长</p>
        </div>

        {/* 表单卡片 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* 价格与介绍 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">咨询信息</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    单次咨询价格（元） <span className="text-red-500">*</span>
                  </label>
                  <Input
                    size="large"
                    type="number"
                    placeholder="请输入单次咨询价格"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">个人咨询介绍 <span className="text-red-500">*</span></label>
                  <TextArea
                    rows={6}
                    placeholder="请介绍你的咨询方向、可提供的帮助、擅长领域等"
                    value={formData.introduction}
                    onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-2">尽量写清你的优势、可解答的问题类型</p>
                </div>
              </div>
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
              <Button size="large" onClick={() => window.history.back()}>
                取消
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
                loading={isLoading || isFetchingDetail}
              >
                {isExpert ? '修改专家信息' : '我要成为专家'}
              </Button>
            </div>
          </div>
        </div>

        {/* 说明信息 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <i className="fas fa-info-circle text-blue-600 mt-0.5"></i>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">申请说明</p>
              <ul className="list-disc list-inside space-y-1">
                <li>提交申请后，我们会在3个工作日内完成审核</li>
                <li>审核通过后，您将收到邮件通知</li>
                <li>成为专家后，您可以在平台上提供付费咨询服务</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeExpert;
