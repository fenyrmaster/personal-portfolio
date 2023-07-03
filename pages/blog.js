import BlogIndex from "../components/blogIndex";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/App.module.css";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import axios from "axios";
import AnimationController from "../components/animationController";
import CanvasMovimientoActivo from "../sketch/movimiento-activo";
import { useContext } from "react";
import PublicContext from "../context/PublicProvider";

export async function getStaticProps(){
    // Fetch the projects
    const project = await axios.get(`http://localhost:4000/api/blog?sort=-postDate`);
    const blogEntries = project.data.data;
    return{
        props: {
            blogEntries
        }
    }
  }

export default function ProjectsAll({blogEntries}){

    const [projectsHeight, setProjectHeight] = useState(0);
    const [projectsWidth, setProjectWidth] = useState(0);
    const projectRef = useRef(null);

    const { animationActive } = useContext(PublicContext);

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        updateSize();
    }, []);

    
    const updateSize = () => {
        if(projectRef.current?.clientHeight && projectRef.current?.clientWidth){
          setProjectHeight(projectRef.current?.clientHeight);
          setProjectWidth(projectRef.current?.clientWidth);
        }
    }

    return(
        <>
            <Navigation/>
            <AnimationController/>
            <section className={styles.allProjects} ref={projectRef}>
                <div className={`${styles.subtitleWrapper} ${styles.subtitleCustom2}`}>
                  <h2 className={styles.subtitle}>All my blog entries</h2>  
                </div>
                <BlogIndex entries={blogEntries}></BlogIndex>
                {animationActive && <CanvasMovimientoActivo width1={projectsWidth} height2={projectsHeight}/>}
                <Link href={"/"}><a className={`${styles.btn1} ${styles.customChange3}`}><span className={styles.btnText}>{"Back To Home"}</span></a></Link>
            </section>
            <Footer/>
        </>
    )
}