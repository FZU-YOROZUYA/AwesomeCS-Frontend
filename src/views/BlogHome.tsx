import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import type { BlogCategory } from '../types';

const BlogHome: React.FC = () => {
  // local type for post summary coming from backend
  interface PostSummary {
    id: string;
    title: string;
    summary: string;
    author: string;
    authorAvatar: string;
    likesCount: number;
    commentsCount: number;
    create_time: string;
    view_count: number;
    // category/tag from backend
    category: BlogCategory;
  }

  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [countRecommend, setCountRecommend] = useState<number>(0);
  const [countFrontend, setCountFrontend] = useState<number>(0);
  const [countBackend, setCountBackend] = useState<number>(0);
  const [countMobile, setCountMobile] = useState<number>(0);
  const [countAlgorithm, setCountAlgorithm] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 将接口返回的 category 字段映射为展示用中文分类
  const mapCategoryLabel = (cat?: string): BlogCategory => {
    const map: Record<string, string> = {
      frontend: '前端',
      backend: '后端',
      fullstack: '全栈',
      mobile: '移动端',
      algorithm: '算法',
      database: '数据库',
      ops: '运维',
      other: '其他',
    };
    const label = cat ? map[cat] || cat : '其他';
    // 保底为 union 之一
    const safeLabel = (label as BlogCategory) || '其他';
    return safeLabel;
  };

  const fetchPosts = async (p: number) => {
    setLoading(true);
    try {
      const params: any = { page: p, size };
      if (selectedCategory) params.category = selectedCategory;

      const resp = await axios.get('/api/posts', { params });
      if (resp.data && resp.data.code === '0000') {
        const data = resp.data.data;
        const list = data.list || [];
        const normalized = Array.isArray(list)
          ? list.map((item: any) => ({
              ...item,
              category: mapCategoryLabel(item?.category),
            }))
          : [];
        setPosts(normalized);
        setTotal(data.total || 0);
      } else {
        console.error('listPosts error', resp.data);
      }
    } catch (err) {
      console.error('fetch posts failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page, selectedCategory]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const base = '/api/posts/count';
        const reqs = [
          axios.get(base),
          axios.get(base, { params: { category: 'frontend' } }),
          axios.get(base, { params: { category: 'backend' } }),
          axios.get(base, { params: { category: 'mobile' } }),
          axios.get(base, { params: { category: 'algorithm' } }),
        ];

        const [resRecommend, resFrontend, resBackend, resMobile, resAlgorithm] = await Promise.all(reqs);

        if (resRecommend?.data && resRecommend.data.code === '0000') {
          setCountRecommend(Number(resRecommend.data.data) || 0);
        }
        if (resFrontend?.data && resFrontend.data.code === '0000') {
          setCountFrontend(Number(resFrontend.data.data) || 0);
        }
        if (resBackend?.data && resBackend.data.code === '0000') {
          setCountBackend(Number(resBackend.data.data) || 0);
        }
        if (resMobile?.data && resMobile.data.code === '0000') {
          setCountMobile(Number(resMobile.data.data) || 0);
        }
        if (resAlgorithm?.data && resAlgorithm.data.code === '0000') {
          setCountAlgorithm(Number(resAlgorithm.data.data) || 0);
        }
      } catch (err) {
        console.error('fetch counts failed', err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          <aside className="w-52 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">分类导航</h3>
              <nav className="space-y-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(null);
                    setPage(1);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium ${selectedCategory === null ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <i className="fas fa-fire text-sm mr-3"></i>
                    推荐
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${selectedCategory === null ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}>{countRecommend}</span>
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('frontend');
                    setPage(1);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${selectedCategory === 'frontend' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <i className="fab fa-js-square text-sm mr-3"></i>
                    前端
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${selectedCategory === 'frontend' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}>{countFrontend}</span>
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('backend');
                    setPage(1);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${selectedCategory === 'backend' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <i className="fas fa-server text-sm mr-3"></i>
                    后端
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${selectedCategory === 'backend' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}>{countBackend}</span>
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('mobile');
                    setPage(1);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${selectedCategory === 'mobile' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <i className="fas fa-mobile-alt text-sm mr-3"></i>
                    移动端
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${selectedCategory === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}>{countMobile}</span>
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('algorithm');
                    setPage(1);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${selectedCategory === 'algorithm' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <i className="fas fa-project-diagram text-sm mr-3"></i>
                    算法
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${selectedCategory === 'algorithm' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}>{countAlgorithm}</span>
                </a>
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <div className="space-y-4">
              {loading && <div className="text-center py-8">加载中...</div>}
              {!loading && posts.length === 0 && <div className="text-center py-8">暂无文章</div>}
              {!loading && posts.map((post) => (
                <BlogCard
                  key={post.id}
                  category={post.category || '其他'}
                  title={post.title}
                  content={post.summary}
                  author={post.author}
                  authorAvatar={post.authorAvatar}
                  publishTime={post.create_time}
                  postId={post.id}
                  likeCount={post.likesCount}
                  commentCount={post.commentsCount}
                  viewCount={post.view_count}
                />
              ))}

              <div className="flex items-center justify-center gap-4 py-6">
                <button
                  className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded hover:bg-blue-100 transition-colors disabled:opacity-60 disabled:text-blue-300"
                  disabled={page <= 1}
                  onClick={() => setPage((s) => Math.max(1, s - 1))}
                >
                  上一页
                </button>
                <div className="text-sm text-gray-600">第 {page} 页 / 共 {Math.ceil(total / size) || 1} 页</div>
                <button
                  className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded hover:bg-blue-100 transition-colors disabled:opacity-60 disabled:text-blue-300"
                  disabled={page >= Math.ceil(total / size)}
                  onClick={() => setPage((s) => s + 1)}
                >
                  下一页
                </button>
              </div>
            </div>
          </main>

          <aside className="w-72 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-fire text-red-500 mr-2"></i>
                热门文章
              </h3>
              <div className="space-y-3">
                {[...posts]
                  .sort((a, b) => ((b.likesCount || 0) + (b.commentsCount || 0)) - ((a.likesCount || 0) + (a.commentsCount || 0)))
                  .slice(0, 5)
                  .map((post, index) => (
                    <div key={post.id} className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold text-sm">{index + 1}</span>
                      <a
                        href={`/blog-detail/${post.id}`}
                        className="text-sm text-gray-700 hover:text-blue-600 line-clamp-2 flex-1"
                      >
                        {post.title}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
