import Layout from "../../components/adminLayout";
import styles from "../../styles/App.module.css";
import { useState, useEffect } from "react";
import AdminProject from "../../components/adminProjects";
import LexicalFormat from "../../components/LexicalFormat";
import SkillSelection from "../../components/skillSelection";

const ProjectsAdmin = () => {

    const [ newProject, setNewProject ] = useState(false);

    const createNewProject = e => {
        e.preventDefault();
        console.log("creando...");
    }

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
                <h2 className={styles.newSkillTitle}>Create a new project</h2>
                <form onSubmit={e => createNewProject(e)} className={styles.newSkillForm}>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project Name:</label>
                        <input className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project focus:</label>
                        <select className={styles.newSkillForm_input}>
                            <option>Full Stack</option>
                            <option>Back end</option>
                            <option>Front end</option>
                        </select>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project usage:</label>
                        <select className={styles.newSkillForm_input}>
                            <option>Learning Project</option>
                            <option>Real Project</option>
                        </select>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project thumbnail:</label>
                        <input className={styles.newSkillForm_file} type="file"/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project Completion:</label>
                        <input type={"date"} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project technologies:</label>
                        <div className={`${styles.newSkillForm_field} ${styles.customField}`}>
                            <SkillSelection/>
                            <SkillSelection/>
                            <SkillSelection/>
                            <SkillSelection/>
                            <SkillSelection/>
                            <SkillSelection/>
                            <SkillSelection/>
                            <SkillSelection/>
                        </div>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project explanation:</label>
                        <LexicalFormat/>
                    </div> 
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project Repository:</label>
                        <input className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project Url:</label>
                        <input className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillBtns}>
                        <button onClick={() => setNewProject(false)} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Cancel creation</span></button>
                        <button type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Create New Project</span></button>
                    </div>
                    </form></>}
        </Layout>
    );
}
export default ProjectsAdmin;