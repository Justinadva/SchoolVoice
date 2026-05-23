'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  as?: 'div' | 'article' | 'section';
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hover = false, glow = false, padding = 'md', as: Tag = 'div', onClick, onMouseEnter, onMouseLeave, style, id, ...props }, ref) => {
    const classes = cn(
      'rounded-xl border border-[#1a3a2e] bg-[#0d1a16]/80 backdrop-blur-xl',
      hover && 'transition-all duration-300 hover:border-[#2a5a46] hover:bg-[#112218]/80 hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] cursor-pointer',
      glow && 'shadow-[0_0_20px_rgba(52,211,153,0.08)]',
      paddingMap[padding],
      className
    );

    if (hover) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={classes}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={style}
          id={id}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <Tag ref={ref} className={classes} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} id={id} {...props}>
        {children}
      </Tag>
    );
  }
);

GlassCard.displayName = 'GlassCard';
export default GlassCard;
