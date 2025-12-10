import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Backend WS host/port. Default to current hostname with port 8085.
const BACKEND_WS_PORT = 8085;
function buildWsHost() {
  const hostname = window.location.hostname;
  return `${hostname}:${BACKEND_WS_PORT}`;
}

const AIInterviewVoice: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [connected, setConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    let reconnectAttempts = 0;
    let manualClose = false;

    const connect = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      const host = buildWsHost();
      const url = `${protocol}://${host}/ws/interview/${id}?token=${token}`;
      console.debug('[AIInterviewVoice] connecting websocket to', url);
      const ws = new WebSocket(url);
      ws.binaryType = 'arraybuffer';
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectAttempts = 0;
        console.debug('[AIInterviewVoice] ws open');
        setConnected(true);
      };

      ws.onmessage = (ev) => {
      if (ev.data instanceof ArrayBuffer) {
        const arrayBuffer = ev.data as ArrayBuffer;
        // ensure AudioContext
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
        const audioCtx = audioCtxRef.current;

        audioCtx.decodeAudioData(arrayBuffer.slice(0), (audioBuffer) => {
          // stop previous source if exists
          if (sourceRef.current) {
            try {
              sourceRef.current.stop();
            } catch (e) {}
            sourceRef.current.disconnect();
            sourceRef.current = null;
          }
          // 如果收到的是文本消息，检查是否为 Token 异常，若是则跳转登录
          if (typeof ev.data === 'string') {
            try {
              const obj = JSON.parse(ev.data);
              const info = obj?.info || obj?.message || obj?.error;
              if (info === 'Token 异常') {
                console.warn('[AIInterviewVoice] token invalid, redirect to login');
                navigate('/login');
                return;
              }
            } catch (e) {
              // 非 JSON 文本或其他文本，忽略
            }
          }

          const source = audioCtx.createBufferSource();
          source.buffer = audioBuffer;

          // create analyser
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 2048;
          analyserRef.current = analyser;

          source.connect(analyser);
          analyser.connect(audioCtx.destination);

          source.onended = () => {
            setIsPlaying(false);
            // stop animation
            if (rafRef.current) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }
          };

          sourceRef.current = source;
          source.start(0);
          setIsPlaying(true);
          drawWave();
        }, (err) => {
          console.error('decodeAudioData error', err);
        });
      }
      };

      ws.onclose = (ev) => {
        console.warn('[AIInterviewVoice] ws closed', ev.code, ev.reason);
        setConnected(false);
        if (!manualClose) {
          // try reconnect with backoff
          reconnectAttempts++;
          const backoff = Math.min(30000, 1000 * Math.pow(2, reconnectAttempts));
          console.debug('[AIInterviewVoice] reconnecting in', backoff);
          setTimeout(() => connect(), backoff);
        }
      };

      ws.onerror = (err) => {
        console.error('[AIInterviewVoice] ws error', err);
        setConnected(false);
        // note: onclose will handle reconnect
      };
    };

    connect();

    return () => {
      manualClose = true;
      try {
        wsRef.current?.close();
      } catch (e) {}
      // stop animation
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      // stop audio source
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch (e) {}
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      // close audio context
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
        audioCtxRef.current = null;
      }
    };
  }, [id, navigate]);

  // draw waveform from analyser to canvas
  function drawWave() {
    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    const audioCtx = audioCtxRef.current;
    if (!analyser || !canvas || !audioCtx) return;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = '#ffffff';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = '#2563EB';
      canvasCtx.beginPath();
      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    // start
    if (!rafRef.current) draw();
  }

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options: MediaRecorderOptions = { mimeType: 'audio/webm' };
      const mr = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mr;
      const chunks: Blob[] = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      mr.onstop = async () => {
        try {
          const blob = new Blob(chunks, { type: chunks[0]?.type || 'audio/webm' });
          const arrayBuffer = await blob.arrayBuffer();
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
          const wavBuffer = encodeWAV(audioBuffer);
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(wavBuffer);
          }
          // stop tracks
          const tracks = stream.getTracks();
          tracks.forEach((t) => t.stop());
        } catch (err) {
          console.error('encode/send wav err', err);
        }
      };

      mr.start();
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = () => {
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== 'inactive') {
      mr.stop();
      mediaRecorderRef.current = null;
    }
  };

  // Toggle helper: press once start, press again stop
  const [isRecording, setIsRecording] = useState(false);
  const toggleRecording = async () => {
    if (!isRecording) {
      await startRecording();
      setIsRecording(true);
    } else {
      stopRecording();
      setIsRecording(false);
    }
  };

  // Encode AudioBuffer -> WAV (PCM16) ArrayBuffer
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-full w-28 h-28 flex items-center justify-center bg-white shadow-lg">
          <button
            onClick={toggleRecording}
            aria-label={isRecording ? '停止录音' : '开始录音'}
            className={`w-20 h-20 rounded-full ${isRecording ? 'bg-red-700' : 'bg-red-500 hover:bg-red-600'} active:bg-red-800 focus:outline-none`}
          />
        </div>

        <div className="flex items-center flex-col gap-2">
          <div className={`w-6 h-6 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-300'}`} />
          <canvas ref={canvasRef} width={160} height={60} className="rounded-md bg-white shadow" />
        </div>
      </div>
    </div>
  );
};

export default AIInterviewVoice;
