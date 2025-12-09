import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { ConsultationResponse } from '../types';

interface ConsultationContextType {
  /** 当前选中的咨询 */
  selectedConsultation: ConsultationResponse | null;
  /** 设置选中的咨询 */
  setSelectedConsultation: (consultation: ConsultationResponse | null) => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

interface ConsultationProviderProps {
  children: ReactNode;
}

/**
 * Consultation Context Provider
 * 提供咨询相关的全局状态管理
 */
export const ConsultationProvider: React.FC<ConsultationProviderProps> = ({ children }) => {
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationResponse | null>(
    null
  );

  return (
    <ConsultationContext.Provider value={{ selectedConsultation, setSelectedConsultation }}>
      {children}
    </ConsultationContext.Provider>
  );
};

/**
 * 使用 Consultation Context 的 Hook
 */
export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (context === undefined) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
};
