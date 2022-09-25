import '../styles/globals.css'
import { PublicProvider } from '../context/PublicProvider'
import { SkillsProvider } from "../context/SkillsProvider";

function MyApp({ Component, pageProps }) {
  return(
    <>
      <SkillsProvider>
        <PublicProvider>
          <Component {...pageProps} />
        </PublicProvider>
      </SkillsProvider>
    </>
  ) 
}

export default MyApp
