import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  FileTextOutlined,
  HeartOutlined,
  EditOutlined,
  SettingOutlined,
  CameraOutlined,
} from '@ant-design/icons';

/**
 * 个人信息页面布局组件
 * 包含侧边栏导航和内容区域（使用 Outlet 显示子路由）
 */
const PersonalInfo: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/personal-info', label: '个人信息', icon: UserOutlined },
    { path: '/personal-info/my-blogs', label: '我的博客', icon: FileTextOutlined },
    { path: '/personal-info/like-history', label: '点赞历史', icon: HeartOutlined },
    { path: '/personal-info/write-blog', label: '写博客', icon: EditOutlined },
    { path: '/personal-info/account-settings', label: '账号设置', icon: SettingOutlined },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <nav className="p-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors mt-1 ${
                      active
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`mr-3 text-lg ${active ? 'text-blue-600' : ''}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/**
 * 个人信息内容组件（默认显示）
 */
export const PersonalInfoContent: React.FC = () => {
  // form state
  const defaultAvatar = '/default-avatar.png';
  const [avatarPreview, setAvatarPreview] = useState<string>(defaultAvatar);
  const [username, setUsername] = useState<string>('张三');
  const [bio, setBio] = useState<string>('');
  const [techs, setTechs] = useState<string[]>([]); // string list
  const [techInput, setTechInput] = useState<string>('');
  const [targetJob, setTargetJob] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
    };
    reader.readAsDataURL(f);
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1) 如果头像是 data URL（从本地上传），先调用 avatar/update
      if (avatarPreview && avatarPreview.startsWith('data:')) {
        await axios.post('/api/user/avatar/update', { avatar: avatarPreview });
      }

      // 2) profile update: 发送 bio、targetJob、techs
      await axios.post('/api/user/profile/update', {
        bio: bio,
        target_job: targetJob,
        techs: techs,
      });

      alert('保存成功');
    } catch (err) {
      console.error(err);
      alert('保存失败');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile');
        // 后端返回 Result<UserProfileResponse>
        if (res?.data?.code === '0000') {
          const d = res.data.data || res.data;
          if (d) {
            setUsername(d.nickname || username);
            if (d.avatar) {
              let avatarUrl = d.avatar as string;
              // 如果不是完整 URL（http/https/data:），用后端 baseURL 作为前缀；若没有 baseURL 则补一个 / 变成绝对路径
              if (!/^https?:\/\//i.test(avatarUrl) && !avatarUrl.startsWith('data:')) {
                const base = (axios.defaults.baseURL || '').replace(/\/$/, '');
                if (base) {
                  avatarUrl = base + (avatarUrl.startsWith('/') ? '' : '/') + avatarUrl;
                } else {
                  avatarUrl = avatarUrl.startsWith('/') ? avatarUrl : `/${avatarUrl}`;
                }
              }
              setAvatarPreview(avatarUrl);
            } else {
              setAvatarPreview(defaultAvatar);
            }
            setBio(d.bio || '');
            setTargetJob(d.target_job || d.targetJob || '');
            if (Array.isArray(d.techs)) {
              const arr = d.techs as string[];
              setTechs(arr);
              setTechInput(arr.join(', '));
            } else if (d.techs) {
              // 如果后端以字符串返回，也尝试解析
              try {
                const parsed = JSON.parse(d.techs);
                if (Array.isArray(parsed)) {
                  const arr = parsed.map(String);
                  setTechs(arr);
                  setTechInput(arr.join(', '));
                } else {
                  const arr = String(d.techs).split(',').map((s: string) => s.trim()).filter(Boolean);
                  setTechs(arr);
                  setTechInput(arr.join(', '));
                }
              } catch (e) {
                const arr = String(d.techs).split(',').map((s: string) => s.trim()).filter(Boolean);
                setTechs(arr);
                setTechInput(arr.join(', '));
              }
            }
          }
        }
      } catch (err) {
        console.error('fetch profile failed', err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">个人信息</h1>
        <p className="text-gray-600 mt-1">管理您的个人资料信息</p>
      </div>

      <div className="px-8 py-8">
          <form className="space-y-8" onSubmit={onSave}>
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <label className="block text-sm font-semibold text-gray-900 mb-3">头像</label>
              <div className="relative">
                <img
                  src={avatarPreview}
                  alt="头像预览"
                  onError={() => {
                    if (avatarPreview !== defaultAvatar) setAvatarPreview(defaultAvatar);
                  }}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 bg-gray-100"
                />
              </div>
            </div>
            <div className="flex-1 pt-8">
              <p className="text-sm text-gray-600">当前头像</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              用户名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
              placeholder="请输入用户名"
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              个人简介 <span className="text-gray-400 text-xs font-normal">(选填)</span>
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-gray-900"
              placeholder="介绍一下自己吧..."
            />
            <p className="text-xs text-gray-500 mt-2">最多可输入 200 个字符</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">目标岗位 <span className="text-gray-400 text-xs font-normal">(选填)</span></label>
            <input
              type="text"
              value={targetJob}
              onChange={(e) => setTargetJob(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
              placeholder="例如：后端开发工程师"
            />
            <p className="text-xs text-gray-500 mt-2">填写您的目标岗位</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">技术栈 <span className="text-gray-400 text-xs font-normal">(选填)</span></label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => {
                const val = e.target.value;
                setTechInput(val);
                setTechs(val.split(',').map((s) => s.trim()).filter((s) => s.length > 0));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
              placeholder="多个技术请用逗号分隔，例如：Java, Spring, MySQL"
            />
            <p className="text-xs text-gray-500 mt-2">技术栈将作为字符串列表处理</p>
          </div>

          <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              保存修改
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              取消
            </button>
          </div>
          </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
