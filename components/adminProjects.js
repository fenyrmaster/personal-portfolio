import styles from "../styles/App.module.css";
import Image from "next/image";

const AdminProject = ({ project, deletion, setProjectDelete }) => {
    return(
            <div>
                <h2 className={styles.adminProject_title}>{project.nombre}</h2>
                <div className={styles.adminProject_Main}>
                    <Image className={styles.adminProject_Img} src={project.image} width={260} height={150}/>
                    <div className={styles.adminProject_Technologies}>
                        { project.technologies.map(tech => <Image className={`${styles.swiperImage} ${styles.adminProject_techImg}`} key={tech._id} src={tech.image} width={35} height={35}/>) }
                    </div>
                </div>
                <div className={styles.adminProject_Buttons}>
                <button className={styles.skillEdit}>Edit</button>
                <button className={styles.projectView}>View</button>
                <button onClick={() => {deletion(true); setProjectDelete(project)}} className={styles.skillDelete}>Delete</button>
                </div>
            </div>
    );
}

export default AdminProject;