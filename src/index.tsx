import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  // 全局 axios baseURL，确保所有相对请求都指向后端服务器
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8085';
  // 如果本地存有 token，则在应用启动时设置 Authorization 头（支持页面刷新后保留登录）
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    axios.defaults.headers.common['Authorization'] = savedToken;
  }
  // 全局响应拦截：后端返回 Token 异常时跳转到登录页
  axios.interceptors.response.use(
    (response) => {
      try {
        const info = response?.data?.info || response?.data?.message;
        if (info === 'Token 异常') {
          window.location.href = '/login';
          return Promise.reject(new Error('Token异常'));
        }
      } catch (e) {
        // ignore
      }
      return response;
    },
    (error) => {
      try {
        const info = error?.response?.data?.info || error?.response?.data?.message;
        if (info === 'Token异常') {
          window.location.href = '/login';
        }
      } catch (e) {
        // ignore
      }
      return Promise.reject(error);
    },
  );

  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}
