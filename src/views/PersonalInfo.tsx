import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  FileTextOutlined,
  HeartOutlined,
  EditOutlined,
  SettingOutlined,
  CameraOutlined,
  MailOutlined,
  MobileOutlined,
} from '@ant-design/icons';

/**
 * 个人信息页面布局组件
 * 包含侧边栏导航和内容区域（使用 Outlet 显示子路由）
 */
const PersonalInfo: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/personal-info', label: '个人信息', icon: UserOutlined },
    { path: '/personal-info/my-blogs', label: '我的博客', icon: FileTextOutlined },
    { path: '/personal-info/like-history', label: '点赞历史', icon: HeartOutlined },
    { path: '/personal-info/write-blog', label: '写博客', icon: EditOutlined },
    { path: '/personal-info/account-settings', label: '账号设置', icon: SettingOutlined },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <nav className="p-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors mt-1 ${
                      active
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`mr-3 text-lg ${active ? 'text-blue-600' : ''}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/**
 * 个人信息内容组件（默认显示）
 */
export const PersonalInfoContent: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">个人信息</h1>
        <p className="text-gray-600 mt-1">管理您的个人资料信息</p>
      </div>

      <div className="px-8 py-8">
        <form className="space-y-8">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <label className="block text-sm font-semibold text-gray-900 mb-3">头像</label>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
                  alt="头像预览"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
                <label className="absolute inset-0 w-24 h-24 rounded-full bg-black bg-opacity-0 hover:bg-opacity-40 flex items-center justify-center cursor-pointer transition-all group">
                  <CameraOutlined className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </label>
                <input type="file" accept="image/*" className="hidden" />
              </div>
            </div>
            <div className="flex-1 pt-8">
              <p className="text-sm text-gray-600">点击头像可更换图片</p>
              <p className="text-xs text-gray-500 mt-1">
                支持 JPG、PNG 格式，建议尺寸 200x200 像素
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              用户名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="张三"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              绑定邮箱 <span className="text-gray-400 text-xs font-normal">(选填)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MailOutlined className="text-gray-400" />
              </div>
              <input
                type="email"
                defaultValue="zhangsan@example.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="请输入邮箱地址"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              绑定手机 <span className="text-gray-400 text-xs font-normal">(选填)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MobileOutlined className="text-gray-400" />
              </div>
              <input
                type="tel"
                defaultValue="138****5678"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="请输入手机号码"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              个人简介 <span className="text-gray-400 text-xs font-normal">(选填)</span>
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="介绍一下自己吧..."
            ></textarea>
            <p className="text-xs text-gray-500 mt-2">最多可输入 200 个字符</p>
          </div>

          <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              保存修改
            </button>
            <button
              type="button"
              className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
