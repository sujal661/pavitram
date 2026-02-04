'use client';

import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let locomotiveScroll: any;
    
    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        locomotiveScroll = new LocomotiveScroll({
          lenisOptions: {
            lerp: 0.05,
            duration: 1.5,
            smoothWheel: true,
          }
        });
      } catch (error) {
        console.error('Locomotive Scroll load error:', error);
      }
    };

    initScroll();

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return <>{children}</>;
}
