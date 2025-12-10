import VoiceChat from '../components/VoiceChat';
import { useParams } from 'react-router-dom';

export const AIInterview = () => {
  const {id} = useParams();
  
  return <VoiceChat id={id ?? "-1"}/>;
};

export default AIInterview;
