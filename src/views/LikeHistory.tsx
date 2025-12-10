import React, { useEffect, useState } from 'react';
import axios from 'axios';

type PostSummary = {
  id: string;
  title: string;
  summary: string;
  author: string;
  authorAvatar: string;
  likesCount: number;
  commentsCount: number;
  create_time: string;
  view_count: number;
  category?: string;
};

const LikeHistory: React.FC = () => {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLiked = async (p: number) => {
    setLoading(true);
    try {
      const resp = await axios.get('/api/posts/me/liked', { params: { page: p, size } });
      if (resp.data && resp.data.code === '0000') {
        const data = resp.data.data;
        setPosts(data.list || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error('fetch liked history failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiked(page);
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / size));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">点赞历史</h1>
            <p className="text-gray-600">您点赞过的所有博客文章</p>
          </div>

          <div className="space-y-6">
            {loading && <div className="text-center text-gray-500 py-6">加载中...</div>}
            {!loading && posts.length === 0 && (
              <div className="text-center text-gray-500 py-6">暂无点赞记录</div>
            )}

            {!loading && posts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                      <a href={`/blog-detail/${post.id}`}>{post.title}</a>
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-2">
                        <img
                          src={post.authorAvatar || '/default-avatar.png'}
                          alt={post.author || 'author'}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{post.author || '匿名'}</span>
                      </div>
                      {post.category && <span>{post.category}</span>}
                      <span>{post.view_count || 0} 阅读</span>
                      <span>点赞时间：{post.create_time}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{post.summary}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <i className="fas fa-heart text-red-500"></i>
                      <span>{post.likesCount || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <i className="fas fa-comment"></i>
                      <span>{post.commentsCount || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <i className="fas fa-eye"></i>
                      <span>{post.view_count || 0}</span>
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{post.create_time}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">第 {page} 页 / 共 {totalPages} 页</div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg disabled:opacity-50"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg disabled:opacity-50"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((p) => p + 1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LikeHistory;
