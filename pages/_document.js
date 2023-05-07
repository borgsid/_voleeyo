import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Voleeyo: linkein for volunteers" key="title"/>
        <meta property="og:description" content="built at buildspace during nights and weekeds" key="description"/>
        <meta
          property="og:image"
          content="https://drive.google.com/file/d/1VQbZAVF_o5WGDYfbvHclrRbj2s8Hk3BD/view?usp=sharing"
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
