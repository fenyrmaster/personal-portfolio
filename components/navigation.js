import styles from "../styles/App.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"

const Navigation = () => {

    const [navActive, setNavActive] = useState(false);
    const router = useRouter();

    //<Link href="/about-me"><a className={styles.nav_link}><span className={styles.nav_link_text}>About me</span></a></Link>
    
    const handleClick = () => {
        navActive ? setNavActive(false) : setNavActive(true);
    }

    return(
        <>
            <div className={styles.nav_container}>
                <div className={styles.nav_name_container}>
                    <Link href={"/"}><h4 className={styles.nav_name}>Brandon</h4></Link>
                </div>
                <div className={styles.nav_navigation}>
                    <div onClick={() => handleClick()} className={`${styles.nav_button} ${navActive && styles.nav_button_active}`}>
                        <p className={styles.nav_button_text}>MENU</p>
                        <div className={styles.nav_button_btn}></div>
                    </div>
                </div>
            </div>
            <div className={`${styles.nav_linksWrapper} ${navActive && styles.nav_linksWrapper_active}`}>
                <nav className={styles.nav_links}>
                    <Link href="/"><a onClick={() => {if(router.pathname == "/"){setNavActive(false)}} } className={styles.nav_link}><span className={styles.nav_link_text}>Home</span></a></Link>
                    <Link href="/blog"><a className={styles.nav_link}><span className={styles.nav_link_text}>Blog</span></a></Link>
                    <Link href="/all-projects"><a className={styles.nav_link}><span className={styles.nav_link_text}>All Projects</span></a></Link>
                    <Link href="/#contact-form"><a onClick={() => {if(router.pathname == "/"){setNavActive(false)}} } className={styles.nav_link}><span className={styles.nav_link_text}>Contact me</span></a></Link>
                </nav>
            </div>
        </>
    );
};

export default Navigation;