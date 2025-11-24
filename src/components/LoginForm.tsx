import React, { useState } from 'react';
import { Input, Checkbox, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('登录:', { email, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
        <Input
          type="email"
          placeholder="请输入邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="large"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
        <Input.Password
          placeholder="请输入密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="large"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
          记住我
        </Checkbox>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
        className="bg-blue-600 hover:bg-blue-700"
      >
        登录
      </Button>
    </form>
  );
};

export default LoginForm;
