import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Editorial 3D Perspective Card with Warm Ambient Spotlight
 * Automatically disables heavy tilt on touch devices for 100% smooth mobile scrolling.
 */
const TiltCard = ({
  children,
  className = '',
  glowColor = 'rgba(249, 115, 22, 0.12)',
  intensity = 6,
  scaleOnHover = 1.01,
  onClick,
  style = {},
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 24, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(smoothX, [0, 1], [-intensity, intensity]);

  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      whileHover={{ scale: scaleOnHover }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        ...style,
      }}
      className={`relative group border border-zinc-800/90 hover:border-zinc-700 transition-colors duration-300 ${className}`}
    >
      {/* Subtle Warm Studio Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x} ${y}, ${glowColor}, transparent 75%)`
          ),
        }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
};

export default TiltCard;
