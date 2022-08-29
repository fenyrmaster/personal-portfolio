import styles from "../styles/App.module.css";
import CanvasMovimientoActivo from "../sketch/movimiento-activo";
import Link from "next/dist/client/link";
import { useState } from "react";
import Project from "../components/project";

const Projects = ({ projectsWidth, projectsHeight, allProjects }) => {

    const [ animation, setAnimation ] = useState(false)

    return(
        <>
            <div onClick={() => animation ? setAnimation(false) : setAnimation(true)} className={styles.projectsContainer}>
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
            { animation && <CanvasMovimientoActivo width1={projectsWidth} height2={projectsHeight}/> }
        </>
    );
}

export default Projects;