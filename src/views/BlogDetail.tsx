import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { CommentResponse } from '../types/post';

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
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [replyContentMap, setReplyContentMap] = useState<Record<number, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replySubmittingId, setReplySubmittingId] = useState<number | null>(null);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsSize] = useState(10);
  const [commentsTotal, setCommentsTotal] = useState<number | null>(null);

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

  useEffect(() => {
    setCommentsPage(1);
  }, [id]);

  const normalizeComment = (raw: any): CommentResponse => {
    const normalizedReplies = Array.isArray(raw?.replies)
      ? raw.replies.map((r: any) => normalizeComment(r))
      : [];
    const resolvedId = raw?.id ?? raw?.comment_id ?? raw?.commentId ?? Date.now() + Math.random();
    return {
      ...raw,
      id: resolvedId,
      created_at: raw?.created_at ?? raw?.create_time ?? raw?.createTime ?? raw?.createdAt ?? '',
      user_name: raw?.user_name ?? raw?.userName ?? '',
      avatar: raw?.avatar ?? raw?.user_avatar ?? raw?.userAvatar ?? '',
      replies: normalizedReplies,
    } as CommentResponse;
  };

  const fetchComments = useCallback(async () => {
    if (!id) return;
    setCommentsLoading(true);
    setCommentsError(null);
    try {
      const resp = await axios.get(`/api/posts/${id}/comments`, {
        params: { page: commentsPage, size: commentsSize },
      });
      console.log('GET /api/posts/:id/comments response', resp?.data);
      let list: CommentResponse[] = [];
      let total: number | null = null;
      const payload = resp?.data?.data ?? resp?.data;

      if (Array.isArray(payload)) {
        list = payload;
        if (typeof resp?.data?.total === 'number') total = resp.data.total;
      } else if (payload && typeof payload === 'object') {
        const maybeList =
          payload.list ||
          payload.records ||
          payload.rows ||
          payload.content ||
          payload.data ||
          payload.items;

        if (Array.isArray(maybeList)) {
          list = maybeList as CommentResponse[];
        }

        const possibleTotal =
          payload.total ??
          payload.total_count ??
          payload.count ??
          payload.totalElements ??
          payload.total_items ??
          payload.totalItems ??
          payload.total ??
          resp?.data?.total;

        if (typeof possibleTotal === 'number') {
          total = possibleTotal;
        }
      }

      const derivedTotal =
        typeof total === 'number'
          ? total
          : (commentsPage - 1) * commentsSize + (list?.length || 0);

      const normalizedList = (list || []).map((item) => normalizeComment(item));
      setComments(normalizedList);
      setCommentsTotal(derivedTotal);
    } catch (err) {
      console.error('fetch comments failed', err);
      setCommentsError('获取评论失败');
    } finally {
      setCommentsLoading(false);
    }
  }, [commentsPage, commentsSize, id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

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

  const renderComment = (comment: CommentResponse, level = 0) => {
    const hasReplies = Array.isArray(comment.replies) && comment.replies.length > 0;
    return (
      <div
        key={comment.id}
        className="border border-gray-100 rounded-xl p-4 bg-white"
        style={{ marginLeft: level ? level * 16 : 0 }}
      >
        <div className="flex items-start gap-4">
          <img
            src={comment.avatar || '/default-avatar.png'}
            alt={comment.user_name || '匿名用户'}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900">{comment.user_name || '匿名用户'}</div>
              <span className="text-xs text-gray-400">{comment.created_at || ''}</span>
            </div>
            <p className="text-gray-700 mt-2 whitespace-pre-line leading-relaxed">{comment.content}</p>
            {level === 0 && (
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                <button
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setActiveReplyId((prev) => (prev === comment.id ? null : comment.id))}
                >
                  回复
                </button>
              </div>
            )}
            {activeReplyId === comment.id && (
              <div className="mt-3 space-y-2">
                <textarea
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  rows={3}
                  placeholder="写下你的回复..."
                  value={replyContentMap[comment.id] || ''}
                  onChange={(e) =>
                    setReplyContentMap((prev) => ({ ...prev, [comment.id]: e.target.value }))
                  }
                />
                <div className="flex items-center gap-3">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                    disabled={replySubmittingId === comment.id}
                    onClick={() => handleSubmitComment(comment.id)}
                  >
                    {replySubmittingId === comment.id ? '回复中...' : '提交回复'}
                  </button>
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setActiveReplyId(null);
                      setReplyContentMap((prev) => ({ ...prev, [comment.id]: '' }));
                    }}
                  >
                    取消
                  </button>
                </div>
              </div>
            )}
            {hasReplies && (
              <div className="mt-3 space-y-3">
                {comment.replies?.map((reply) => renderComment(reply, level + 1))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleSubmitComment = async (parentId?: number) => {
    if (!id) return;
    const content = parentId ? replyContentMap[parentId] : newComment;
    if (!content || !content.trim()) {
      setSubmitError('请输入评论内容');
      return;
    }

    setSubmitError(null);
    if (parentId) {
      setReplySubmittingId(parentId);
    } else {
      setIsSubmitting(true);
    }

    try {
      const payload = { parent_id: parentId || undefined, content: content.trim() };
      const resp = await axios.post(`/api/posts/${id}/comments`, payload);
      console.log('POST /api/posts/:id/comments response', resp?.data);
      if (resp?.data?.code && resp.data.code !== '0000') {
        setSubmitError('评论失败');
      } else {
        if (parentId) {
          setReplyContentMap((prev) => ({ ...prev, [parentId]: '' }));
          setActiveReplyId(null);
        } else {
          setNewComment('');
        }

        if (commentsPage !== 1) {
          setCommentsPage(1);
        } else {
          await fetchComments();
        }
      }
    } catch (err) {
      console.error('submit comment failed', err);
      setSubmitError('提交失败，请稍后再试');
    } finally {
      if (parentId) {
        setReplySubmittingId(null);
      } else {
        setIsSubmitting(false);
      }
    }
  };

  const totalPages =
    commentsTotal && commentsTotal > 0
      ? Math.max(1, Math.ceil(commentsTotal / commentsSize))
      : null;

  const disablePrev = commentsPage <= 1 || commentsLoading;
  const disableNext =
    commentsLoading ||
    (totalPages !== null ? commentsPage >= totalPages : comments.length < commentsSize);

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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">评论</h2>
                <span className="text-sm text-gray-500">{commentsTotal ?? comments.length} 条</span>
              </div>

              <div className="mb-6 space-y-3">
                <textarea
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400"
                  rows={4}
                  placeholder="写下你的想法..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                {submitError && <div className="text-sm text-red-500">{submitError}</div>}
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                    disabled={isSubmitting}
                    onClick={() => handleSubmitComment()}
                  >
                    {isSubmitting ? '提交中...' : '发布评论'}
                  </button>
                </div>
              </div>

              {commentsLoading && <div className="text-gray-500">评论加载中...</div>}
              {commentsError && <div className="text-red-500">{commentsError}</div>}

              {!commentsLoading && !commentsError && comments.length === 0 && (
                <div className="text-gray-500 text-sm">还没有评论，快来抢沙发~</div>
              )}

              {!commentsLoading && !commentsError && comments.length > 0 && (
                <div className="space-y-4">
                  {comments.map((comment) => renderComment(comment))}
                </div>
              )}

              <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
                <div>
                  第 {commentsPage} 页
                  {totalPages ? ` / 共 ${totalPages} 页` : ''}
                  {commentsTotal !== null
                    ? ` · 共 ${commentsTotal} 条`
                    : ` · 本页 ${comments.length} 条`}
                </div>
                <div className="space-x-2">
                  <button
                    className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-60"
                    disabled={disablePrev}
                    onClick={() => setCommentsPage((p) => Math.max(1, p - 1))}
                  >
                    上一页
                  </button>
                  <button
                    className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-60"
                    disabled={disableNext}
                    onClick={() => setCommentsPage((p) => p + 1)}
                  >
                    下一页
                  </button>
                </div>
              </div>
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
