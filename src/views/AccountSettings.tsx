import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const AccountSettings: React.FC = () => {
    const handleLogout = async () => {
      try {
        // 删除本地 token
        localStorage.removeItem('token');
        // 调用后端注销接口
        await axios.delete('/api/user');
        message.success('已退出登录');
        // 跳转到登录页
        window.location.href = '/login';
      } catch (err) {
        message.error('退出登录失败');
      }
    };
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      setLoading(true);
      const resp = await axios.post('/api/user/password/update  ', {
        old_password: currentPassword,
        new_password: newPassword,
      });

      if (resp?.data?.code === '0000') {
        message.success('密码修改成功');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const info = resp?.data?.info || resp?.data?.message || '密码修改失败';
        message.error(info);
      }
    } catch (err) {
      console.error('password update failed', err);
      message.error('密码修改失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        <main className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">账号设置</h1>
                <p className="text-gray-600 mt-1">管理您的账号安全和偏好设置</p>
              </div>
              <button
                type="button"
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow ml-4"
                onClick={handleLogout}
              >
                退出登录
              </button>
            </div>

            <div className="px-8 py-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                <div className="flex items-start">
                  <i className="fas fa-shield-alt text-blue-600 text-xl mr-3 mt-1"></i>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">密码修改</h3>
                    <p className="text-blue-800 text-sm">为了您的账号安全，建议定期修改密码</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl relative z-10">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">当前密码</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                    autoFocus
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900 placeholder-gray-400"
                    placeholder="请输入当前密码"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">新密码</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900 placeholder-gray-400"
                    placeholder="请输入新密码"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    确认新密码
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900 placeholder-gray-400"
                    placeholder="请再次输入新密码"
                    required
                  />
                </div>

                <div className="flex items-center space-x-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-60"
                  >
                    {loading ? '提交中...' : '修改密码'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    重置
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountSettings;
