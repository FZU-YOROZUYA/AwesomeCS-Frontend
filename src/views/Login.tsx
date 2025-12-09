import React, { useState } from 'react';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative">
      <Link
        to="/"
        className="absolute top-6 right-6 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <RollbackOutlined className="text-lg" />
        <span className="text-sm font-medium">返回首页</span>
      </Link>
      <div className="w-full p-8 max-w-6xl flex bg-white rounded-2xl overflow-hidden">
        {/* 左侧介绍区域 */}
        <div className="hidden lg:flex lg:w-1/2  p-12 flex-col justify-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">AwesomeCS</h1>
          <p className="text-gray-600 text-base mb-8">
            专注技术学习与专家咨询的平台，登录以继续，或注册加入新账号开始使用。
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <CheckOutlined className="text-white text-sm" />
              </div>
              <span className="text-gray-700">免费试用 AI 面试</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <CheckOutlined className="text-white text-sm" />
              </div>
              <span className="text-gray-700">与行业专家一对一咨询</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <CheckOutlined className="text-white text-sm" />
              </div>
              <span className="text-gray-700">智能个人博客与收藏</span>
            </div>
          </div>
        </div>

        {/* 右侧表单区域 */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white border rounded-xl border-gray-200 shadow-xl">
          <div className="max-w-md mx-auto">
            {/* 标签切换 */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === 'login' ? '欢迎' : '注册'}
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'login' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  登录
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'register' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  注册
                </button>
              </div>
            </div>

            {/* 表单内容 */}
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
