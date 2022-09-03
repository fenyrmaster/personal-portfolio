import ParticlesAdmin from "../sketch/admin-particles";
import styles from "../styles/App.module.css";
import Link from "next/dist/client/link";

export default function Layout({children}){

    return(
        <section className={styles.mainBck}>
            <div className={styles.content}>
                <nav className={styles.adminNav}>
                    <Link href="/blog"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Blog</span></a></Link>
                    <Link href="/blog"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Blog</span></a></Link>
                    <Link href="/blog"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Blog</span></a></Link>
                </nav>
                <main className={styles.childContent}>{children}</main>
            </div>
        </section>
    );
}