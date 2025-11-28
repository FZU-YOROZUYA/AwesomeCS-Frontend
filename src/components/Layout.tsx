import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const ACLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

            {
              (function renderProfileArea() {
                const token = localStorage.getItem('token');
                if (token) {
                  return (
                    <div
                      role="button"
                      onClick={() => navigate('/personal-info')}
                      className="flex items-center cursor-pointer"
                    >
                      <span className="text-gray-700 font-medium">个人中心</span>
                    </div>
                  );
                }

                return (
                  <button
                    onClick={() => navigate('/login')}
                    className="text-sm text-blue-600 font-medium px-3 py-1 rounded hover:bg-blue-50"
                  >
                    登录
                  </button>
                );
              })()
            }
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
