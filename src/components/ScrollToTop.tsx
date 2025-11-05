import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Don't scroll if there's a hash (anchor link)
    if (hash) {
      return;
    }

    // Scroll to top instantly for new pages (no animation)
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
