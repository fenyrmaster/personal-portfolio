import math from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import { useEffect } from 'react';
import * as React from "react";

const CanvasRodeo = () => {

    const canvasRef = React.useRef(null);

    useEffect(() => {
        let context = canvasRef.current.getContext("2d");
        let width = 600;
        let height = 600;
        
        const circulos = [];

        class Circulo{
            constructor(radius,corteX, corteY, cortes){
              this.radius = radius,
              this.corteX = corteX,
              this.corteY = corteY,
              this.cortes = cortes,
              this.color = `rgb(${random.range(200, 255)},${random.range(130, 160)},${random.range(1, 60)})`
              this.probabilidad = random.range(0, 1);
              this.vel = random.range((0.002, 0.007))
            }
            dibujar(context, cx, cy){
              context.save();
          
              context.translate(cx, cy);
              context.rotate(-this.cortes);
              context.lineWidth = 10;
              context.beginPath();
              context.arc(0, 0, this.radius, this.corteX, this.corteY);
              context.lineCap = "round";
              context.strokeStyle = this.color;
              context.stroke();
              context.strokeStyle = "red";
          
              context.restore();
            }
            dibujarFondo(context, cx, cy){
              context.save();
          
              context.translate(cx, cy);
              context.rotate(-this.cortes);
              context.lineWidth = 15;
              context.beginPath();
              context.arc(0, 0, this.radius, this.corteX, this.corteY);
              context.lineCap = "round";
              context.stroke();
              context.strokeStyle = "red";
          
              context.restore();
            }
            girar(){
              this.probabilidad > .5 ? this.corteX += this.vel : this.corteX -= this.vel;
              this.probabilidad > .5 ? this.corteY += this.vel : this.corteY -= this.vel;
            }
          }
        
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        
        context.fillStyle = "black";
        
        const cx = width * 0.5;
        const cy = height * 0.5;
        const w = width * 0.04;
        
        const num = 13;
        const radius = width * .5;
        
        for(let i = 0; i < num; i++){
          
            let cortes = math.degToRad(360 / num) * i;
            let slice = math.degToRad(360 / (num * 2.2));
        
            let circulo = new Circulo(radius * (.08 * i), slice * random.range(0, -8), slice * random.range(0, 5), cortes)
            circulos.push(circulo);
        }
        
        const animate = () => {
            requestAnimationFrame(animate);
            context.fillStyle = 'white';
            context.fillRect(0, 0, width, height);
     
            circulos.forEach(el => {
              el.dibujarFondo(context, cx, cy);
              el.dibujar(context, cx, cy);
              el.girar();
            });

        }
          animate();
    }, []);

    return(
        <canvas width="600" height="600" ref={canvasRef}></canvas>
    )
}

export default CanvasRodeo;