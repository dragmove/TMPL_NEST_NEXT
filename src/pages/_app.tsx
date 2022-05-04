// Ref: [The Open Graph protocol](https://ogp.me/)
// Ref: [Open Graph Meta tags](https://developers.facebook.com/docs/sharing/webmasters/)
// Ref: [Optimize Tweets with Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)

import GlobalStyle from '@client/styles/globalStyle';
import { SERVICE_NAME } from '@shared/constants/common';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, ReactElement } from 'react';
import '@client/styles/app.scss';

const App: FC<AppProps> = (props) => {
  const { Component, pageProps } = props;
  const Layout = EmptyLayout;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta property="og:site_name" content="" />
        <meta name="twitter:card" content="" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        <title>{SERVICE_NAME}</title>
      </Head>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;

const EmptyLayout = ({ children }): ReactElement => <>{children}</>;
