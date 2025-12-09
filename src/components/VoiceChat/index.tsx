import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import VoiceOrb, { type VoiceOrbMode } from './VoiceOrb';
import styles from './style.module.scss';
import { message } from 'antd';

const VoiceChat = (param: { id?: string }) => {
  const { id } = param;
  const [mode, setMode] = useState<VoiceOrbMode>('idle'); // idle, listening, processing, speaking
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // (保留占位) 如果需要本地模拟回复，可以使用 aiResponses

  // 录制并发送音频的流程：startRecording -> stopRecording -> upload -> play response

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const options: MediaRecorderOptions = {};
      const mr = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        setMode('processing');
        try {
          const blob = new Blob(chunksRef.current, { type: chunksRef.current[0]?.type || 'audio/webm' });
          const arrayBuffer = await blob.arrayBuffer();
          if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          const audioBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer.slice(0));
          const wavBuffer = encodeWAV(audioBuffer);

          // send to backend
          if (!id) {
            message.error('缺少 interview id');
            setMode('idle');
            return;
          }
          const token = localStorage.getItem('token') || '';
          const url = `/api/interview/${id}/audio`;
          const resp = await axios.post(url, wavBuffer, {
            headers: { Authorization: token, 'Content-Type': 'application/octet-stream' },
            responseType: 'arraybuffer',
          });

          // resp.data is ArrayBuffer of audio (wav)
          const resArray = resp.data as ArrayBuffer;
          const resAudioCtx = audioCtxRef.current;
          const decoded = await resAudioCtx.decodeAudioData(resArray.slice(0));

          // play
          const source = resAudioCtx.createBufferSource();
          source.buffer = decoded;
          source.connect(resAudioCtx.destination);
          source.start(0);
          setMode('speaking');
          source.onended = () => {
            setMode('idle');
          };
        } catch (err) {
          console.error('record/upload/play error', err);
          message.error('音频处理或上传失败');
          setMode('idle');
        } finally {
          // stop tracks
          try {
            mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
          } catch (e) {}
          mediaStreamRef.current = null;
        }
      };

      mr.start();
      setMode('listening');
    } catch (err) {
      console.error('getUserMedia error', err);
      message.error('无法获取麦克风权限');
    }
  };

  const stopRecording = () => {
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== 'inactive') {
      mr.stop();
      mediaRecorderRef.current = null;
    }
  };

  const handleToggle = () => {
    if (mode === 'idle') {
      startRecording();
    } else if (mode === 'listening') {
      stopRecording();
    } else if (mode === 'speaking') {
      // nothing to do, user can wait
    } else {
      // processing: do nothing
    }
  };

  // 组件卸载时清理语音/媒体资源
  useEffect(() => {
    return () => {
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop();
      } catch (e) {}
      try {
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      } catch (e) {}
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
        audioCtxRef.current = null;
      }
    };
  }, []);

  // Encode AudioBuffer -> WAV (PCM16)
  function encodeWAV(audioBuffer: AudioBuffer): ArrayBuffer {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const samples = audioBuffer.length;
    const bytesPerSample = 2; // 16-bit
    const blockAlign = numChannels * bytesPerSample;
    const dataSize = samples * blockAlign;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 36 + dataSize, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, numChannels, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sampleRate * blockAlign) */
    view.setUint32(28, sampleRate * blockAlign, true);
    /* block align (channel count * bytesPerSample) */
    view.setUint16(32, blockAlign, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, dataSize, true);

    // write interleaved PCM16
    let offset = 44;
    const channelData: Float32Array[] = [];
    for (let ch = 0; ch < numChannels; ch++) channelData.push(audioBuffer.getChannelData(ch));

    for (let i = 0; i < samples; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        let sample = channelData[ch][i];
        // clamp
        sample = Math.max(-1, Math.min(1, sample));
        // scale to 16-bit signed int
        const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(offset, Math.round(intSample), true);
        offset += 2;
      }
    }

    return buffer;
  }

  function writeString(view: DataView, offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

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

      {/* 底部控制栏：仅保留主控制按钮（移除左右辅助按钮） */}
      <div className={styles.controls}>
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
      </div>
    </div>
  );
};

export default VoiceChat;
