import React, { useState } from 'react';
import { Input, Checkbox, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    console.log('注册:', { username, email, password, agreeTerms });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
        <Input
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="large"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
        <Input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="large"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
        <Input.Password
          placeholder="至少 6 位"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="large"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          minLength={6}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
        <Input.Password
          placeholder="再次输入密码"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          size="large"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          required
        />
      </div>

      <div>
        <Checkbox checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required>
          我已阅读并同意{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            服务条款
          </a>
        </Checkbox>
      </div>

      <div className="text-xs text-gray-500">
        生力量使用中国，无法确保您的信息在本地和国际间传输（localStorage）时不泄露。
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
        className="bg-green-600 hover:bg-green-700"
        disabled={!agreeTerms}
      >
        注册
      </Button>
    </form>
  );
};

export default RegisterForm;
