import { useState } from "react";
import Layout from "../../components/adminLayout";
import styles from "../../styles/App.module.css";
import { Router, useRouter } from "next/router";
import Swal from "sweetalert2";
import clienteAxios from "../../config/clienteAxios";

const loginAdmin = () => {
    
    const [ password, setPassword ] = useState("");

    let router = useRouter();

    const login = async e => {
        try{
            e.preventDefault();
            if(password === ""){
                return Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Please insert a password",
                    confirmButtonColor: "#ffcc00"
                });
            }
            await clienteAxios.post(`projects/access`, { password: password });
            router.push("/admin/projects");
            return Swal.fire({
                title: "Confirmed",
                icon: "success",
                text: "You accessed the website data",
                confirmButtonColor: "#ffcc00"
            });
        } catch(error){
            Swal.fire({
                title: "Error",
                icon: "error",
                text: error.response.data.message,
                confirmButtonColor: "#ffcc00"
            })
        }
    }

    return(
        <Layout>
            <h2 className={styles.newSkillTitle}>Login to manage the website</h2>
            <form onSubmit={e => login(e)} className={styles.newSkillForm}>
                <div className={styles.newSkillForm_field}>
                    <label className={styles.newSkillForm_label}>Password:</label>
                    <input name="password" value={password} onChange={e => setPassword(e.target.value)} className={styles.newSkillForm_input}/>
                </div>
                <button type="submit" className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Login administration</span></button>
            </form>
        </Layout>
    );
}

export default loginAdmin;