import React from 'react';

const LikeHistory: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">点赞历史</h1>
            <p className="text-gray-600">您点赞过的所有博客文章</p>
          </div>

          <div className="space-y-6">
            <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                    深入理解JavaScript异步编程：从回调到Promise再到async/await
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                        alt="作者头像"
                        className="w-6 h-6 rounded-full"
                      />
                      <span>李开发</span>
                    </div>
                    <span>前端开发</span>
                    <span>1.2k 阅读</span>
                    <span>点赞时间：2024-01-15 14:30</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    JavaScript异步编程是前端开发中的重要概念，本文将详细介绍从传统的回调函数到现代的Promise和async/await的演进过程...
                  </p>
                </div>
                <button className="ml-4 flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <i className="fas fa-heart-broken text-sm"></i>
                  <span className="text-sm font-medium">取消点赞</span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    JavaScript
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    异步编程
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-heart text-red-500"></i>
                    <span>128</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-comment"></i>
                    <span>24</span>
                  </span>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                    React Hooks最佳实践：如何优雅地管理组件状态
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=32&h=32&fit=crop&crop=face"
                        alt="作者头像"
                        className="w-6 h-6 rounded-full"
                      />
                      <span>王小美</span>
                    </div>
                    <span>React</span>
                    <span>856 阅读</span>
                    <span>点赞时间：2024-01-12 09:15</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    React
                    Hooks彻底改变了我们编写React组件的方式，本文将分享一些使用Hooks的最佳实践，帮助你写出更优雅的React代码...
                  </p>
                </div>
                <button className="ml-4 flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <i className="fas fa-heart-broken text-sm"></i>
                  <span className="text-sm font-medium">取消点赞</span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    React
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Hooks
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-heart text-red-500"></i>
                    <span>95</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-comment"></i>
                    <span>18</span>
                  </span>
                </div>
              </div>
            </article>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">显示 1-3 条，共 3 条记录</div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-3 py-2 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LikeHistory;
