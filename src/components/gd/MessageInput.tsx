import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function MessageInput({ onSendMessage, isMuted, onToggleMute }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleSend = useCallback(() => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  }, [message, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startVoiceRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Please use Chrome or Edge for voice input.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      if (isMuted) onToggleMute();
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setMessage(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast({
        title: "Voice Recognition Error",
        description: "Please try again.",
        variant: "destructive",
      });
    };

    recognition.start();
  }, [isMuted, onToggleMute, toast]);

  const stopVoiceRecognition = useCallback(() => {
    setIsListening(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 p-3 bg-card rounded-2xl shadow-card"
    >
      {/* Mode toggle */}
      <div className="flex items-center gap-1 p-1 bg-soft/30 rounded-xl">
        <button
          onClick={() => setInputMode('text')}
          className={`p-2 rounded-lg transition-colors ${
            inputMode === 'text' ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground'
          }`}
        >
          <Keyboard className="w-4 h-4" />
        </button>
        <button
          onClick={() => setInputMode('voice')}
          className={`p-2 rounded-lg transition-colors ${
            inputMode === 'voice' ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Input area */}
      <div className="flex-1 flex items-center gap-2">
        {inputMode === 'text' ? (
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your point..."
            className="flex-1 border-0 bg-soft/30 focus-visible:ring-1 focus-visible:ring-primary"
          />
        ) : (
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-soft/30 rounded-lg">
            {isListening ? (
              <>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                  <span className="text-sm text-foreground">Listening...</span>
                </div>
                <p className="flex-1 text-sm text-muted truncate">{message || 'Speak now...'}</p>
              </>
            ) : (
              <p className="text-sm text-muted">Click mic to start speaking</p>
            )}
          </div>
        )}

        {/* Action button */}
        {inputMode === 'voice' ? (
          <button
            onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
            className={`p-3 rounded-full transition-all ${
              isListening
                ? 'bg-destructive text-destructive-foreground animate-pulse'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        ) : null}

        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="w-4 h-4 mr-1" />
          Send
        </Button>
      </div>
    </motion.div>
  );
}
