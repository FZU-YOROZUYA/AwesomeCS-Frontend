import React, { useEffect, useState } from 'react';
import ExpertCard from '../components/ExpertCard';
import { Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

// 将返回中的大整数字段转为字符串，避免精度丢失
const safeParseResponse = (data: string) => {
  try {
    const patched = data
      .replace(/"id"\s*:\s*(\d{15,})/g, '"id":"$1"')
      .replace(/"user_id"\s*:\s*(\d{15,})/g, '"user_id":"$1"');
    return JSON.parse(patched);
  } catch (err) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
};

const ExpertList: React.FC = () => {
  const navigate = useNavigate();
  const [isExpert, setIsExpert] = useState(false);
  const [experts, setExperts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(8);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBeen = async () => {
      try {
        const res = await axios.get('/api/consultation-relations/been');
        const id = res?.data?.data ?? res?.data;
        if (id !== undefined && id !== null) {
          const strId = String(id);
          setIsExpert(strId !== '-1' && strId !== '');
        }
      } catch (err) {
        console.error('fetch consultation-relations/been error', err);
      }
    };

    fetchBeen();
  }, []);

  useEffect(() => {
    const fetchExperts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/consultation-relations', {
          params: { page, size },
          transformResponse: [
            (data) => {
              if (typeof data === 'string') return safeParseResponse(data);
              return data;
            },
          ],
        });
        const data = res?.data?.data ?? res?.data;
        const list = data?.records || data?.list || data || [];
        const normalized = Array.isArray(list)
          ? list.map((item) => ({ ...item, id: String(item.id ?? '') }))
          : [];
        setExperts(normalized);
        const totalVal = data?.total ?? res?.data?.total ?? 0;
        setTotal(Number(totalVal) || 0);
      } catch (err) {
        console.error('fetch consultation-relations list error', err);
        setExperts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, [page, size]);

  const canPrev = page > 1;
  const canNext = total > 0 ? page * size < total : experts.length === size;
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">技术专家咨询</h1>
          <div className="flex items-center gap-3">
            <Button
              size="large"
              onClick={() => (window.location.href = 'http://localhost:3000/consultation-chat')}
            >
              进入咨询
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate('/become-expert')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isExpert ? '修改专家信息' : '我要成为专家'}
            </Button>
          </div>
        </div>

        <Spin spinning={loading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {experts.map((expert) => (
              <ExpertCard
                key={expert.id}
                relationId={String(expert.id)}
                avatar={expert.avatar_url || expert.avatar || ''}
                name={expert.username || expert.name || `用户${expert.user_id ?? expert.userId ?? ''}`}
                description={expert.info || ''}
                price={expert.price || 0}
                consultationCount={expert.consultation_count}
              />
            ))}
          </div>
        </Spin>

        <div className="flex justify-center items-center mt-6 space-x-4">
          <Button onClick={() => canPrev && setPage((p) => p - 1)} disabled={!canPrev}>
            上一页
          </Button>
          <span className="text-sm text-gray-600">
            第 {page} 页
            {total ? ` / 共 ${Math.ceil(total / size)} 页` : ''}
          </span>
          <Button onClick={() => canNext && setPage((p) => p + 1)} disabled={!canNext}>
            下一页
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ExpertList;
