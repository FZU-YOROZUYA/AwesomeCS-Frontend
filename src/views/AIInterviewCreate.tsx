import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AIInterviewCreate: React.FC = () => {
  const [domain, setDomain] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain || !style) {
      window.alert('请选择面试领域和面试风格');
      return;
    }
    setLoading(true);
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const resp = await axios.post(
          'http://localhost:8085/api/interview/create_interview',
          { domain, style },
          { headers: { Authorization: token || '' } }
        );
        if (resp.data && resp.data.code === '0000') {
          const id = resp.data.data;
          // 跳转到语音面试页面
          window.location.href = `/ai-interview/${id}`;
        } else {
          window.alert('创建面试失败：' + (resp.data?.info || JSON.stringify(resp.data)));
        }
      } catch (err) {
        console.error(err);
        window.alert('创建面试请求失败');
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">创建AI面试官</h2>
          <p className="text-lg text-gray-600">选择面试领域和风格，开始你的专业面试体验</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* 面试领域 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="inline-block mr-3 text-blue-600">
                  {/* icon placeholder */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 5a2 2 0 012-2h3v2H4v10h12V5h-3V3h3a2 2 0 012 2v11a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" />
                  </svg>
                </span>
                面试领域选择
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="domain"
                    value="frontend"
                    className="sr-only peer"
                    checked={domain === 'frontend'}
                    onChange={() => setDomain('frontend')}
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3 6 6 .5-4.5 3.5L19 20l-7-4-7 4 1.5-7L3 8.5 9 8 12 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">前端开发</h4>
                        <p className="text-sm text-gray-600">React、Vue、JavaScript等</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="domain"
                    value="backend"
                    className="sr-only peer"
                    checked={domain === 'backend'}
                    onChange={() => setDomain('backend')}
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M3 3h18v4H3V3zm0 7h18v11H3V10z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">后端开发</h4>
                        <p className="text-sm text-gray-600">Java、Python、Node.js等</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="domain"
                    value="algorithm"
                    className="sr-only peer"
                    checked={domain === 'algorithm'}
                    onChange={() => setDomain('algorithm')}
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-purple-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3 6 6 .5-4.5 3.5L19 20l-7-4-7 4 1.5-7L3 8.5 9 8 12 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">算法与数据结构</h4>
                        <p className="text-sm text-gray-600">编程基础与逻辑思维</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="domain"
                    value="system"
                    className="sr-only peer"
                    checked={domain === 'system'}
                    onChange={() => setDomain('system')}
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-orange-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M3 3h18v4H3V3zm0 7h18v11H3V10z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">系统设计</h4>
                        <p className="text-sm text-gray-600">架构设计与系统思维</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer group md:col-span-2">
                  <input
                    type="radio"
                    name="domain"
                    value="mobile"
                    className="sr-only peer"
                    checked={domain === 'mobile'}
                    onChange={() => setDomain('mobile')}
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md max-w-md mx-auto">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M5 2h14a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">移动端开发</h4>
                        <p className="text-sm text-gray-600">iOS、Android、Flutter等</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* 面试风格 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="inline-block mr-3 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 16a8 8 0 0116 0H2z" />
                  </svg>
                </span>
                面试风格选择
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="style"
                    value="friendly"
                    className="sr-only peer"
                    checked={style === 'friendly'}
                    onChange={() => setStyle('friendly')}
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-yellow-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM2 20c0-3.31 4.03-6 9-6s9 2.69 9 6H2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">友好交流型</h4>
                        <p className="text-sm text-gray-600">轻松愉快的对话氛围</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="style"
                    value="professional"
                    className="sr-only peer"
                    checked={style === 'professional'}
                    onChange={() => setStyle('professional')}
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2a4 4 0 100 8 4 4 0 000-8zM4 22v-2a6 6 0 0112 0v2H4z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">专业严谨型</h4>
                        <p className="text-sm text-gray-600">正式的面试风格</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="style"
                    value="pressure"
                    className="sr-only peer"
                    checked={style === 'pressure'}
                    onChange={() => setStyle('pressure')}
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3 6 6 .5-4.5 3.5L19 20l-7-4-7 4 1.5-7L3 8.5 9 8 12 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">压力测试型</h4>
                        <p className="text-sm text-gray-600">有一定挑战性</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="style"
                    value="guided"
                    className="sr-only peer"
                    checked={style === 'guided'}
                    onChange={() => setStyle('guided')}
                  />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2a4 4 0 100 8 4 4 0 000-8zM2 20c0-3.31 4.03-6 9-6s9 2.69 9 6H2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">引导启发型</h4>
                        <p className="text-sm text-gray-600">循序渐进的提问</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                type="submit"
                disabled={loading}
                className={`${loading ? 'opacity-70 cursor-not-allowed' : ''} bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>正在创建面试官...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 10a1 1 0 011-1h8.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L12.586 11H4a1 1 0 01-1-1z" />
                    </svg>
                    <span>开始面试</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:bg-gray-50 flex items-center justify-center space-x-2"
                onClick={() => {
                  setDomain(null);
                  setStyle(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 10-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>取消</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AIInterviewCreate;
