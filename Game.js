import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Background } from "./Background";
import { Platform } from "./Platform";
import { Hero } from "./Hero";
import { Vehicles } from './Vehicles';
import { LabelScore } from "./LabelScore";
import { GameOver } from "./GameOver";
import * as Matter from 'matter-js';

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createHero();
        this.createPlatform({
            
            rows: (window.innerHeight-1024)/64+2,
            cols:20,
            x: 0
        });
        
        this.createVehicles();
        
        this.setEvents();
        
        this.createUI();
       
    }
    

    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () => {
            this.labelScore.renderScore(this.hero.score);
        });
    }

    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);        
                
        if (hero && platform) {            
            this.hero.stayOnPlatform(platform.gamePlatform);
        }

        const diamond = colliders.find(body => body.gameDiamond);

        if (hero && diamond) {            
            this.hero.collectDiamond(diamond.gameDiamond);
        }
        
        const cake = colliders.find(body => body.gameCake);

        if (hero && cake) {
            this.hero.collectCake(cake.gameCake);
        }

        const donut = colliders.find(body => body.gameDonut);

        if (hero && donut) {
            this.hero.collectDonut(donut.gameDonut);
        }        
    }

    createVehicles() {
        this.vehicles = new Vehicles();
        this.container.addChild(this.vehicles.container)
    }
    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
        
    }
    
    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }
    
    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
        
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.hero.startJump();
        });
        this.hero.sprite.once("die", () => {
            this.over = new GameOver();
            this.container.addChild(this.over);
            const multiscore = this.over.renderGameOver(this.hero.score);
            setTimeout(() => {  //I may or may not leave this in * I left this in
                this.destroy();
            },12000)
            const scores = [multiscore, this.hero.score]
            console.log(scores)
            

        });
    }

    
       
    update(dt) {
        this.bg.update(dt);
        this.vehicles.update(dt);
        
    }

    destroy() {
        Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
        App.app.ticker.remove(this.update, this);
        this.bg.destroy();
        this.hero.destroy();
        this.vehicles.destroy();
        this.labelScore.destroy();
    }

    
}
