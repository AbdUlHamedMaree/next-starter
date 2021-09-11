import { useEffect } from 'react';

const defaultOptions: ScrollToOptions = {
  behavior: 'smooth',
  top: 0,
};

export const useScrollUp = <T>(trigger: T, options = defaultOptions) =>
  useEffect(() => {
    window.scroll(options);
  }, [options, trigger]);
