import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  // මවුස් එකේ පිහිටීම (Position) ලබා ගැනීමට
  const mouseX = useSpring(0, { damping: 30, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Hover effect එක සඳහා selectors
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    
    // සියලුම links සහ buttons වලට listener එකක් දාමු
    const targets = document.querySelectorAll('button, a, .hover-target');
    targets.forEach(target => {
      target.addEventListener('mouseenter', handleMouseEnter);
      target.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      targets.forEach(target => {
        target.removeEventListener('mouseenter', handleMouseEnter);
        target.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* ප්‍රධාන Glow Cursor එක */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[999] mix-blend-screen blur-md bg-accent-blue/40"
        style={{
          translateX: mouseX,
          translateY: mouseY,
          left: -16,
          top: -16,
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? "rgba(168, 85, 247, 0.4)" : "rgba(59, 130, 246, 0.4)"
        }}
      />
      {/* මැද තියෙන පොඩි තිත (Dot) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[999]"
        style={{
          translateX: mouseX,
          translateY: mouseY,
          left: -3,
          top: -3,
        }}
      />
    </>
  );
};

export default CustomCursor;