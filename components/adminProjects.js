import styles from "../styles/App.module.css";
import Image from "next/image";

const AdminProject = () => {
    return(
            <div>
                <h2 className={styles.adminProject_title}>Tienda de joyas</h2>
                <div className={styles.adminProject_Main}>
                    <Image className={styles.adminProject_Img} src={"/../public/images/Screenshot_9.png"} width={260} height={150}/>
                    <div className={styles.adminProject_Technologies}>
                        <Image className={`${styles.swiperImage} ${styles.adminProject_techImg}`} src={"/../public/images/React-solo.png"} width={35} height={35}/>
                        <Image className={`${styles.swiperImage} ${styles.adminProject_techImg}`} src={"/../public/images/React-solo.png"} width={35} height={35}/>
                        <Image className={`${styles.swiperImage} ${styles.adminProject_techImg}`} src={"/../public/images/React-solo.png"} width={35} height={35}/>
                        <Image className={`${styles.swiperImage} ${styles.adminProject_techImg}`} src={"/../public/images/React-solo.png"} width={35} height={35}/>
                    </div>
                </div>
                <div className={styles.adminProject_Buttons}>
                <button className={styles.skillEdit}>Edit</button>
                <button className={styles.projectView}>View</button>
                <button className={styles.skillDelete}>Delete</button>
                </div>
            </div>
    );
}

export default AdminProject;