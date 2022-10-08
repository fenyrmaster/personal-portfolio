import Layout from "../../components/adminLayout";
import styles from "../../styles/App.module.css";
import { useState, useEffect } from "react";
import AdminProject from "../../components/adminProjects";
import LexicalFormat from "../../components/LexicalFormat";
import SkillSelection from "../../components/skillSelection";
import axios from "axios";

export async function getStaticProps(){
    const data = await axios.get(`http://localhost:4000/api/skills?fields=[" image "]`);
    const skillset = data.data.data;
    return{
        props: {
            skillset
        }
    }
}

const ProjectsAdmin = ({skillset}) => {

    const [ newProject, setNewProject ] = useState(false);
    const [ createProject, setCreateProject ] = useState({
        nombre: "",
        image: null,
        focus: "Full Stack",
        usage: "Learning Project",
        text: [],
        completionDate: "",
        technologies: [],
        githubUrl: "",
        liveUrl: "",
        gallery: []
    });

    const createNewProject = e => {
        e.preventDefault();
        console.log("creando...");
    }

    const agregarSkill = skill => {
        let added = createProject.technologies;
        let index = added.findIndex(item => item === skill._id);
        if(index === -1){
            added.push(skill._id);
        } else{
            added.splice(index, 1);
        }
        setCreateProject({ ...createProject, ["technologies"]: added });
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
                        <input name="nombre" value={createProject.nombre} onChange={e => setCreateProject({ ...createProject, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project focus:</label>
                        <select name="focus" value={createProject.focus} onChange={e => setCreateProject({ ...createProject, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}>
                            <option>Full Stack</option>
                            <option>Back end</option>
                            <option>Front end</option>
                        </select>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project usage:</label>
                        <select name="usage" value={createProject.usage} onChange={e => setCreateProject({ ...createProject, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}>
                            <option>Learning Project</option>
                            <option>Real Project</option>
                        </select>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project thumbnail:</label>
                        <input onChange={e => setCreateProject({ ...createProject, image: e.target.files[0] })} className={styles.newSkillForm_file} type="file"/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project Gallery:</label>
                        <input onChange={e => setCreateProject({ ...createProject, gallery: e.target.files })} className={styles.newSkillForm_file} type="file" multiple/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project Completion:</label>
                        <input type={"date"}  name="completionDate" value={createProject.completionDate} onChange={e => setCreateProject({ ...createProject, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project technologies:</label>
                        <div className={`${styles.newSkillForm_field} ${styles.customField}`}>
                            { skillset.length !== 0 && skillset.map(skill => <SkillSelection key={skill._id} skill={skill} createProject={createProject} setCreateProject={setCreateProject} agregarSkill={agregarSkill}/>) }
                        </div>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project Repository:</label>
                        <input name="githubUrl" value={createProject.githubUrl} onChange={e => setCreateProject({ ...createProject, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project Url:</label>
                        <input name="liveUrl" value={createProject.liveUrl} onChange={e => setCreateProject({ ...createProject, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Project explanation:</label>
                        <LexicalFormat createProject={createProject} setCreateProject={setCreateProject}/>
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