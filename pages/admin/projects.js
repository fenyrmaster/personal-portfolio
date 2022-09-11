import Layout from "../../components/adminLayout";
import styles from "../../styles/App.module.css";
import { useState } from "react";
import AdminProject from "../../components/adminProjects";

const ProjectsAdmin = () => {

    const [ newProject, setNewProject ] = useState(false);

    return(
        <Layout>
            { !newProject ? 
            <>  <div className={styles.skillAdd}>
                    <button onClick={() => setNewProject(true)} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Add new projects</span></button>
                </div>
                <section className={styles.adminProjectContainer}>
                    <AdminProject/>
                    <AdminProject/>
                    <AdminProject/>
                    <AdminProject/>
                </section>
            </> 
            : <>
            
            </>}
        </Layout>
    );
}
export default ProjectsAdmin;