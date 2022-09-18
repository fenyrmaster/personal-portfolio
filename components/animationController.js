import { useContext, useEffect, useState } from "react";
import PublicContext from "../context/PublicProvider";
import Swal from "sweetalert2";

const AnimationController = () => {

    const { animationActive, primerPregunta, setPrimerPregunta, setAnimationActive } = useContext(PublicContext);

    const animationControl = () => {
        if(!primerPregunta){
            Swal.fire({
                title: '¿Do you want to activate animations?',
                text: "Animations takes a lot of resources from your device, only activate animations if your device is capable",
                icon: "question",
                confirmButtonColor: '#ffcc00',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: "No",
                cancelButtonColor: "#ff0000"
              }).then((result) => {
                if(result.isConfirmed){
                    setAnimationActive(true);
                    setPrimerPregunta(true);
                }
              });
        } else{
            animationActive ? setAnimationActive(false) : setAnimationActive(true);
        }
    }

    return(
        <div onClick={() => animationControl()} className={`animationController ${animationActive && "animationOn"}`}>
            <ion-icon name={animationActive ? "eye-sharp" : "eye-off-sharp"}></ion-icon>
            <p className={"animationText"}>{animationActive ? "ON" : "OFF"}</p>
        </div>
    )
}

export default AnimationController;