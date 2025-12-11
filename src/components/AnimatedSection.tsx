'use client';

import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode, memo } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

// Memoized animated section for better performance
const AnimatedSection = memo(function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const directionVariants = {
    up: { y: 30, opacity: 0 },
    down: { y: -30, opacity: 0 },
    left: { x: 30, opacity: 0 },
    right: { x: -30, opacity: 0 },
    none: { opacity: 0 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={directionVariants[direction]}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.4,
          delay,
          ease: 'easeOut',
        }}
        className={className}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
});

export default AnimatedSection;

// Staggered container for multiple animated items
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = memo(function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.05,
}: StaggerContainerProps) {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
});

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = memo(function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: 'easeOut',
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

// Simple fade in component - very lightweight
interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeIn = memo(function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
        className={className}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
});

// Counter animation - simplified
interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export const Counter = memo(function Counter({ value, suffix = '', className = '' }: CounterProps) {
  return (
    <span className={className}>
      {value.toLocaleString()}{suffix}
    </span>
  );
});
