import styles from "../styles/App.module.css";
import Link from "next/dist/client/link";

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={styles.footer_image}>
                <h4 className={`${styles.nav_name} cusomName1`}>Brandon</h4>
            </div>
            <div className={styles.footer_links}>
                <div className={styles.footer_content}>
                    <Link href="/"><a className={styles.navButtons}><span className={styles.btnTextNav}>Home</span></a></Link>
                    <Link href="/blog"><a className={styles.navButtons}><span className={styles.btnTextNav}>Blog</span></a></Link>
                    <Link href="/all-projects"><a className={styles.navButtons}><span className={styles.btnTextNav}>All Projects</span></a></Link>
                    <Link href="/about-me"><a className={styles.navButtons}><span className={styles.btnTextNav}>About me</span></a></Link>
                    <Link href="/#contact-form"><a className={styles.navButtons}><span className={styles.btnTextNav}>Contact me</span></a></Link>
                    <Link href="/"><a className={styles.navButtons}><span className={styles.btnTextNav}>Download CV</span></a></Link>
                </div>
                <div className={"footer_media"}>
                    <Link href="/"><ion-icon name="logo-facebook"></ion-icon></Link>
                    <Link href="/"><ion-icon name="logo-linkedin"></ion-icon></Link>
                    <Link href="/"><ion-icon name="logo-youtube"></ion-icon></Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;