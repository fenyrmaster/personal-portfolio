import styles from "../styles/App.module.css";
import Link from "next/link";

const Navigation = () => {
    
    return(
        <div className={styles.nav_container}>
            <div className={styles.nav_name_container}>
                <h4 className={styles.nav_name}>Brandon</h4>
            </div>
            <div className={styles.nav_navigation}>
                <Link href="/"><a className={styles.navButtons}><span className={styles.btnTextNav}>Home</span></a></Link>
                <Link href="/blog"><a className={styles.navButtons}><span className={styles.btnTextNav}>Blog</span></a></Link>
                <Link href="/projects"><a className={styles.navButtons}><span className={styles.btnTextNav}>All Projects</span></a></Link>
                <Link href="/about-me"><a className={styles.navButtons}><span className={styles.btnTextNav}>About me</span></a></Link>
                <Link href="/#contact-form"><a className={styles.navButtons}><span className={styles.btnTextNav}>Contact me</span></a></Link>
            </div>
        </div>
    );
};

export default Navigation;