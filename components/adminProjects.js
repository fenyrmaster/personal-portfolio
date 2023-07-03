import styles from "../styles/App.module.css";
import Image from "next/image";
import Link from "next/link";

const AdminProject = ({ project, deletion, setProjectDelete, prepareEdit, setEditName }) => {
    return(
            <div>
                <h2 className={styles.adminProject_title}>{project.nombre}</h2>
                <div className={styles.adminProject_Main}>
                    <Image alt={project.nombre} className={styles.adminProject_Img} src={project.image} width={260} height={150}/>
                    <div className={styles.adminProject_Technologies}>
                        { project.technologies.map(tech => <Image className={`${styles.swiperImage} ${styles.adminProject_techImg}`} alt={tech.nombre} key={tech._id} src={tech.image} width={35} height={35}/>) }
                    </div>
                </div>
                <div className={styles.adminProject_Buttons}>
                    <button onClick={() => {prepareEdit(project); setEditName(project.nombre)}} className={styles.skillEdit}>Edit</button>
                    <Link href={`/project/${project.slug}`}><a className={styles.projectView} target="_blank">View</a></Link>
                    <button onClick={() => {deletion(true); setProjectDelete(project)}} className={styles.skillDelete}>Delete</button>
                </div>
            </div>
    );
}

export default AdminProject;