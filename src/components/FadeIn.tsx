'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: 'bottom' | 'left' | 'none';
}

export default function FadeIn({ children, delay = 0, className = '', from = 'bottom' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initial = from === 'bottom' ? 'opacity-0 translate-y-6'
               : from === 'left'   ? 'opacity-0 -translate-x-6'
               : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 translate-x-0' : initial} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
