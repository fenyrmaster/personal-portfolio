import styles from "../styles/App.module.css";
import CanvasMovimientoActivo from "../sketch/movimiento-activo";
import Link from "next/dist/client/link";
import { useContext } from "react";
import PublicContext from "../context/PublicProvider";
import Project from "../components/project";

const Projects = ({ projectsWidth, projectsHeight, allProjects }) => {

    const { animationActive } = useContext(PublicContext);

    return(
        <>
            <div className={styles.projectsContainer}>
                <Project tipo={true}/>
                <Project tipo={true}/>
                <Project tipo={false}/>
                <Project tipo={true}/>
                <Project tipo={false}/>
                <Project tipo={false}/>
                <Project tipo={true}/>
                <Project tipo={false}/>
                <Project tipo={true}/>
            </div>
            <Link href={allProjects ? "/" : "/all-projects"}><a className={`${styles.btn1} ${styles.customChange1}`}><span className={styles.btnText}>{allProjects ? "Back to home" : "All projects"}</span></a></Link>
            { animationActive && <CanvasMovimientoActivo width1={projectsWidth} height2={projectsHeight}/> }
        </>
    );
}

export default Projects;