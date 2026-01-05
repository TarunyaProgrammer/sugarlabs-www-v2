import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MotionCarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  infiniteLoop?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
  className?: string;
  selectedIndex?: number;
  onIndexChange?: (index: number) => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const MotionCarousel: React.FC<MotionCarouselProps> = ({
  children,
  autoPlay = false,
  interval = 3000,
  infiniteLoop = false,
  showArrows = true,
  showIndicators = true,
  className = '',
  selectedIndex,
  onIndexChange,
}) => {
  const isControlled = selectedIndex !== undefined;
  const [internalPage, setInternalPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // Track previous index to determine direction in controlled mode
  const prevIndexRef = useRef(selectedIndex || 0);

  const activeIndex = isControlled ? selectedIndex! : internalPage;

  useEffect(() => {
    if (isControlled) {
      const prev = prevIndexRef.current;
      const current = selectedIndex!;
      if (prev !== current) {
        let dir = current > prev ? 1 : -1;
        // Handle loop edge cases
        if (infiniteLoop) {
          if (current === 0 && prev === children.length - 1) dir = 1;
          else if (current === children.length - 1 && prev === 0) dir = -1;
        }
        setDirection(dir);
        prevIndexRef.current = current;
      }
    }
  }, [selectedIndex, isControlled, infiniteLoop, children.length]);

  const paginate = useCallback(
    (newDirection: number) => {
      const nextIndex =
        activeIndex + newDirection < 0
          ? children.length - 1
          : activeIndex + newDirection >= children.length
            ? 0
            : activeIndex + newDirection;

      if (
        !infiniteLoop &&
        (activeIndex + newDirection < 0 ||
          activeIndex + newDirection >= children.length)
      ) {
        return;
      }

      setDirection(newDirection);

      if (isControlled) {
        onIndexChange?.(nextIndex);
      } else {
        setInternalPage(nextIndex);
      }
    },
    [activeIndex, children.length, infiniteLoop, isControlled, onIndexChange],
  );

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        paginate(1);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, paginate]);

  return (
    <div
      className={`relative overflow-hidden w-full h-full flex flex-col justify-center items-center ${className}`}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }: PanInfo) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {children[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showArrows && (
        <>
          <button
            className="absolute left-2 z-10 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors cursor-pointer"
            onClick={() => paginate(-1)}
            disabled={!infiniteLoop && activeIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-2 z-10 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors cursor-pointer"
            onClick={() => paginate(1)}
            disabled={!infiniteLoop && activeIndex === children.length - 1}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-4 z-10 flex space-x-2">
          {children.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const dir = idx > activeIndex ? 1 : -1;
                setDirection(dir);
                if (isControlled) {
                  onIndexChange?.(idx);
                } else {
                  setInternalPage(idx);
                }
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === activeIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MotionCarousel;
