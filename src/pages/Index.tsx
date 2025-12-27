import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageSquare, BarChart3, ArrowRight, Mic, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'AI Participants',
      description: 'Practice with intelligent AI candidates who provide realistic discussion points',
    },
    {
      icon: MessageSquare,
      title: 'Real-time Transcript',
      description: 'Track the discussion flow with live transcription of all participants',
    },
    {
      icon: BarChart3,
      title: 'AI Analysis',
      description: 'Get detailed performance feedback powered by advanced AI',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary flex items-center justify-center shadow-elevated"
        >
          <Users className="w-10 h-10 text-primary-foreground" />
        </motion.div>

        {/* Title */}
        <h1 className="font-display text-5xl font-bold text-foreground mb-4">
          AI Group Discussion
        </h1>
        <p className="text-lg text-muted mb-8">
          Practice your group discussion skills with AI-powered participants and receive instant feedback on your performance.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-card p-5 rounded-2xl shadow-card"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-soft/50 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Button
            onClick={() => navigate('/room')}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg gap-2 shadow-elevated"
          >
            <Video className="w-5 h-5" />
            Join Discussion Room
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-sm text-muted flex items-center justify-center gap-2">
            <Mic className="w-4 h-4" />
            Enable microphone for voice input
          </p>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-sm text-muted"
      >
        Practice makes perfect. Join a 20-minute AI-powered discussion session.
      </motion.footer>
    </div>
  );
}
