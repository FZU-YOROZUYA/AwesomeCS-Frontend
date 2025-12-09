import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyBlogs: React.FC = () => {
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [totalViews, setTotalViews] = useState<number>(0);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [countRes, viewsRes, likesRes] = await Promise.all([
          axios.get('/api/posts/me/count'),
          axios.get('/api/posts/me/views-total'),
          axios.get('/api/posts/me/likes-total'),
        ]);

        const countData = countRes?.data?.data || {};
        const viewsData = viewsRes?.data?.data || {};
        const likesData = likesRes?.data?.data || {};

        setTotalPosts(Number(countData.totalPosts || 0));
        setTotalViews(Number(viewsData.totalViews || 0));
        setTotalLikes(Number(likesData.totalLikes || 0));
      } catch (e) {
        console.error('fetch my blogs stats failed', e);
      }
    };
    fetchStats();
  }, []);

  // posts list
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const res = await axios.get('/api/posts/me', { params: { page, size } });
        const data = res?.data?.data || res?.data;
        if (data) {
          setPosts(Array.isArray(data.list) ? data.list : []);
          // sync totalPosts with returned total
          if (typeof data.total === 'number') setTotalPosts(data.total);
        }
      } catch (e) {
        console.error('fetch my posts failed', e);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [page, size]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">我的博客</h1>
            <p className="text-gray-600">管理您发布的所有博客文章</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">发布文章</p>
                  <p className="text-2xl font-bold text-gray-900">{(totalPosts || 0).toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-blog text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">总阅读量</p>
                  <p className="text-2xl font-bold text-gray-900">{(totalViews || 0).toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-eye text-green-600 text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">总点赞数</p>
                  <p className="text-2xl font-bold text-gray-900">{(totalLikes || 0).toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-heart text-red-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">博客列表</h2>
                <Link
                  to="/personal-info/write-blog"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>写新博客
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {loadingPosts ? (
                <div className="p-6 text-center text-gray-500">加载中...</div>
              ) : posts.length === 0 ? (
                <div className="p-6 text-center text-gray-500">暂无文章</div>
              ) : (
                posts.map((p) => {
                  const title = p.title || '';
                  const id = p.id || p.id;
                  const date = p.create_time || p.createTime || '';
                  const viewCount = p.viewCount || p.view_count || p['view_count'] || 0;
                  const likes = p.likesCount || p.likes_count || 0;
                  const comments = p.commentsCount || p.comments_count || 0;
                  return (
                    <article key={id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                            <Link to={`/blog-detail/${id}`}>{title}</Link>
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                            <span>
                              <i className="fas fa-calendar mr-1"></i>{date}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 space-x-6">
                            <span>
                              <i className="fas fa-eye mr-1"></i>{(viewCount || 0).toLocaleString()} 阅读
                            </span>
                            <span>
                              <i className="fas fa-heart mr-1"></i>{(likes || 0).toLocaleString()} 点赞
                            </span>
                            <span>
                              <i className="fas fa-comment mr-1"></i>{(comments || 0).toLocaleString()} 评论
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 ml-6">
                          <Link className="text-blue-600 hover:text-blue-800 text-sm font-medium" to={`/personal-info/write-blog?postId=${id}`}>
                            <i className="fas fa-edit mr-1"></i>编辑
                          </Link>
                          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                            <i className="fas fa-trash mr-1"></i>删除
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">显示 1-10 条，共 {(totalPosts || 0).toLocaleString()} 条博客</p>
                <div className="flex space-x-1">
                  <button
                    className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <div className="px-3 py-1 text-sm text-gray-700">第 {page} 页</div>
                  <button
                    className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled={page * size >= (totalPosts || 0)}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyBlogs;
