import ParticlesAdmin from "../sketch/admin-particles";
import styles from "../styles/App.module.css";

export default function Layout({children}){

    return(
        <section className={styles.mainBck}>
            <ParticlesAdmin/>
            <div className={styles.content}>
                <main>{children}</main>
            </div>
        </section>
    );
}