import React from 'react';
    import classNames from 'classnames';

    /**
     * VoiceOrb 组件
     * 核心视觉组件，根据不同状态展示不同的动画效果
     * 
     * 状态说明:
     * - idle: 待机状态，缓慢呼吸
     * - listening: 听取用户声音，轻微律动
     * - processing: 思考中，快速旋转或收缩
     * - speaking: AI说话中，大幅度波动
     */
    const VoiceOrb = ({ statu }) => {
      
      // 基础样式
      const baseClasses = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-in-out";

      // 根据状态调整动画速度和大小
      const getAnimationClass = (layerIndex) => {
        if (status === 'speaking') return 'animate-blob-fast';
        if (status === 'processing') return 'animate-pulse';
        return 'animate-blob';
      };

      const getScale = () => {
        if (status === 'speaking') return 'scale-125';
        if (status === 'listening') return 'scale-110';
        if (status === 'processing') return 'scale-90';
        return 'scale-100';
      };

      return (
        <div className={classNames("relative w-64 h-64 md:w-96 md:h-96 transition-all duration-700", getScale())}>
          {/* 核心光晕 - 深蓝色 */}
          <div className={classNames(
            baseClasses,
            "w-full h-full bg-blue-300 opacity-70 mix-blend-multiply filter blur-xl",
            getAnimationClass(1)
          )} style={{ animationDelay: '0s' }}></div>

          {/* 第二层 - 青色 */}
          <div className={classNames(
            baseClasses,
            "w-full h-full bg-cyan-300 opacity-70 mix-blend-multiply filter blur-xl",
            getAnimationClass(2)
          )} style={{ animationDelay: '2s', transform: 'translate(-50%, -50%) rotate(90deg)' }}></div>

          {/* 第三层 - 品牌蓝 */}
          <div className={classNames(
            baseClasses,
            "w-full h-full bg-brand-400 opacity-70 mix-blend-multiply filter blur-xl",
            getAnimationClass(3)
          )} style={{ animationDelay: '4s', transform: 'translate(-50%, -50%) rotate(180deg)' }}></div>
          
          {/* 中心高亮核心 */}
          <div className={classNames(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white opacity-20 rounded-full blur-2xl transition-all duration-500",
            status === 'speaking' ? 'scale-110 opacity-40' : 'scale-100'
          )}></div>
        </div>
      );
    };

    export default VoiceOrb;