import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Voleeyo: the LinkedIn for volunteers" key="title"/>
        <meta property="og:description" content="built at buildspace during nights and weekeds" key="description"/>
        <meta
          property="og:image"
          content="https://voleeyo-1.azurewebsites.net//_next/static/preview.jpg"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
