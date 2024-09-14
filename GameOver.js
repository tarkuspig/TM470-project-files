import * as PIXI from "pixi.js";
import { App } from "../system/App";


export class GameOver extends PIXI.Text {
    constructor() {
        super();
        this.x = App.config.end.x;
        this.y = App.config.end.y;
        this.anchor.set(App.config.end.anchor);
        this.style = App.config.end.style;
        
    }  
    renderGameOver(score) {
        let m = Math.random()*1000
        let multi = Math.round(m)
        let dayScore = Math.round(multi*score)
        this.text = `Game Over`;
        setTimeout(() => {
            this.text = `Score: ${score}`
            setTimeout(() => {
            
                this.text = `Bonus\nMultiplier: x${multi}`
                setTimeout(() => {                    
                    this.text = `Daily\nTotal: ${dayScore}`                    
                }, 3000)
            }, 3000)
        }, 3000)       
        return (dayScore)      
    }
}