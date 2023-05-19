import '../styles/global.css'
import Layout from '../components/layout'
import Script from 'next/script'
import * as snippet from '@segment/snippet'


function MyApp({ Component, pageProps }) {

function renderSnippet() {
  const opts = {
    apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY
  }

  if (process.env.NODE_ENV === 'development') {
    return snippet.max(opts)
  }

  return snippet.min(opts)
}
  return (
    <Layout>
      <Script
        id="segment-script"
        dangerouslySetInnerHTML={{ __html: renderSnippet() }}
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;