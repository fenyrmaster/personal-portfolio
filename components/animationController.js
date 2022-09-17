import { useContext } from "react";
import PublicContext from "../context/PublicProvider";

const AnimationController = () => {
    const { animationActive, setAnimationActive } = useContext(PublicContext);

    return(
        <div onClick={() => animationActive ? setAnimationActive(false) : setAnimationActive(true)} className={`animationController ${animationActive && "animationOn"}`}>
            <ion-icon name={animationActive ? "eye-sharp" : "eye-off-sharp"}></ion-icon>
            <p className={"animationText"}>{animationActive ? "ON" : "OFF"}</p>
        </div>
    )
}

export default AnimationController;