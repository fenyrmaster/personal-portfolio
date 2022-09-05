import Layout from "../../components/adminLayout";
import styles from "../../styles/App.module.css";
import Link from "next/dist/client/link";
import SkillAdmin from "../../components/skillAdmin";

export default function Skills(){
    return(
        <Layout>
            <div className={styles.skillAdd}>
                <Link href="/about-me"><a className={`${styles.btn1} ${styles.adminBtn}`}><span className={styles.btnText}>Add new skills</span></a></Link>
            </div>
            <section className={styles.skillsAdmin}>
                <SkillAdmin/>
                <SkillAdmin/>
                <SkillAdmin/>
                <SkillAdmin/>
                <SkillAdmin/>
                <SkillAdmin/>
                <SkillAdmin/>
            </section>
        </Layout>
    );
}