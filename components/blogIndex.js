import styles from "../styles/App.module.css";
import BigCard from "../components/bigCard";

const BlogIndex = ({entries}) => {
    
    return(
        <div className={styles.blogIndex_container}>
            {entries.map((entry) => <BigCard key={entry._id} entry={entry}/> )}
        </div>
    );
}

export default BlogIndex;