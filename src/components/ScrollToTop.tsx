import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Store scroll positions using location key
const scrollPositions = new Map<string, number>();
let isNavigating = false;

export default function ScrollToTop() {
  const location = useLocation();
  const { pathname, hash, key } = location;
  const lastKey = useRef<string>(key);

  // Save scroll position before navigation
  useLayoutEffect(() => {
    // Save current position before the location changes
    const currentScrollY = window.scrollY;
    
    if (lastKey.current !== key) {
      // We're navigating - save the old position
      scrollPositions.set(lastKey.current, currentScrollY);
      isNavigating = true;
    }
  }, [key]);

  // Handle scroll restoration after navigation
  useEffect(() => {
    if (!isNavigating) {
      return;
    }

    // Handle hash navigation (don't interfere with react-scroll)
    if (hash) {
      isNavigating = false;
      lastKey.current = key;
      return;
    }

    // Check if we have a saved position for this location key
    const savedPosition = scrollPositions.get(key);
    
    if (savedPosition !== undefined) {
      // Back/forward navigation - restore saved position
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        window.scrollTo(0, savedPosition);
        isNavigating = false;
      }, 50);
    } else {
      // New navigation - scroll to top
      window.scrollTo(0, 0);
      isNavigating = false;
    }

    lastKey.current = key;
  }, [pathname, hash, key]);

  return null;
}
