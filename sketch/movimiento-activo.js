import math from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import { useEffect } from 'react';
import styles from "../styles/App.module.css"
import * as React from "react";

const CanvasMovimientoActivo = ({width1, height2}) => {
    const canvasRef2 = React.useRef(null);

    useEffect(() => {
        let context = canvasRef2.current.getContext("2d");
        let width = width1;
        let height = height2;

        class Point {
            constructor(x, y){
              this.x = x,
              this.y = y
            }
          
            getDistance(v){
              const dx = this.x - v.x;
              const dy = this.y - v.y;
              return Math.sqrt((dx * dx)+(dy * dy));
            }
          }
          
          class Agent extends Point {
            constructor(x, y, radius){
              super(x, y);
              this.radius = radius,
              this.vel = { x: random.range(-.3, .3), y: random.range(-.3,.3) }
            }
            updatePos(){
              this.x += this.vel.x,
              this.y += this.vel.y
            }
            dibujar(context){
              context.save();
          
              context.beginPath();
          
              context.translate(this.x, this.y);
              context.rotate(this.x * Math.PI / 180);
              context.translate( -this.x, -this.y );
          
              context.moveTo(this.x - 20, this.y - 20);
              context.lineTo(this.x + 20, this.y + 20);
          
          
              context.moveTo(this.x + 20, this.y - 20);
              context.lineTo(this.x - 20, this.y + 20);
          
              //context.translate(this.x, this.y);
              //context.rotate(this.x * Math.PI / 180);
              //context.translate( -this.x, -this.y );
          
              context.lineWidth = 8;
          
              context.strokeStyle = "rgb(255, 131, 0)";
              context.stroke();
          
              context.restore();
          
            }
            dibujarSub(context){
              context.save();
          
              context.beginPath();
          
              context.translate(this.x, this.y);
              context.rotate(this.x * Math.PI / 180);
              context.translate( -this.x, -this.y );
          
              context.moveTo(this.x - 21, this.y - 21);
              context.lineTo(this.x + 21, this.y + 21);
          
              context.moveTo(this.x + 21, this.y - 21);
              context.lineTo(this.x - 21, this.y + 21);
              context.lineWidth = 12;
          
              context.strokeStyle = "#666666";
              context.stroke();
          
              context.restore();
            }
            rebotar(width,height){
              if(this.x <= 0 || this.x >= width) this.vel.x *= -1;
              if(this.y <= 0 || this.y >= height) this.vel.y *= -1;
          
              //if(this.x <= 0 && this.x <= width) this.x = 999;
              //if(this.x >= width && this.x >= 0) this.x = 0;
              //if(this.y <= 0 && this.y <= height) this.y = 999;
              //if(this.y >= height && this.y >= 0) this.y = 0;
            }
          }
          class Triangle extends Point {
            constructor(x, y, radius){
              super(x, y);
              this.radius = radius,
              this.vel = { x: random.range(-.5, .5), y: random.range(-.5,.5) }
            }
            updatePos(){
              this.x += this.vel.x,
              this.y += this.vel.y
            }
            dibujar(context){
              context.save();
          
              context.beginPath();
          
              context.translate(this.x, this.y);
              context.rotate((this.x / 6) * Math.PI / 180);
              context.translate( -this.x, -this.y );
          
              //context.moveTo(this.x + 25, this.y + 25);
              //context.lineTo(this.x + 25, this.y + 75);
              //context.lineTo(this.x + 75, this.y + 75);
          
              context.moveTo(this.x + (108 / 4), this.y + (0.0 / 4));
              context.lineTo(this.x + (141 / 4), this.y + (70  / 4));
              context.lineTo(this.x + (218 / 4), this.y + (78.3/ 4));
              context.lineTo(this.x + (162 / 4), this.y + (131 / 4));
              context.lineTo(this.x + (175 / 4), this.y + (205 / 4));
              context.lineTo(this.x + (108 / 4), this.y + (170 / 4));
              context.lineTo(this.x + (41.2/ 4), this.y + (205 / 4));
              context.lineTo(this.x + (55  / 4), this.y + (131 / 4));
              context.lineTo(this.x + (1   / 4), this.y + (78  / 4));
              context.lineTo(this.x + (75  / 4), this.y + (68  / 4));
              context.lineTo(this.x + (108 / 4), this.y + (0   / 4));
          
              context.closePath();
          
              context.lineWidth = 10;
              context.strokeStyle = '#666666';
              context.stroke();
          
              // the fill color
              context.fillStyle = "#FFCC00";
              context.fill();
          
              context.restore();
          
            }
            rebotar(width,height){
              if(this.x <= 0 || this.x >= width) this.vel.x *= -1;
              if(this.y <= 0 || this.y >= height) this.vel.y *= -1;
          
              //if(this.x <= 0 && this.x <= width) this.x = 999;
              //if(this.x >= width && this.x >= 0) this.x = 0;
              //if(this.y <= 0 && this.y <= height) this.y = 999;
              //if(this.y >= height && this.y >= 0) this.y = 0;
            }
          }
        const agents = [];
        const agentsTriangle = [];

        for(let i = 0; i < 10; i++){
            let agentA = new Agent(random.range(0, width), random.range(0, height), random.range(4, 12));
            agents.push(agentA);
        }
        for(let i = 0; i < 10; i++){
          let agentA = new Triangle(random.range(0, width), random.range(0, height), random.range(4, 12));
          agentsTriangle.push(agentA);
        }
      
        const animate = () => {
          requestAnimationFrame(animate);
          context.fillStyle = "#fff2dd";
          context.fillRect(0, 0, width, height);
          agents.forEach(agentA => {
            agentA.updatePos();
            agentA.dibujarSub(context);
            agentA.dibujar(context, width, height);
            agentA.rebotar(width, height);
          })
          agentsTriangle.forEach(agentT => {
            agentT.updatePos();
            //agentT.dibujarSub(context);
            agentT.dibujar(context, width, height);
            agentT.rebotar(width, height);
          })
      
        }
        animate();

    }, [width1]);
    return(
        <canvas width={width1} className={styles.movCanvas} height={height2} ref={canvasRef2}></canvas>
    )
}

export default CanvasMovimientoActivo;