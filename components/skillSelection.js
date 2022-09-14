import Image from "next/image";
import styles from "../styles/App.module.css";

const SkillSelection = () => {
    return(
        <label class="form-control">
            <Image className={styles.techImg1} src="/../public/images/React-solo.png" width={50} height={50}/>
            <input onChange={() => console.log("se cambio")} type="checkbox" name="checkbox" />
        </label>
    );
}

export default SkillSelection;