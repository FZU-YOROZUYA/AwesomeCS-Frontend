import { useState, useEffect } from 'react';
import VoiceOrb, { type VoiceOrbMode } from './VoiceOrb';
import styles from './style.module.scss';

const VoiceChat = () => {
  const [mode, setMode] = useState<VoiceOrbMode>('idle'); // idle, listening, processing, speaking

  // 模拟 AI 的回复内容库
  const aiResponses = [
    '我听到了，这是一个非常有趣的观点。我们可以深入探讨一下。',
    '好的，我已经记录下来了。请问还有什么需要补充的吗？',
    '这个问题很有深度，让我想想... 我觉得可以从两个方面来理解。',
    '没问题，正在为您处理。请稍等片刻。',
    '你好！很高兴能与你交谈，今天过得怎么样？',
  ];

  // 语音合成播放函数
  const speak = (text: any) => {
    if ('speechSynthesis' in window) {
      // 停止当前可能正在播放的语音
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // 尝试获取中文语音包
      const voices = window.speechSynthesis.getVoices();
      const zhVoice = voices.find((v) => v.lang.includes('zh'));
      if (zhVoice) utterance.voice = zhVoice;

      // 语速和音调微调
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // 播放结束回调
      utterance.onend = () => {
        setMode('idle');
      };

      // 错误处理
      utterance.onerror = () => {
        console.error('Speech synthesis error');
        setMode('idle');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // 不支持语音合成时的降级处理
      console.warn('Browser does not support SpeechSynthesis');
      setTimeout(() => {
        setMode('idle');
      }, 3000);
    }
  };

  const handleToggle = () => {
    if (mode === 'idle') {
      // 1. 点击开始：进入监听模式
      setMode('listening');
    } else if (mode === 'listening') {
      // 2. 点击结束：进入思考模式
      setMode('processing');

      // 模拟思考时间 (1-2秒)
      setTimeout(() => {
        setMode('speaking');
        // 随机选择一条回复并播放
        const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        speak(response);
      }, 1500);
    } else if (mode === 'speaking') {
      // 3. AI说话时点击：打断并停止
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setMode('idle');
    } else {
      // 其他状态重置
      setMode('idle');
    }
  };

  // 组件卸载时清理语音
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* 顶部状态栏 */}
      <div className={styles.header}>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
          <i className="fas fa-chevron-down text-gray-500 text-sm"></i>
        </div>
        <div className={styles.statusText}>
          {mode === 'idle' && 'Voice Mode'}
          {mode === 'listening' && 'Listening...'}
          {mode === 'processing' && 'Thinking...'}
          {mode === 'speaking' && 'Speaking...'}
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
          <i className="fas fa-ellipsis-h text-gray-500 text-sm"></i>
        </div>
      </div>

      {/* 核心语音球 */}
      <VoiceOrb mode={mode} onClick={handleToggle} />

      {/* 提示文本 */}
      {mode === 'idle' && <div className={styles.tips}>Tap to speak</div>}

      {/* 底部控制栏 */}
      <div className={styles.controls}>
        <button className={styles.controlButton}>
          <i className="fas fa-keyboard text-xl"></i>
        </button>

        {/* 主控制按钮 */}
        <button
          onClick={handleToggle}
          className={`${styles.mainButton} ${mode === 'listening' ? styles.active : ''}`}
        >
          {mode === 'listening' ? (
            <i className="fas fa-stop text-2xl"></i>
          ) : (
            <i className="fas fa-microphone text-2xl"></i>
          )}
        </button>

        <button className={styles.controlButton}>
          <i className="fas fa-headphones text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default VoiceChat;
