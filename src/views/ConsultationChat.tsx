import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layout, Spin, message } from 'antd';
import axios from 'axios';
import { ConsultationProvider, useConsultation } from '../contexts/ConsultationContext';
import ConsultationSidebar from '../components/ConsultationSidebar';
import ExpertHeader from '../components/ExpertHeader';
import ChatContent from '../components/ChatContent';
import ChatInput from '../components/ChatInput';
import type { ConsultationResponse, ConsultationMessageResponse } from '../types';

const { Content } = Layout;

/**
 * 咨询聊天内容组件（内部组件，使用 Context）
 */
interface ConsultationChatContentProps {
  messages: ConsultationMessageResponse[];
  loading: boolean;
  onSend: (content: string) => void;
  myAvatarUrl?: string;
}

const ConsultationChatContent: React.FC<ConsultationChatContentProps> = ({
  messages,
  loading,
  onSend,
  myAvatarUrl,
}) => {
  const { selectedConsultation } = useConsultation();

  const currentConsultation = selectedConsultation;
  const currentMessages = useMemo(() => {
    if (!currentConsultation) return [];
    return messages;
  }, [currentConsultation, messages]);

  if (!currentConsultation) {
    return (
      <Content
        className="flex-1 flex items-center justify-center bg-white"
        style={{ overflow: 'hidden' }}
      >
        <div className="text-gray-500">请从左侧选择咨询</div>
      </Content>
    );
  }

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* 独立滚动的聊天内容区域 */}
      <div
        style={{ flex: '1 1 0%', minHeight: 0, maxHeight: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
      >
        <Spin spinning={loading}>
          <ChatContent
            messages={currentMessages}
            expertAvatarUrl={currentConsultation.expert_avatar}
            expertName={currentConsultation.expert_name}
            seekerId={currentConsultation.seeker_id}
            seekerName={currentConsultation.seeker_name}
            seekerAvatarUrl={currentConsultation.seeker_avatar}
            myUserId={
              currentConsultation.is_expert
                ? currentConsultation.expert_id
                : currentConsultation.seeker_id
            }
            myAvatarUrl={myAvatarUrl}
            isExpert={currentConsultation.is_expert}
          />
        </Spin>
      </div>

      <div style={{ flexShrink: 0 }}>
        <ChatInput onSend={onSend} disabled={currentConsultation.status !== 1} />
      </div>
    </div>
  );
};

/**
 * 咨询聊天页面主组件
 * 使用 Ant Design Layout 组件构建：Sider + Header + Content + Footer
 */
const ConsultationChatInner: React.FC = () => {
  const [consultations, setConsultations] = useState<ConsultationResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesByConsultation, setMessagesByConsultation] = useState<
    Record<string, ConsultationMessageResponse[]>
  >({});
  const [myAvatar, setMyAvatar] = useState<string>('');
  const wsRef = useRef<WebSocket | null>(null);
  const { selectedConsultation } = useConsultation();

  // 安全解析，确保超大整型转成字符串
  const safeParseResponse = (data: string) => {
    try {
      const patched = data
        .replace(/"consultation_id"\s*:\s*(\d{15,})/g, '"consultation_id":"$1"')
        .replace(/"expert_id"\s*:\s*(\d{15,})/g, '"expert_id":"$1"')
        .replace(/"seeker_id"\s*:\s*(\d{15,})/g, '"seeker_id":"$1"');
      return JSON.parse(patched);
    } catch (err) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  };

  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/consultations/me', {
          transformResponse: [
            (data) => {
              if (typeof data === 'string') return safeParseResponse(data);
              return data;
            },
          ],
        });
        const list = res?.data?.data ?? res?.data ?? [];
        const normalized = Array.isArray(list)
          ? list.map((item) => ({
              ...item,
              consultation_id: String(item.consultation_id ?? item.id ?? ''),
              expert_id: String(item.expert_id ?? ''),
              seeker_id: String(item.seeker_id ?? ''),
              is_expert: item.is_expert,
            }))
          : [];
        setConsultations(normalized);
      } catch (err) {
        console.error('fetch consultations/me error', err);
        setConsultations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  // 获取当前用户头像
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile');
        const avatarUrl = res?.data?.data?.avatar || res?.data?.avatar;
        if (avatarUrl) setMyAvatar(avatarUrl);
      } catch (err) {
        console.error('fetch user profile error', err);
      }
    };

    fetchProfile();
  }, []);

  // 安全解析消息列表，保持大整数为字符串
  const safeParseMessages = (data: string) => {
    try {
      const patched = data
        .replace(/"msg_id"\s*:\s*(\d{15,})/g, '"msg_id":"$1"')
        .replace(/"consultation_id"\s*:\s*(\d{15,})/g, '"consultation_id":"$1"')
        .replace(/"sender_id"\s*:\s*(\d{15,})/g, '"sender_id":"$1"');
      return JSON.parse(patched);
    } catch (err) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  };

  // 选中咨询变化时拉取消息
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConsultation) return;
      setLoadingMessages(true);
      try {
        const res = await axios.get(`/api/consultations/${selectedConsultation.consultation_id}/messages`, {
          transformResponse: [
            (data) => {
              if (typeof data === 'string') return safeParseMessages(data);
              return data;
            },
          ],
        });
        const list = res?.data?.data ?? res?.data ?? [];
        const normalized = Array.isArray(list)
          ? list.map((item) => ({
              ...item,
              msg_id: String(item.msg_id ?? item.id ?? ''),
              consultation_id: String(item.consultation_id ?? selectedConsultation.consultation_id),
              sender_id: String(item.sender_id ?? ''),
            }))
          : [];
        setMessagesByConsultation((prev) => ({
          ...prev,
          [selectedConsultation.consultation_id]: normalized,
        }));
      } catch (err) {
        console.error('fetch consultations messages error', err);
        setMessagesByConsultation((prev) => ({
          ...prev,
          [selectedConsultation.consultation_id]: [],
        }));
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedConsultation]);

  // 单一 WebSocket 连接 /ws/consultation
  useEffect(() => {
    const token = localStorage.getItem('token');
    const baseURL = axios.defaults.baseURL || 'http://localhost:8085';
    const urlBase = baseURL.replace('http', 'ws') + '/ws/consultation';
    const url = token ? `${urlBase}?token=${token}` : urlBase;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (ev) => {
      try {
        const raw = typeof ev.data === 'string' ? ev.data : '';
        const parsed = typeof raw === 'string' ? safeParseMessages(raw) : ev.data;
        const msg = parsed?.data || parsed;
        if (!msg) return;
        const normalized = {
          msg_id: String(msg.msg_id ?? msg.id ?? Date.now()),
          consultation_id: String(msg.consultation_id ?? ''),
          sender_id: String(msg.sender_id ?? ''),
          content: msg.content ?? '',
          message_type: msg.message_type ?? 'text',
          created_at: msg.send_time ?? msg.created_at ?? new Date().toISOString(),
        } as ConsultationMessageResponse;
        setMessagesByConsultation((prev) => {
          const list = prev[normalized.consultation_id] || [];
          return {
            ...prev,
            [normalized.consultation_id]: [...list, normalized],
          };
        });
      } catch (err) {
        console.error('ws message parse error', err);
      }
    };

    ws.onerror = (err) => {
      console.error('ws error', err);
    };

    return () => {
      try {
        ws.close();
      } catch (e) {}
      wsRef.current = null;
    };
  }, []);

  const handleSend = async (content: string) => {
    const text = content.trim();
    if (!text) return;
    const current = selectedConsultation;
    if (!current) return;
    if (current.status !== 1) {
      message.warning('该咨询已结束，无法发送消息');
      return;
    }
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert('WebSocket 未连接');
      return;
    }
    const toId = current.is_expert ? current.seeker_id : current.expert_id;
    const payload = {
      consultation_id: current.consultation_id,
      to_id: toId,
      content: text,
    };
    ws.send(JSON.stringify(payload));

    // 乐观更新本地消息
    const localMsg: ConsultationMessageResponse = {
      msg_id: `${Date.now()}`,
      consultation_id: current.consultation_id,
      sender_id: current.is_expert ? current.expert_id : current.seeker_id,
      content: text,
      message_type: 'text',
      created_at: new Date().toISOString(),
    };
    setMessagesByConsultation((prev) => {
      const list = prev[current.consultation_id] || [];
      return {
        ...prev,
        [current.consultation_id]: [...list, localMsg],
      };
    });
  };

  const currentMessages = selectedConsultation
    ? messagesByConsultation[selectedConsultation.consultation_id] || []
    : [];

  return (
    <Spin spinning={loading}>
      <Layout
        style={{
          overflow: 'hidden',
          height: '100vh',
          display: 'flex',
          maxHeight: '100vh',
        }}
      >
        <ConsultationSidebar consultations={consultations} />

        <Layout
          className="flex-1 flex flex-col bg-white"
          style={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxHeight: '100%',
          }}
        >
          <ExpertHeader />
          <ConsultationChatContent
            messages={currentMessages}
            loading={loadingMessages}
            onSend={handleSend}
            myAvatarUrl={myAvatar}
          />
        </Layout>
      </Layout>
    </Spin>
  );
};

const ConsultationChat: React.FC = () => (
  <ConsultationProvider>
    <ConsultationChatInner />
  </ConsultationProvider>
);

export default ConsultationChat;
