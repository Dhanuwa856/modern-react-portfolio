import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, { damping: 28, stiffness: 240 });
  const mouseY = useSpring(0, { damping: 28, stiffness: 240 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const interactable = e.target?.closest('button, a, input, textarea, select');
      setIsHovered(Boolean(interactable));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[999] border border-zinc-400/40 mix-blend-difference"
        style={{
          translateX: mouseX,
          translateY: mouseY,
          left: -14,
          top: -14,
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
    </div>
  );
};

export default CustomCursor;