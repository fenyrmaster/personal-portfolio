import Layout from "../../components/adminLayout";
import styles from "../../styles/App.module.css";
import Link from "next/dist/client/link";
import SkillAdmin from "../../components/skillAdmin";
import { useState } from "react";

export default function Skills(){

    const [ newSkill, setNewSkill ] = useState(false);

    const createNewSkill = e => {
        e.preventDefault();
        console.log("creando...");
    } 

    return(
        <Layout>
            { !newSkill
            ?   <><div className={styles.skillAdd}>
                    <button onClick={() => setNewSkill(true)} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Add new skills</span></button>
                </div>
                <section className={styles.skillsAdmin}>
                    <SkillAdmin/>
                    <SkillAdmin/>
                    <SkillAdmin/>
                    <SkillAdmin/>
                    <SkillAdmin/>
                    <SkillAdmin/>
                    <SkillAdmin/>
                </section></>
            :   <>
                <h2 className={styles.newSkillTitle}>Create a new skill</h2>
                <form onSubmit={e => createNewSkill(e)} className={styles.newSkillForm}>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Skill Name:</label>
                        <input className={styles.newSkillForm_input}/>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Skill ability:</label>
                        <select className={styles.newSkillForm_input}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                    <div className={styles.newSkillForm_field}>
                        <label className={styles.newSkillForm_label}>Skill Image:</label>
                        <input className={styles.newSkillForm_file} type="file"/>
                    </div>
                
                <div className={styles.newSkillBtns}>
                    <button onClick={() => setNewSkill(false)} className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Cancel creation</span></button>
                    <button type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Create New Skill</span></button>
                </div>
                </form></> }
        </Layout>
    );
}