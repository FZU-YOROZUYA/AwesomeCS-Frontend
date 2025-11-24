import React from 'react';

const BlogDetail: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Vue 3.0 Composition API 完全指南：从入门到精通
              </h1>
              <div className="flex flex-wrap items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" 
                       alt="作者头像" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold text-gray-900">张三丰</h3>
                    <p className="text-sm text-gray-500">2024年1月15日发布</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">前端开发</span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-heart text-red-500"></i>
                    <span>1.2k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-eye"></i>
                    <span>8.5k</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="prose prose-lg max-w-none">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
                  <p className="text-blue-800 font-medium">
                    Vue 3.0 引入的 Composition API 是一个革命性的特性，它为 Vue 开发者提供了更灵活、更强大的组件逻辑组织方式。
                  </p>
                </div>
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Composition API 简介</h2>
                <p>Vue 3.0 的 Composition API 是对 Vue 2.x Options API 的补充和增强。</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 sticky top-24">
              <div className="text-center">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                     alt="作者头像" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-gray-900 mb-2">张三丰</h3>
                <p className="text-sm text-gray-600 mb-4">资深前端工程师</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  关注作者
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
