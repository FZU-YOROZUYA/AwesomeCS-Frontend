import React from 'react';
import styles from './style.module.scss';

export type VoiceOrbMode = 'idle' | 'listening' | 'speaking' | 'processing';

interface VoiceOrbProps {
  mode: VoiceOrbMode;
  onClick?: () => void;
}

const VoiceOrb: React.FC<VoiceOrbProps> = ({ mode, onClick }) => {
  const isListening = mode === 'listening';
  const isSpeaking = mode === 'speaking';
  const isProcessing = mode === 'processing';

  return (
    <div className={styles.orbContainer}>
      {/* AI说话时的波纹扩散效果 */}
      {isSpeaking && (
        <>
          <div className={styles.ripple1} />
          <div className={styles.ripple2} />
          <div className={styles.ripple3} />
        </>
      )}

      {/* 核心球体 */}
      <div
        onClick={onClick}
        className={`${styles.coreOrb} ${isListening ? styles.listening : ''} ${isSpeaking ? styles.speaking : ''} ${isProcessing ? styles.processing : ''}`}
      >
        {/* 内部光泽效果 */}
        <div className={styles.orbGloss} />

        {/* 说话时的核心微动 */}
        {isSpeaking && <div className={styles.orbPulse} />}
      </div>

      {/* 监听模式下的呼吸光环 */}
      {isListening && <div className={styles.listeningRing} />}

      {/* 思考模式下的加载光环 */}
      {isProcessing && <div className={styles.processingRing} />}
    </div>
  );
};

export default VoiceOrb;
