import React from 'react';
import { Link } from 'react-router-dom';

const MyBlogs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">我的博客</h1>
            <p className="text-gray-600">管理您发布的所有博客文章</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">发布文章</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-blog text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">总阅读量</p>
                  <p className="text-2xl font-bold text-gray-900">2,847</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-eye text-green-600 text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">总点赞数</p>
                  <p className="text-2xl font-bold text-gray-900">486</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-heart text-red-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">博客列表</h2>
                <Link
                  to="/write-blog"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>写新博客
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              <article className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      深入理解JavaScript闭包：从原理到实践
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span>
                        <i className="fas fa-calendar mr-1"></i>2024-01-15
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        前端开发
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-6">
                      <span>
                        <i className="fas fa-eye mr-1"></i>324 阅读
                      </span>
                      <span>
                        <i className="fas fa-heart mr-1"></i>28 点赞
                      </span>
                      <span>
                        <i className="fas fa-comment mr-1"></i>12 评论
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-6">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      <i className="fas fa-edit mr-1"></i>编辑
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      <i className="fas fa-trash mr-1"></i>删除
                    </button>
                  </div>
                </div>
              </article>

              <article className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      React Hook最佳实践指南
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span>
                        <i className="fas fa-calendar mr-1"></i>2024-01-12
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        React
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-6">
                      <span>
                        <i className="fas fa-eye mr-1"></i>256 阅读
                      </span>
                      <span>
                        <i className="fas fa-heart mr-1"></i>31 点赞
                      </span>
                      <span>
                        <i className="fas fa-comment mr-1"></i>8 评论
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-6">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      <i className="fas fa-edit mr-1"></i>编辑
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      <i className="fas fa-trash mr-1"></i>删除
                    </button>
                  </div>
                </div>
              </article>

              <article className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      Node.js性能优化实战
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span>
                        <i className="fas fa-calendar mr-1"></i>2024-01-08
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        后端开发
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-6">
                      <span>
                        <i className="fas fa-eye mr-1"></i>189 阅读
                      </span>
                      <span>
                        <i className="fas fa-heart mr-1"></i>22 点赞
                      </span>
                      <span>
                        <i className="fas fa-comment mr-1"></i>15 评论
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-6">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      <i className="fas fa-edit mr-1"></i>编辑
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      <i className="fas fa-trash mr-1"></i>删除
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">显示 1-10 条，共 12 条博客</p>
                <div className="flex space-x-1">
                  <button
                    className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 rounded">
                    2
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyBlogs;
