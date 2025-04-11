
import { useState, useCallback } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set default voice (optional)
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(voice => 
        voice.lang.includes('en-IN') || voice.lang.includes('hi-IN')
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
      
      // Set properties
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Events
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
      
      return true;
    }
    return false;
  }, []);
  
  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);
  
  return { speak, stop, isSpeaking };
};
