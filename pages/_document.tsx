import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Chat AI."
          />
          <meta property="og:site_name" content="chatai.com" />
          <meta
            property="og:description"
            content="Generate your next Twitter bio in seconds."
          />
          <meta property="og:title" content="Chat demo" />
          <meta name="chat:card" content="summary_large_image" />
          <meta name="chat:title" content="Chat AI" />
          <meta
            name="twitter:description"
            content="Chat AI"
          />
          {/* <meta
            property="og:image"
            content="https://twitterbio.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://twitterbio.com/og-image.png"
          /> */}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
