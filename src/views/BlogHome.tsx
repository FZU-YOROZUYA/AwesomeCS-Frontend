import React from 'react';
import BlogCard from '../components/BlogCard';
import { mockBlogList } from '../mock/mockBlog';

const BlogHome: React.FC = () => {
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
              {mockBlogList.map((blog) => (
                <BlogCard
                  key={blog.id}
                  category={blog.category}
                  title={blog.title}
                  content={blog.content}
                  author={blog.author}
                  authorAvatar={blog.authorAvatar}
                  publishTime={blog.publishTime}
                  likeCount={blog.likeCount}
                  commentCount={blog.commentCount}
                  viewCount={blog.viewCount}
                  detailPath={blog.detailPath}
                />
              ))}
            </div>
          </main>

          <aside className="w-72 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-fire text-red-500 mr-2"></i>
                热门文章
              </h3>
              <div className="space-y-3">
                {mockBlogList
                  .sort((a, b) => (b.likeCount + b.commentCount) - (a.likeCount + a.commentCount))
                  .slice(0, 5)
                  .map((blog, index) => (
                    <div key={blog.id} className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold text-sm">{index + 1}</span>
                      <a
                        href={blog.detailPath}
                        className="text-sm text-gray-700 hover:text-blue-600 line-clamp-2 flex-1"
                      >
                        {blog.title}
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
