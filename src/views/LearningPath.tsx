import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Message = { role: 'user' | 'assistant'; content: string };

const LearningPath: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const resp = await axios.get('/api/study_path/history');
        if (resp?.data && resp.data.code === '0000') {
          const d = resp.data.data;
          // 支持后端返回两种结构：{ data: { list: [...] } } 或者 { data: [...] }
          let list: any[] = [];
          if (Array.isArray(d)) {
            list = d;
          } else if (d && Array.isArray(d.list)) {
            list = d.list;
          }
          const normalized: Message[] = list.map((item: any) => {
            const role: Message['role'] = item?.role === 'assistant' ? 'assistant' : 'user';
            const content: string = item?.content ?? '';
            return { role, content };
          });
          setMessages(normalized);
        } else {
          console.error('fetch study path history error', resp?.data);
        }
      } catch (err) {
        console.error('fetch study path history failed', err);
      }
    };
    fetchHistory();
  }, []);

  const handleClear = async () => {
    try {
      await axios.delete('/api/study_path');
      setMessages([]);
    } catch (err) {
      console.error('clear study path failed', err);
    }
  };

  const handleSend = async () => {
    if (isSending) return;
    const text = inputText.trim();
    if (!text) return;

    const token = localStorage.getItem('token') || '';

    // Append user message and placeholder assistant message
    let assistantIndex = -1;
    setMessages((prev) => {
      const next: Message[] = [...prev, { role: 'user', content: text }, { role: 'assistant', content: '' }];
      assistantIndex = next.length - 1;
      return next;
    });
    setInputText('');
    setIsSending(true);

    let lastLen = 0;
    try {
      await axios.post('/api/study_path', null, {
        params: { text },
        headers: {
          Authorization: token,
        },
        responseType: 'text',
        onDownloadProgress: (progressEvent: any) => {
          try {
            const target = progressEvent?.event?.target || progressEvent?.target || progressEvent?.currentTarget;
            const responseText: string = target?.responseText || '';
            if (typeof responseText === 'string' && responseText.length > lastLen) {
              const chunk = responseText.slice(lastLen);
              lastLen = responseText.length;
              if (chunk) {
                setMessages((prev) =>
                  prev.map((m, idx) => (idx === assistantIndex ? { ...m, content: `${m.content}${chunk}` } : m))
                );
              }
            }
          } catch (e) {
            console.error('progress parse error', e);
          }
        },
      });
    } catch (err) {
      console.error('send study_path failed', err);
      setMessages((prev) =>
        prev.map((m, idx) => (idx === assistantIndex ? { ...m, content: m.content || '发送失败，请重试' } : m))
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto">
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-white"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">学习路线助手</h2>
                <p className="text-sm text-gray-500">在线 • 随时为您服务</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium shadow-sm transition-colors"
            >
              清空记录
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-white">
          {messages.map((m, idx) => (
            m.role === 'assistant' ? (
              <div key={idx} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-robot text-white text-xs"></i>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3 max-w-2xl prose prose-sm text-gray-800">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus as any}
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
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div key={idx} className="flex items-end justify-end">
                <div className="bg-blue-500 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-2xl text-right">
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            )
          ))}
        </div>

        <div className="border-t border-gray-200 bg-white p-4 sticky bottom-0 z-10">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800 placeholder-gray-500"
                placeholder="请告诉我你想学习的技术方向..."
                rows={2}
              ></textarea>
            </div>
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="h-full px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white rounded-2xl font-medium shadow-sm transition-colors"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
