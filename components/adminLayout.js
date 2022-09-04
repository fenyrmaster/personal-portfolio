import ParticlesAdmin from "../sketch/admin-particles";
import styles from "../styles/App.module.css";
import Link from "next/dist/client/link";

export default function Layout({children}){

    return(
        <section className={styles.mainBck}>
            <ParticlesAdmin/>
            <div className={styles.content}>
                <nav className={styles.adminNav}>
                    <div className={"navContainer"}>
                        <ion-icon name="golf-sharp"></ion-icon>
                        <Link href="/blog"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Blog</span></a></Link>
                    </div>
                    <div className={"navContainer"}>
                        <ion-icon name="code-slash-sharp"></ion-icon>
                        <Link href="/blog"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Skills</span></a></Link>
                    </div>
                    <div className={"navContainer"}>
                        <ion-icon name="reader-sharp"></ion-icon>
                        <Link href="/blog"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Projects</span></a></Link>
                    </div>
                    <div className={"navContainer"}>
                        <ion-icon name="trophy-sharp"></ion-icon>
                        <Link href="/blog"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Awards</span></a></Link>
                    </div>
                </nav>
                <main className={styles.childContent}>{children}</main>
            </div>
        </section>
    );
}