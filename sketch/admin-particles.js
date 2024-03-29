import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticlesAdmin = () => {
    const particlesInit = useCallback(async (engine) => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
      }, []);
    
      const particlesLoaded = useCallback(async (container) => {
        await container;
      }, []);
    
      return (
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: false,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                directions: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: .5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 900,
                },
                value: 10,
              },
              opacity: {
                value: 0.35,
              },
              rotate: {
                direction: "clockwise",
                value: { min: 90, max: 270 }
              },
              shape: {
                type: "polygon",
                polygon: {
                    sides: 7
                }
                
              },
              size: {
                value: { min: 30, max: 50 },
              },
            },
            detectRetina: true,
          }}
        />
      );
}

export default ParticlesAdmin;