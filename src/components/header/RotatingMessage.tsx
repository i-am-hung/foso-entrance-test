import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingMessageProps {
  messages: string[];
  interval?: number;
  className?: string;
}

export default function RotatingMessage({
  messages,
  interval = 5000,
  className = "",
}: RotatingMessageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [messages, interval]);

  return (
    <div className={`relative h-6 overflow-hidden ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center"
        >
          <div dangerouslySetInnerHTML={{ __html: messages[currentIndex] }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
