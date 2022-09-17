import '../styles/globals.css'
import { PublicProvider } from '../context/PublicProvider'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <PublicProvider>
        <Component {...pageProps} />
      </PublicProvider>
    </>
  ) 
}

export default MyApp
