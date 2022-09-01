import ParticlesAdmin from "../sketch/admin-particles";
import styles from "../styles/App.module.css";

export default function Layout({children}){

    return(
        <>
            <ParticlesAdmin/>
            <div className={styles.content}>
                <h1>This is a hello</h1>
                <main>{children}</main>
            </div>
        </>
    );
}