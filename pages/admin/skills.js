import Layout from "../../components/adminLayout";
import styles from "../../styles/App.module.css";
import Link from "next/dist/client/link";
import SkillAdmin from "../../components/skillAdmin";
import Swal from "sweetalert2";
import SkillsContext from "../../context/SkillsProvider";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

export async function getStaticProps(){
    const data = await axios.get(`http://localhost:4000/api/skills`);
    const skillset = data.data.data;
    return{
        props: {
            skillset
        }
    }
}

export default function Skills({skillset}){

    // save the data from the DB
    const { skills, skill, skillDelete, setSkills, setSkillDelete, setSkill, crearSkill, borrarSkill, editarSkill } = useContext(SkillsContext);
    useEffect(() => {
        setSkills(skillset);
    }, []);

    //Controllers for all the project
    const [ newSkill, setNewSkill ] = useState(false);
    const [ deleteSkill, setDeleteSkill ] = useState(false);
    const [ skillLevel, setSkillLevel ] = useState(false);
    const [ formLoading, setFormLoading ] = useState(false);
    const [ editName, setEditName ] = useState("");

    const activateEditing = skillData => {
        setSkill(skillData);
        setSkillLevel(true); 
        setNewSkill(true);
        setEditName(skillData.nombre);
    }

    const createNewSkill = e => {
        e.preventDefault();
        setFormLoading(true);

        //remove any white spaces to avoid errors
        let bridge = skill;
        bridge.nombre = bridge.nombre.trim();
        setSkill(bridge);

        if(skill.nombre === "" || skill.role === "" || skill.level === "" || skill.image === null || skill.image === undefined){
            setFormLoading(false);
            return Swal.fire({
                title: "Error",
                icon: "error",
                text: "All fields are required",
                confirmButtonColor: "#ffcc00"
            });
        }
        
        // if its not id, its create
        if(!skill._id){
            crearSkill(skill, setNewSkill, setFormLoading);
        }
        // If there is an id, its edit
        else{
            editarSkill(skill, setNewSkill, setFormLoading, setSkillLevel);
        }
    } 
    useEffect(() => {
        if(deleteSkill){
            Swal.fire({
                title: 'Alert',
                text: `¿Are you sure do you want to delete ${skillDelete.nombre}?`,
                icon: "question",
                confirmButtonColor: '#ffcc00',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: "No",
                cancelButtonColor: "#ff0000"
              }).then((result) => {
                if(result.isDismissed){
                    setDeleteSkill(false);
                    setSkillDelete({});
                }
                if(result.isConfirmed){
                    setDeleteSkill(false);
                    borrarSkill(skillDelete._id);
                }
              })
        }
    }, [deleteSkill]);

    return(
        <Layout>
            { !newSkill
            ?   <><div className={styles.skillAdd}>
                    <button onClick={() => {setNewSkill(true); setSkill({nombre: "", role: "Front-end", level: "Beginner", image: null})}} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Add new skills</span></button>
                </div>
                <section className={styles.skillsAdmin}>
                    { skills.length !== 0 ? skills.map(data => <SkillAdmin key={data._id} skillData={data} deleteFn={setDeleteSkill} activateEditing={activateEditing}/>) : <p className={styles.textEmpty}>There are no skills, start by creating one...</p> }
                </section></>
            :   <>
                <h2 className={styles.newSkillTitle}>{skillLevel ? `Editing the skill ${editName !== "" && editName}` : "Create a new skill"}</h2>
                <form onSubmit={e => createNewSkill(e)} className={styles.newSkillForm}>
                    <div className={styles.newSkillForm_field}>
                        <label htmlFor="nombre" className={styles.newSkillForm_label}>Skill Name:</label>
                        <input value={skill.nombre} name="nombre" onChange={e => setSkill({ ...skill, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label htmlFor="level" className={styles.newSkillForm_label}>Skill ability:</label>
                        <select value={skill.level} name="level" onChange={e => setSkill({ ...skill, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label htmlFor="role" className={styles.newSkillForm_label}>Skill role:</label>
                        <select value={skill.role} name="role" onChange={e => setSkill({ ...skill, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}>
                            <option>Front-end</option>
                            <option>Back-end</option>
                        </select>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Skill Image:</label>
                        <input onChange={e => setSkill({ ...skill, image: e.target.files[0] })} className={styles.newSkillForm_file} type="file"/>
                    </div>
                <div className={styles.newSkillBtns}>
                    <button onClick={() => {setNewSkill(false); setSkillLevel(false);}} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Cancel action</span></button>
                    { !formLoading 
                    ?<button type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>{skillLevel ? `Edit Skill ${editName !== 0 && editName}` : "Create New Skill"}</span></button>                      
                    :<button disabled type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>{skillLevel ? "Editing..." : "Creating..."}</span></button> }
                </div>
                </form></> }
        </Layout>
    );
}