import React from 'react';
import ExpertCard from '../components/ExpertCard';
import { mockExpertList } from '../mock/mockExpert';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const ExpertList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">技术专家咨询</h1>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => navigate('/become-expert')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            我要成为专家
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockExpertList.map((expert) => (
            <ExpertCard
              key={expert.id}
              avatar={expert.avatar}
              name={expert.name}
              description={expert.description}
              price={expert.price}
              category={expert.category}
              rating={expert.rating}
              consultationCount={expert.consultationCount}
              tags={expert.tags}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExpertList;
