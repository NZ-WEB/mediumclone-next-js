import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {Router} from "next/router";
import React from 'react';
import Head from 'next/head';

function MyApp({Component, pageProps, router}: AppProps): JSX.Element {
  Router.events.on('routeChangeComplete', (url: string):void => {});

  return (
      <>
        <Head>
          <title>Mediumclone - nextjs</title>
          <link key={1} rel="icon" href="/favicon.ico"/>
          <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css"/>
          <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
                  rel="stylesheet" type="text/css"/>
          <link rel="stylesheet" href="//demo.productionready.io/main.css"/>
          <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
          <meta property="og:locale" content="ru_RU"/>
        </Head>
        <Component {...pageProps} />
      </>);
}

export default MyApp;
