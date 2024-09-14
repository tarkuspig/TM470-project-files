import * as PIXI from "pixi.js";
import { App } from "../system/App";
import * as Matter from 'matter-js';

export class Hero {
    constructor() {
        this.createSprite();
        this.createBody();
        App.app.ticker.add(this.update, this);

        this.dy = App.config.hero.jumpSpeed;
        this.maxJumps = App.config.hero.maxJumps;
        this.jumpIndex = 0;
        this.score = 0;
    }

    startJump() {
        if (this.platform || this.jumpIndex === 0) {
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }

    collectCake(cake) {
        ++this.score;
        this.sprite.emit("score");
        if(cake.sprite){
            cake.sprite.destroy();
            cake.sprite = null;  
        }     
    }

    collectDonut(donut) {
        this.score += 5;
        this.sprite.emit("score");
        if(donut.sprite){
            donut.sprite.destroy();
            donut.sprite = null;
        }        
    }
  
    collectDiamond(diamond) {
        this.score += 20;
        this.sprite.emit("score");
        if(diamond.sprite){
            diamond.sprite.destroy();
            diamond.sprite = null;
        }
    }

    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }

    createSprite() {
        this.sprite = new PIXI.AnimatedSprite([            
            App.res("brad1"),
            App.res("brad1"),
            App.res("brad1"),
            App.res("brad1"),
            App.res("bradpush1"),
            App.res("bradpush2"),
            App.res("bradpush3"),
            App.res("bradpush4"),
            App.res("bradpush5")
        ]);

        this.sprite.x = App.config.hero.position.x;
        this.sprite.y = App.config.hero.position.y;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.07;
        this.sprite.play();
    }
    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, 
        this.sprite.y + this.sprite.height / 2, this.sprite.width, 
        this.sprite.height, {friction: 0});
        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }
    update() {        
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;
        
        if (this.sprite.y > window.innerWidth) {
            this.sprite.emit("die");
        }
        
        
    }

    destroy() {
        App.app.ticker.remove(this.update, this);
        Matter.World.add(App.physics.world, this.body);
        this.sprite.destroy();
    }

}