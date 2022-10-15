import styles from "../styles/App.module.css";
import CanvasMovimientoActivo from "../sketch/movimiento-activo";
import Link from "next/dist/client/link";
import { useContext } from "react";
import PublicContext from "../context/PublicProvider";
import Project from "../components/project";

const Projects = ({ projectsWidth, projectsHeight, allProjects, mainPage }) => {

    const { animationActive } = useContext(PublicContext);

    return(
        <>
            <div className={styles.projectsContainer}>
                { allProjects.length !== 0 && allProjects.map(project => <Project key={project._id} project={project} tipo={project.usage === "Real Project" ? true : false }/>) }
            </div>
            <Link href={!mainPage ? "/" : "/all-projects"}><a className={`${styles.btn1} ${styles.customChange1}`}><span className={styles.btnText}>{!mainPage ? "Back to home" : "All projects"}</span></a></Link>
            { animationActive && <CanvasMovimientoActivo width1={projectsWidth} height2={projectsHeight}/> }
        </>
    );
}

export default Projects;