import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<{
    id?: number;
    title?: string;
    content?: string;
    author?: string;
    author_name?: string;
    author_avatar?: string;
    create_time?: string;
    tags?: string[];
    like_count?: number;
    is_liked?: boolean;
  }>({});

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`http://localhost:8085/api/posts/${id}`);
        console.log('GET /api/posts/:id response', resp?.data);
        if (resp.data && resp.data.code === '0000') {
          console.log('post data', resp.data.data);
          setPost(resp.data.data || {});
        } else {
          setError('获取文章失败');
        }
      } catch (err) {
        console.error(err);
        setError('请求失败');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  console.log('post',post);
  

  if (loading) return <div className="p-8 text-center">加载中...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
              <div className="flex flex-wrap items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <img
                    src={post.author_avatar || '/default-avatar.png'}
                    alt={post.author_name || String(post.author) || 'avatar'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.author_name || post.author || '匿名'}</h3>
                    <p className="text-sm text-gray-500">{post.create_time || ''}</p>
                  </div>
                  {post.tags && post.tags.map((t) => (
                    <span key={t} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-heart text-red-500"></i>
                    <span>{post.like_count || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <div
                className="prose prose-lg max-w-none text-gray-800 break-words"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 sticky top-24">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">作者</h3>
                <img
                  src={post.author_avatar || '/default-avatar.png'}
                  alt={post.author_name || String(post.author) || 'avatar'}
                  className="mx-auto w-20 h-20 rounded-full object-cover mb-3"
                />
                <p className="text-sm text-gray-600 mb-4">{post.author_name || post.author || '匿名'}</p>
                {/* 关注作者按钮已移除 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
