import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import stylisRTLPlugin from 'stylis-plugin-rtl';

interface RTLProps {
  children: ReactNode;
  direction: 'ltr' | 'rtl';
}

const styleCache = createCache({
  key: 'css',
  prepend: true,
  // @ts-ignore
  stylisPlugins: [stylisRTLPlugin],
});

export const RTL: FC<RTLProps> = props => {
  const { children, direction } = props;

  useEffect(() => {
    document.dir = direction;
    document.body.setAttribute('dir', direction);
  }, [direction]);

  if (direction === 'rtl') {
    return <CacheProvider value={styleCache}>{children}</CacheProvider>;
  }

  return <>{children}</>;
};
