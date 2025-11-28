import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

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
    // category/tag may be present
    category?: string;
  }

  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async (p: number) => {
    setLoading(true);
    try {
      const resp = await axios.get('http://localhost:8085/api/posts', {
        params: { page: p, size }
      });
      if (resp.data && resp.data.code === '0000') {
        const data = resp.data.data;
        console.log('list',data.list);
        
        setPosts(data.list || []);
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
  }, [page]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          <aside className="w-52 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">分类导航</h3>
              <nav className="space-y-2">
                <a href="#" className="flex items-center justify-between px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                  <div className="flex items-center">
                    <i className="fas fa-fire text-sm mr-3"></i>
                    推荐
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">128</span>
                </a>
                <a href="#" className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fab fa-js-square text-sm mr-3"></i>
                    前端
                  </div>
                  <span className="text-xs text-gray-400">89</span>
                </a>
                <a href="#" className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-server text-sm mr-3"></i>
                    后端
                  </div>
                  <span className="text-xs text-gray-400">76</span>
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
                  className="px-4 py-2 bg-white border rounded disabled:opacity-60"
                  disabled={page <= 1}
                  onClick={() => setPage((s) => Math.max(1, s - 1))}
                >
                  上一页
                </button>
                <div className="text-sm text-gray-600">第 {page} 页 / 共 {Math.ceil(total / size) || 1} 页</div>
                <button
                  className="px-4 py-2 bg-white border rounded disabled:opacity-60"
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
