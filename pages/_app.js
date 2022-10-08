import '../styles/globals.css'
import { PublicProvider } from '../context/PublicProvider'
import { SkillsProvider } from "../context/SkillsProvider";
import { ProjectProvider } from "../context/ProjectProvider";

function MyApp({ Component, pageProps }) {
  return(
    <>
    <ProjectProvider>
      <SkillsProvider>
          <PublicProvider>
            <Component {...pageProps} />
          </PublicProvider>
        </SkillsProvider>
    </ProjectProvider>
    </>
  ) 
}

export default MyApp
