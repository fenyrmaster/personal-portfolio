import Layout from "../../components/adminLayout";
import styles from "../../styles/App.module.css";
import { useState, useContext, useEffect } from "react";
import AdminProject from "../../components/adminProjects";
import LexicalFormat from "../../components/LexicalFormat";
import SkillSelection from "../../components/skillSelection";
import axios from "axios";
import Swal from "sweetalert2";
import ProjectContext from "../../context/ProjectProvider";

export async function getStaticProps(){
    const data = await axios.get(`https://brandon-data.onrender.com/api/skills?fields=[" image "]`);
    const skillset = data.data.data;
    const project = await axios.get(`https://brandon-data.onrender.com/api/projects`);
    const projectsAll = project.data.data;
    return{
        props: {
            skillset,
            projectsAll
        },
        revalidate: 30
    }
}

const ProjectsAdmin = ({skillset, projectsAll}) => {

    const { projects, setProjects, crearProyecto, projectDelete, setProjectDelete, createProject, setCreateProject, borrarProyecto, editarProyecto } = useContext(ProjectContext);
    useEffect(() => {
        setProjects(projectsAll);
    }, []);

    const [ newProject, setNewProject ] = useState(false);
    const [ formLoading, setFormLoading ] = useState(false);
    const [ deleteAsk, setDeleteAsk ] = useState(false);
    const [ editProject, setEditProject ] = useState(false);
    const [ projectId, setProjectId ] = useState("");
    const [ editName, setEditName ] = useState("");

    const createNewProject = async e => {
        e.preventDefault();
        setFormLoading(true);
        if(editProject){
            if(createProject.nombre === "" || createProject.focus === "" || createProject.usage === "" || createProject.completionDate === "" || createProject.technologies.length === 0 || createProject.githubUrl === "" || createProject.liveUrl === ""){
                setFormLoading(false);
                return Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "All fields are required",
                    confirmButtonColor: "#ffcc00"
                });
            }
            await editarProyecto(createProject, setNewProject, setFormLoading, setEditProject, projectId);
        } else {
            if(createProject.nombre === "" || createProject.image === null || createProject.focus === "" || createProject.usage === "" || createProject.completionDate === "" || createProject.technologies.length === 0 || createProject.githubUrl === "" || createProject.liveUrl === ""){
                setFormLoading(false);
                return Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "All fields are required",
                    confirmButtonColor: "#ffcc00"
                });
            }
            await crearProyecto(createProject, setNewProject, setFormLoading);
        }
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
    const manageCancel = () => {
        setNewProject(false);
        setCreateProject({
            nombre: "",
            image: null,
            focus: "Full Stack",
            usage: "Learning Project",
            text: [  {
                type: "paragraph",
                children: [
                  { text: "Its time to write some text..." }
                ]
              }],
            completionDate: "",
            technologies: [],
            githubUrl: "",
            liveUrl: "",
            gallery: []
        });
        setEditProject(false);
    }

    useEffect(() => {
        if(deleteAsk){
            Swal.fire({
                title: 'Alert',
                text: `¿Are you sure do you want to delete ${projectDelete.nombre}?`,
                icon: "question",
                confirmButtonColor: '#ffcc00',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: "No",
                cancelButtonColor: "#ff0000"
              }).then((result) => {
                if(result.isDismissed){
                    setDeleteAsk(false);
                    setProjectDelete({});
                }
                if(result.isConfirmed){
                    setDeleteAsk(false);
                    borrarProyecto(projectDelete._id);
                }
              })
        }
    }, [deleteAsk]);

    const prepareEdit = project => {
        setNewProject(true);
        setEditProject(true);
        setProjectId(project._id);
        let techArray = [];
        project.technologies.forEach(tech => {
            techArray.push(tech._id);
        });
        let date = project.completionDate.split("T")[0];
        setCreateProject({
            nombre: project.nombre,
            image: null,
            focus: project.focus,
            usage: project.usage,
            text: project.text,
            completionDate: date,
            technologies: techArray,
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
            gallery: []
        });
        createProject.technologies.forEach(skill => agregarSkill(skill));
    }

    return(
        <Layout>
            { !newProject ? 
            <>  <div className={styles.skillAdd}>
                    <button onClick={() => setNewProject(true)} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Add new projects</span></button>
                </div>
                <section className={styles.adminProjectContainer}>
                    { projects.length !== 0 ? projects.map(project => <AdminProject setEditName={setEditName} prepareEdit={prepareEdit} setProjectDelete={setProjectDelete} deletion={setDeleteAsk} key={project._id} project={project}/>) : <p className={styles.textEmpty}>There are no projects, start by creating one...</p> }
                </section>
            </> 
            : <>
                <h2 className={styles.newSkillTitle}>{ editProject ? `Editing project ${editName}` : "Create a new project"}</h2>
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
                        <button onClick={() => manageCancel()} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Cancel action</span></button>
                        { !formLoading 
                        ?<button type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>{editProject ? "Modify project" : "Create New Project"}</span></button>                      
                        :<button disabled type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>{editProject ? "Editing Project..." : "Creating Project..."}</span></button> } </div>
                    </form></>}
        </Layout>
    );
}
export default ProjectsAdmin;