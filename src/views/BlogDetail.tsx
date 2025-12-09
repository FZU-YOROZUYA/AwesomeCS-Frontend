import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  
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
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`/api/posts/info/${id}`);
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

  useEffect(() => {
    if (!id) return;
    const fetchInteraction = async () => {
      try {
        const resp = await axios.get(`/api/posts/interaction/${id}`);
        console.log('GET /api/posts/interaction/:id response', resp?.data);
            if (resp.data && resp.data.code === '0000') {
              const data = resp.data.data || {};
              setLikeCount(typeof data.like_count !== 'undefined' && data.like_count !== null ? Number(data.like_count) : null);
              setIsLiked(Boolean(data.is_liked));
            }
      } catch (err) {
        console.error('fetch interaction failed', err);
      }
    };

    fetchInteraction();
  }, [id]);

  const handleToggleLike = async () => {
    if (!id || isLiking) return;
    setIsLiking(true);
    try {
      const resp = await axios.post(`/api/posts/${id}/like`);
      console.log('POST /api/posts/:id/like response', resp?.data);
      if (resp.data && resp.data.code === '0000') {
        const data = resp.data.data || {};
        const action = data.action;
        const newCount = typeof data.new_like_count !== 'undefined' && data.new_like_count !== null ? Number(data.new_like_count) : null;
        setIsLiked(action === 'liked');
        setLikeCount(newCount);
      } else {
        console.error('like action error', resp.data);
      }
    } catch (err) {
      console.error('like request failed', err);
    } finally {
      setIsLiking(false);
    }
  };

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
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleLike();
                      }}
                      disabled={isLiking}
                      aria-pressed={isLiked}
                      className="focus:outline-none"
                    >
                      <i className={`fas fa-heart ${isLiked ? 'text-red-500' : 'text-gray-400'}`} />
                    </button>
                    <span>{likeCount ?? post.like_count ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              {post.content ? (
                <div className="prose prose-lg max-w-none text-gray-800 break-words">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none text-gray-800 break-words" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
              )}
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
