import styles from "../styles/App.module.css";
import Image from "next/image";
import Link from "next/link";

const Project = ({ tipo, project }) => {
    return(
        <div className={styles.project}>
            <div className={`${styles.techImgContainer} ${tipo ? styles.bckgOrange : styles.bckgYellow}`}>
                <img alt={project.nombre} className={styles.techImg} src={project.image}/>
            </div>
            <div className={styles.linkWrapper}>
                <Link href={project ? `/project/${project.slug}` : ""}><a className={styles.btn1}><span className={styles.btnText}>More project details</span></a></Link>
            </div>
            <h4 className={styles.tecnologies}>Tecnologies used:</h4>
            <div className={styles.tech}>
                { project.technologies.map(tech => <Image key={tech._id} className={styles.techImg1} alt={tech.nombre} src={tech.image} width={50} height={50}/>) }
                
            </div>
        </div>
    );
}

export default Project;