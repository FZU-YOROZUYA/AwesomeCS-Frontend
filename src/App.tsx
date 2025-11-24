import { Routes, Route } from 'react-router-dom';
import { routes, personalInfoRoutes } from './routes';
import ACLayout from './components/Layout';
import BlogHome from './views/BlogHome';
import Login from './views/Login';
import PersonalInfo from './views/PersonalInfo';
import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ACLayout />}>
        <Route index element={<BlogHome />} />
        {routes
          .filter((route) => {
            // 排除个人信息路由（使用嵌套路由）
            return route.path !== 'personal-info';
          })
          .map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        {/* 个人信息相关路由 - 使用 PersonalInfo 作为布局，子路由使用 map 遍历生成 */}
        <Route path="personal-info" element={<PersonalInfo />}>
          {personalInfoRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
