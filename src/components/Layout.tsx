import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Popover } from 'antd';

const ACLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* <div className="flex items-center space-x-2"> */}
            {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-code text-white text-sm"></i>
              </div> */}
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              awesomeCS
            </span>
            {/* </div> */}

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-colors ${
                  isActive('/')
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                首页
              </Link>
              <Link
                to="/ai-interview-create"
                className={`font-medium transition-colors ${
                  isActive('/ai-interview-create')
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                AI面试
              </Link>
              <Link
                to="/learning-path"
                className={`font-medium transition-colors ${
                  isActive('/learning-path')
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                学习路线
              </Link>
              <Link
                to="/expert-list"
                className={`font-medium transition-colors ${
                  isActive('/expert-list')
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                付费咨询
              </Link>
            </nav>

            <Popover
              content={
                <div className="py-2">
                  <Link
                    to="/personal-info"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <i className="fas fa-user mr-2"></i>
                    个人信息
                  </Link>
                  <Link
                    to="personal-info/my-blogs"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <i className="fas fa-blog mr-2"></i>
                    我的博客
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    登录
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded">
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    退出登录
                  </button>
                </div>
              }
              trigger="hover"
              placement="bottomRight"
            >
              <div className="flex items-center space-x-3 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="用户头像"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700 font-medium">张三</span>
              </div>
            </Popover>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ACLayout;
