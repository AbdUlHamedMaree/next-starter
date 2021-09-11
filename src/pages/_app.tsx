import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.min.css';

import AdapterMoment from '@material-ui/lab/AdapterMoment';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import { LocalizationProvider } from '@material-ui/lab';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer, Slide } from 'react-toastify';
import { AnimateSharedLayout } from 'framer-motion';
import React, { useState } from 'react';
import Head from 'next/head';

import {
  MainLayout,
  MuiThemeProvider,
  GlobalStyles,
  RTL,
  SplashScreen,
} from '@/components';
import { useApp } from '@/zustand';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from '@/helpers';
import {} from '@material-ui/core/';

import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false });

const cache = createEmotionCache();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [initialized, setInitialized] = useState(false);
  const [direction] = useApp(state => [state.direction]);

  React.useEffect(() => {
    setInitialized(true);
  }, []);

  return (
    <CacheProvider value={cache}>
      <RTL direction={direction}>
        <Head>
          <title>Portfolio</title>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <MuiThemeProvider>
          <GlobalStyles />
          <CssBaseline />
          {initialized ? (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <AnimateSharedLayout type='crossfade'>
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </AnimateSharedLayout>
            </LocalizationProvider>
          ) : (
            <SplashScreen />
          )}
        </MuiThemeProvider>
      </RTL>
      <ToastContainer
        position={direction === 'ltr' ? 'top-right' : 'top-left'}
        autoClose={3500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={direction === 'rtl'}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        transition={Slide}
      />
    </CacheProvider>
  );
};
export default MyApp;

const get = (metric: NextWebVitalsMetric) => ({
  value: (metric.value / 1000)?.toFixed(4),
  startTime: (metric.startTime / 1000)?.toFixed(4),
});

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  let content: {
    name: string;
    value: string;
    startTime: string;
  } | null = null;
  switch (metric.name) {
    case 'FCP':
      content = {
        name: 'First Contentful Paint',
        ...get(metric),
      };
      break;

    case 'LCP':
      content = {
        name: 'Largest Contentful Paint',
        ...get(metric),
      };
      break;

    case 'CLS':
      content = {
        name: 'Cumulative Layout Shift',
        ...get(metric),
      };
      break;

    case 'FID':
      content = {
        name: 'First Input Delay',
        ...get(metric),
      };
      break;

    case 'TTFB':
      content = {
        name: 'Time to First Byte',
        ...get(metric),
      };
      break;

    case 'Next.js-hydration':
      content = {
        name: 'Length of time it takes for the page to start and finish hydrating',
        ...get(metric),
      };
      break;

    case 'Next.js-route-change-to-render':
      content = {
        name: 'Length of time it takes for a page to start rendering after a route change',
        ...get(metric),
      };
      break;

    case 'Next.js-render':
      content = {
        name: 'Length of time it takes for a page to finish render after a route change',
        ...get(metric),
      };
      break;

    default:
      break;
  }

  false &&
    !!content &&
    process.env.NODE_ENV !== 'production' &&
    console.table(content);
};
