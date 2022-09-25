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
    const { skills, skill, skillDelete, setSkills, setSkillDelete, setSkill, crearSkill } = useContext(SkillsContext);
    setSkills(skillset);

    const [ newSkill, setNewSkill ] = useState(false);
    const [ deleteSkill, setDeleteSkill ] = useState(false);
    const [ skillLevel, setSkillLevel ] = useState(false);
    const [ formLoading, setFormLoading ] = useState(false);

    const createNewSkill = e => {
        e.preventDefault();
        setFormLoading(true);
        
        // if its not id, its create
        if(!skill._id){
            if(skill.nombre === "" || skill.role === "" || skill.level === "" || skill.image === null || skill.image === undefined){
                return Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "All fields are required",
                    confirmButtonColor: "#ffcc00"
                })
            }
            crearSkill(skill, setNewSkill, setFormLoading);
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
                    console.log(result.value);
                }
              })
        }
    }, [deleteSkill]);

    useEffect(() => {
        if(skillLevel){
            Swal.fire({
                title: `Enter the new skill level of ${skill.nombre}`,
                input: "select",
                inputOptions: {
                    "Beginer": "Beginner",
                    "Intermediate": "Intermediate",
                    "Advanced": "Advanced"
                },
                confirmButtonText: "Edit",
                confirmButtonColor: '#ffcc00',
                showCancelButton: true,
                cancelButtonText: "Cancel",
                cancelButtonColor: "#ff0000"
            }).then(result => {
                if(result.isDismissed){
                    setSkillLevel(false);
                    setSkill({});
                }
                if(result.isConfirmed){
                    setSkillLevel(false);
                    console.log(result.value);
                }
            });
        }
    }, [skillLevel]);

    return(
        <Layout>
            { !newSkill
            ?   <><div className={styles.skillAdd}>
                    <button onClick={() => {setNewSkill(true); setSkill({nombre: "", role: "Front-end", level: "Beginner", image: null})}} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Add new skills</span></button>
                </div>
                <section className={styles.skillsAdmin}>
                    { skills && skills.map(data => <SkillAdmin key={data._id} skillData={data} deleteFn={setDeleteSkill} editSkillFn={setSkillLevel}/>) }
                </section></>
            :   <>
                <h2 className={styles.newSkillTitle}>Create a new skill</h2>
                <form onSubmit={e => createNewSkill(e)} className={styles.newSkillForm}>
                    <div className={styles.newSkillForm_field}>
                        <label htmlFor="nombre" className={styles.newSkillForm_label}>Skill Name:</label>
                        <input name="nombre" onChange={e => setSkill({ ...skill, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label htmlFor="level" className={styles.newSkillForm_label}>Skill ability:</label>
                        <select name="level" onChange={e => setSkill({ ...skill, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label htmlFor="role" className={styles.newSkillForm_label}>Skill role:</label>
                        <select name="role" onChange={e => setSkill({ ...skill, [e.target.name]: e.target.value })} className={styles.newSkillForm_input}>
                            <option>Front-end</option>
                            <option>Back-end</option>
                        </select>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Skill Image:</label>
                        <input onChange={e => setSkill({ ...skill, image: e.target.files[0] })} className={styles.newSkillForm_file} type="file"/>
                    </div>
                <div className={styles.newSkillBtns}>
                    <button onClick={() => setNewSkill(false)} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Cancel creation</span></button>
                    { !formLoading 
                    ?<button type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Create New Skill</span></button>                      
                    :<button disabled type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Creating...</span></button> }
                </div>
                </form></> }
        </Layout>
    );
}