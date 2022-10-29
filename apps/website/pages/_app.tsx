import { CssBaseline, ThemeProvider } from '@mui/material';
import createEmotionCache from '../utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { theme } from '@isomera/ui-components';
import Head from 'next/head';
import * as React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <>
      <Head>
        <title>Isomera</title>
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
