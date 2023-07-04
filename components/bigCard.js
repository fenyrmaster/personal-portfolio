import styles from "../styles/App.module.css";
import Image from "next/image";
import Link from "next/link";

const BigCard = ({entry}) => {
    
    return(
        <div className={styles.blogEntry_bigCard}>
            <img src={entry.image} className={styles.blogEntry_bigCard_img}/>
            <div className={styles.blogEntry_bigCard_mainContent}>
                <h4 className={styles.blogEntry_bigCard_title}>{entry.nombre}</h4>
                <p className={styles.blogEntry_bigCard_intro}>{entry.intro}</p>
                <div className={styles.blogEntry_bigCard_quickInfo}>
                    <div className={styles.blogEntry_bigCard_quickInfo_data}>
                        <p className={styles.blogEntry_bigCard_quickInfo_text}>{entry.views}</p>
                        <ion-icon name={"eye-sharp"}></ion-icon>
                    </div>
                    <div className={styles.blogEntry_bigCard_quickInfo_data}>
                        <p className={styles.blogEntry_bigCard_quickInfo_text}>{entry.time}</p>
                        <ion-icon name={"book-outline"}></ion-icon>
                    </div>
                    <div className={styles.blogEntry_bigCard_quickInfo_data}>
                        <p className={styles.blogEntry_bigCard_quickInfo_text}>{new Date(entry.postDate.split("T")[0]).toLocaleDateString("en-US", {day: "2-digit", year: "numeric", month: "long"})}</p>
                        <ion-icon name={"calendar-outline"}></ion-icon>
                    </div>
                </div>
                <Link href={entry ? `/entry/${entry.slug}` : ""}><a className={styles.blogEntry_bigCard_btn}><span className={styles.btnText}>View entry</span></a></Link>
            </div>
        </div>
    );
}

export default BigCard;