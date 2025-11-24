import React, { useState } from 'react';
import { Button, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const BecomeExpert: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    expertise: '',
    experience: '',
    hourlyRate: '',
    introduction: '',
    certifications: [],
  });

  const handleSubmit = () => {
    // 验证表单
    if (!formData.name || !formData.expertise || !formData.hourlyRate) {
      message.error('请填写必填项');
      return;
    }
    message.success('申请已提交，我们会尽快审核');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">成为专家</h1>
          <p className="text-gray-600">分享您的专业知识，帮助更多人成长</p>
        </div>

        {/* 表单卡片 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* 基本信息 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    size="large"
                    placeholder="请输入您的姓名"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    专业领域 <span className="text-red-500">*</span>
                  </label>
                  <Select
                    size="large"
                    placeholder="请选择您的专业领域"
                    className="w-full"
                    value={formData.expertise}
                    onChange={(value) => setFormData({ ...formData, expertise: value })}
                  >
                    <Option value="frontend">前端开发</Option>
                    <Option value="backend">后端开发</Option>
                    <Option value="algorithm">算法与数据结构</Option>
                    <Option value="mobile">移动开发</Option>
                    <Option value="ai">人工智能</Option>
                    <Option value="architecture">系统架构</Option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">从业年限</label>
                  <Input
                    size="large"
                    placeholder="例如：5年"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    咨询费用（元/小时） <span className="text-red-500">*</span>
                  </label>
                  <Input
                    size="large"
                    type="number"
                    placeholder="请输入您的咨询费用"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 个人介绍 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">个人介绍</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">专业简介</label>
                <TextArea
                  rows={6}
                  placeholder="请介绍您的专业背景、工作经验、擅长领域等..."
                  value={formData.introduction}
                  onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-2">建议详细描述您的专业能力和服务内容</p>
              </div>
            </div>

            {/* 资质证明 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">资质证明</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上传证书或作品
                </label>
                <Upload listType="picture-card" maxCount={5} beforeUpload={() => false}>
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                </Upload>
                <p className="text-xs text-gray-500 mt-2">可上传相关证书、项目截图等，最多5张</p>
              </div>
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
              <Button size="large" onClick={() => window.history.back()}>
                取消
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                提交申请
              </Button>
            </div>
          </div>
        </div>

        {/* 说明信息 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <i className="fas fa-info-circle text-blue-600 mt-0.5"></i>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">申请说明</p>
              <ul className="list-disc list-inside space-y-1">
                <li>提交申请后，我们会在3个工作日内完成审核</li>
                <li>审核通过后，您将收到邮件通知</li>
                <li>成为专家后，您可以在平台上提供付费咨询服务</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeExpert;
