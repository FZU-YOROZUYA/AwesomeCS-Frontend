import React from 'react';

const LearningPath: React.FC = () => {
  return (
    <div className="flex-1 flex max-w-7xl mx-auto w-full">
      <div className="flex-1 flex flex-col bg-white">
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-white"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">学习路线助手</h2>
                <p className="text-sm text-gray-500">在线 • 随时为您服务</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-robot text-white text-xs"></i>
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3 max-w-2xl">
              <p className="text-gray-800">你好！我是你的个人学习助手。</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800 placeholder-gray-500"
                placeholder="请告诉我你想学习的技术方向..."
                rows={1}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
