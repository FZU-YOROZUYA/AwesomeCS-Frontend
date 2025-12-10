import React, { useState } from 'react';
import { Input, Checkbox, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/api/user/login/username', null, {
        params: {
          username,
          password
        }
      });
      
      if (response.data.code === '0000') {
        message.success('登录成功');
        const token = response.data.data?.token || response.data.data;
        localStorage.setItem('token', token);
        // set axios default header for subsequent requests
        axios.defaults.headers.common['Authorization'] = token;
        if (rememberMe) {
          localStorage.setItem('username', username);
        }
        // Navigate to dashboard or home
        navigate('/'); 
      } else {
        message.error(response.data.info || '登录失败');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('登录请求失败');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
        <Input
          placeholder="请输入用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
