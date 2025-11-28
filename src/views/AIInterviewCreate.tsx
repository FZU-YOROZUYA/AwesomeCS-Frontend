import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AIInterviewCreate: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">创建AI面试官</h2>
          <p className="text-lg text-gray-600">选择面试领域和风格，开始你的专业面试体验</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          <form className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-code text-blue-600 mr-3"></i>
                面试领域选择
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative cursor-pointer group">
                  <input type="radio" name="domain" value="frontend" className="sr-only peer" />
                  <div className="border-2 border-gray-200 rounded-xl p-6 peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <i className="fab fa-react text-2xl text-blue-500"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">前端开发</h4>
                        <p className="text-sm text-gray-600">React、Vue、JavaScript等</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                to={'/ai-interview'}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <i className="fas fa-play"></i>
                <span>开始面试</span>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AIInterviewCreate;
