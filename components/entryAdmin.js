import Image from "next/dist/client/image";
import styles from "../styles/App.module.css";
import Link from "next/link";
import { useContext } from "react";
import BlogContext from "../context/BlogProvider";

const EntryAdmin = ({entry, setDeleteAsk, prepareEdit, setEditName}) => {

    const {setEntryDelete} = useContext(BlogContext);

    return(
        <div>
        <div className={styles.adminEntry_Main}>
            <div className={styles.adminEntry_imgContainer}></div>
            <Image className={styles.adminEntry_img} src={entry.image} width={130} height={100}/>
            <div className={styles.adminEntry_data}>
                <h4>{entry.nombre}</h4>
                <div className={`${styles.adminEntry_quickStats} stats_icon`}>
                    <div className={styles.adminEntry_stat}>
                        <p className={styles.adminEntry_statP}>{entry.views}</p>
                        <ion-icon name={"eye-sharp"}></ion-icon>
                    </div>
                    <div className={styles.adminEntry_stat}>
                        <p className={styles.adminEntry_statP}>{entry.time}</p>
                        <ion-icon name={"book-outline"}></ion-icon>
                    </div>
                    <div className={styles.adminEntry_stat}>
                        <p className={styles.adminEntry_statP}>{new Date(entry.postDate.split("T")[0]).toLocaleDateString("en-US", {day: "2-digit", year: "numeric", month: "long"})}</p>
                        <ion-icon name={"calendar-outline"}></ion-icon>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.adminProject_Buttons}>
            <button onClick={() => {setEditName(entry.nombre); prepareEdit(entry)}} className={styles.skillEdit}>Edit</button>
            <Link href={entry ? `/entry/${entry.slug}` : ""}><a className={styles.projectView} target="_blank">View</a></Link>
            <button onClick={() => {setEntryDelete(entry); setDeleteAsk(true)}} className={styles.skillDelete}>Delete</button>
        </div>
    </div>
    );
}

export default EntryAdmin;