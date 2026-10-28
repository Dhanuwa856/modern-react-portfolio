import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * 3D Scroll-Linked Perspective Reveal Wrapper
 * Smoothly animates rotateX, scale, y, and opacity as the element enters the viewport.
 */
const ScrollReveal3D = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '0.28 1'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  const rotateX = useTransform(smoothProgress, [0, 1], [16, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.94, 1]);
  const y = useTransform(smoothProgress, [0, 1], [45, 0]);
  const opacity = useTransform(smoothProgress, [0, 1], [0.15, 1]);

  return (
    <div ref={ref} className={`perspective-1200 ${className}`}>
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          transformOrigin: 'center top',
        }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal3D;
