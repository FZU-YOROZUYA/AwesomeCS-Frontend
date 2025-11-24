import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Select } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  HeartOutlined,
  EditOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  BoldOutlined,
  ItalicOutlined,
  FontSizeOutlined,
  CodeOutlined,
  UnorderedListOutlined,
  CommentOutlined,
  SaveOutlined,
  SendOutlined,
} from '@ant-design/icons';

const WriteBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [markdown, setMarkdown] = useState(`# 标题
## 二级标题

这是一个段落，支持 **粗体** 和 *斜体* 文字。

### 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

- 列表项 1
- 列表项 2
- 列表项 3

> 这是一个引用块
`);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black mb-2">写博客</h1>
              <p className="text-black">分享你的技术见解和经验</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">博客标题</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="请输入博客标题..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">分区选择</label>
                  <Select
                    value={category || undefined}
                    onChange={(value) => setCategory(value)}
                    placeholder="选择分区"
                    className="w-full"
                    size="large"
                    style={{ width: '100%' }}
                  >
                    <Select.Option value="frontend">前端</Select.Option>
                    <Select.Option value="backend">后端</Select.Option>
                    <Select.Option value="algorithm">算法</Select.Option>
                    <Select.Option value="mobile">移动开发</Select.Option>
                    <Select.Option value="ai">人工智能</Select.Option>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-black">博客内容</h2>
                  <div className="flex items-center space-x-2 text-sm text-black">
                    <InfoCircleOutlined />
                    <span>支持 Markdown 语法</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const textarea = document.querySelector('textarea');
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const selectedText = markdown.substring(start, end);
                        const newText =
                          markdown.substring(0, start) +
                          `**${selectedText}**` +
                          markdown.substring(end);
                        setMarkdown(newText);
                      }
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="粗体"
                  >
                    <BoldOutlined className="text-black" />
                  </button>
                  <button
                    onClick={() => {
                      const textarea = document.querySelector('textarea');
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const selectedText = markdown.substring(start, end);
                        const newText =
                          markdown.substring(0, start) +
                          `*${selectedText}*` +
                          markdown.substring(end);
                        setMarkdown(newText);
                      }
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="斜体"
                  >
                    <ItalicOutlined className="text-black" />
                  </button>
                  <button
                    onClick={() => {
                      const textarea = document.querySelector('textarea');
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const newText =
                          markdown.substring(0, start) + '\n## ' + markdown.substring(start);
                        setMarkdown(newText);
                      }
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="标题"
                  >
                    <FontSizeOutlined className="text-black" />
                  </button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <button
                    onClick={() => {
                      const textarea = document.querySelector('textarea');
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const newText =
                          markdown.substring(0, start) +
                          '\n```javascript\n\n```\n' +
                          markdown.substring(start);
                        setMarkdown(newText);
                      }
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="代码块"
                  >
                    <CodeOutlined className="text-black" />
                  </button>
                  <button
                    onClick={() => {
                      const textarea = document.querySelector('textarea');
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const newText =
                          markdown.substring(0, start) + '\n- ' + markdown.substring(start);
                        setMarkdown(newText);
                      }
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="列表"
                  >
                    <UnorderedListOutlined className="text-black" />
                  </button>
                  <button
                    onClick={() => {
                      const textarea = document.querySelector('textarea');
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const newText =
                          markdown.substring(0, start) + '\n> ' + markdown.substring(start);
                        setMarkdown(newText);
                      }
                    }}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="引用"
                  >
                    <CommentOutlined className="text-black" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <div className="p-4">
                  <div className="text-sm font-medium text-black mb-2">Markdown 源码</div>
                  <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="w-full h-[500px] p-4 font-mono text-sm border-0 focus:ring-0 resize-none text-black"
                    placeholder="开始写作你的博客..."
                  />
                </div>

                <div className="p-4 bg-gray-50">
                  <div className="text-sm font-medium text-black mb-2">实时预览</div>
                  <div className="prose prose-sm max-w-none h-[500px] overflow-y-auto">
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
                      {markdown}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-black flex items-center">
                <SaveOutlined className="mr-2" />
                自动保存于 2分钟前
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-6 py-3 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  保存草稿
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
                  <SendOutlined className="mr-2" />
                  发布博客
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
