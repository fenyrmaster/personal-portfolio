import '../styles/globals.css'
import { PublicProvider } from '../context/PublicProvider'
import { SkillsProvider } from "../context/SkillsProvider";
import { ProjectProvider } from "../context/ProjectProvider";
import { BlogProvider } from "../context/BlogProvider";

function MyApp({ Component, pageProps }) {
  return(
    <>
    <BlogProvider>
      <ProjectProvider>
        <SkillsProvider>
            <PublicProvider>
              <Component {...pageProps} />
            </PublicProvider>
          </SkillsProvider>
      </ProjectProvider>
    </BlogProvider>
    </>
  ) 
}

export default MyApp
