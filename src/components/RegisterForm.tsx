import React, { useState } from 'react';
import { Input, Checkbox, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    
    try {
      // Using default values for fields not present in the form yet
      const response = await axios.post('http://localhost:8085/api/user/register', null, {
        params: {
          username,
          password,
          avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${username}`,
          target_job: 'Full Stack Developer',
          techs: 'Java,React',
          bio: 'New user'
        }
      });

      if (response.data.code === '0000') {
        message.success('注册成功，正在为您登录');
        // 自动登录
        try {
          const loginResp = await axios.post('http://localhost:8085/api/user/login/username', null, {
            params: { username, password }
          });
          if (loginResp.data.code === '0000') {
            const token = loginResp.data.data?.token || loginResp.data.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            // redirect to personal info
            navigate('/personal-info');
            return;
          }
        } catch (err) {
          console.error('自动登录失败', err);
        }
        // Reset form
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setAgreeTerms(false);
      } else {
        message.error(response.data.info || '注册失败');
      }
    } catch (error) {
      console.error('Register error:', error);
      message.error('注册请求失败');
    }
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
