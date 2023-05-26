import ParticlesAdmin from "../sketch/admin-particles";
import styles from "../styles/App.module.css";
import Link from "next/dist/client/link";
import AnimationController from "./animationController";
import PublicContext from "../context/PublicProvider";
import { useEffect, useState, useContext } from "react";

export default function Layout({children}){

    const [ url, setUrl ] = useState("");
    const { animationActive, validate } = useContext(PublicContext);
    useEffect(() => {
        validate();
        let current = window.location.pathname.split("/")[2];
        setUrl(current);
    }, []);

    return(
        <>
        {animationActive && <ParticlesAdmin/>}
        <AnimationController/>
        <section className={styles.mainBck}>
            <div className={styles.content}>
                <nav className={styles.adminNav}>
                    <div className={`navContainer ${url === "blog" && "selected"}`}>
                        <ion-icon name="golf-sharp"></ion-icon>
                        <Link href="/admin/blog"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Blog</span></a></Link>
                    </div>
                    <div className={`navContainer ${url === "skills" && "selected"}`}>
                        <ion-icon name="code-slash-sharp"></ion-icon>
                        <Link href="/admin/skills"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Skills</span></a></Link>
                    </div>
                    <div className={`navContainer ${url === "projects" && "selected"}`}>
                        <ion-icon name="reader-sharp"></ion-icon>
                        <Link href="/admin/projects"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Projects</span></a></Link>
                    </div>
                    <div className={"navContainer"}>
                        <ion-icon name="trophy-sharp"></ion-icon>
                        <Link href="/blog"><a className={styles.btnAdminNav}><span className={styles.adminNavText}>Awards</span></a></Link>
                    </div>
                </nav>
                <main className={styles.childContent}>{children}</main>
            </div>
        </section>
        </>
    );
}