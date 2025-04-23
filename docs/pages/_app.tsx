import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>voca-http - Modern HTTP client for web applications</title>
        <meta name="description" content="A lightweight, flexible HTTP client for modern web applications" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 