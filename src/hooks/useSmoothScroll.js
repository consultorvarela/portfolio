import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(Math.abs(distance) * 0.5, 1500);
      let start = null;

      const easeOutQuart = (t) => {
        return 1 - Math.pow(1 - t, 4);
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeOutQuart(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  }, []);

  return scrollToSection;
};
