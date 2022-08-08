import styles from "../styles/App.module.css";
import Image from "next/image";
import Link from "next/link";

const Project = () => {
    return(
        <div className={styles.project}>
            <div className={styles.techImgContainer}>
                <img className={styles.techImg} src="/images/Screenshot_9.png"/>
            </div>
            <div className={styles.linkWrapper}>
                <Link href="/about-me"><a className={styles.btn1}><span className={styles.btnText}>More project details</span></a></Link>
            </div>
            <h4 className={styles.tecnologies}>Tecnologies used:</h4>
            <div className={styles.tech}>
                <Image className={styles.techImg1} src="/../public/images/React-solo.png" width={50} height={50}/>
                <Image className={styles.techImg1} src="/../public/images/React-solo.png" width={50} height={50}/>
                <Image className={styles.techImg1} src="/../public/images/React-solo.png" width={50} height={50}/>
                <Image className={styles.techImg1} src="/../public/images/React-solo.png" width={50} height={50}/>
                <Image className={styles.techImg1} src="/../public/images/React-solo.png" width={50} height={50}/>
                <Image className={styles.techImg1} src="/../public/images/React-solo.png" width={50} height={50}/>
                <Image className={styles.techImg1} src="/../public/images/React-solo.png" width={50} height={50}/>
            
            </div>
        </div>
    );
}

export default Project;