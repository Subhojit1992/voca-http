// @ts-nocheck 
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import ReactGA from 'react-ga';

const TRACKING_ID = 'G-8B0K62HERK';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Google Analytics
    ReactGA.initialize(TRACKING_ID);

    // Track page views
    const handleRouteChange = (url: string) => {
      ReactGA.pageview(url);
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up event listener on unmount
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" type="image/png" href="/images/voca-logo.png" />
        
        <title>voca-http - Modern HTTP client for web applications</title>
        <meta name="title" content="voca-http - Modern HTTP client for web applications" />
        <meta name="description" content="A lightweight, flexible HTTP client for modern web applications." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vocahttp.netlify.app/" />
        <meta property="og:title" content="voca-http - Modern HTTP client for web applications" />
        <meta property="og:description" content="A lightweight, flexible HTTP client for modern web applications." />
        <meta property="og:image" content="/images/voca-http-thumb.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://vocahttp.netlify.app/" />
        <meta property="twitter:title" content="voca-http - Modern HTTP client for web applications" />
        <meta property="twitter:description" content="A lightweight, flexible HTTP client for modern web applications." />
        <meta property="twitter:image" content="/image/voca-http-thumb.png" />

        <script async src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${TRACKING_ID}');
            `,
          }}
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
