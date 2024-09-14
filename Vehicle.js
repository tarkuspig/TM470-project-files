import * as PIXI from "pixi.js";
import * as Matter from 'matter-js';
import { App } from "../system/App";
import { Cake } from "./Cake";
import { Diamond } from "./Diamond";
import { Donut } from "./Donut";
export class Vehicle {
    constructor(x) {
        
        const vehicles = ['truck']//, 'bus']; //redcar and bluecar  and bus taken out
        const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
                this.createContainer();
        this.createSprite(randomVehicle);
        
        this.width = PIXI.Texture.from(randomVehicle).width;
        this.height = PIXI.Texture.from(randomVehicle).height;
        
        this.dx = App.config.platforms.moveSpeed;
        this.createBody();
        this.cakes = [];
        this.createCakes();
        this.diamonds = [];
        this.createDiamonds();
        this.donuts = []
        this.createDonuts();
    }
    createDiamonds() {
        
        for (let i = 0; i < 3; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                this.createDiamond((Math.floor(Math.random() * 101)+ 350), this.height - 400);
            }
        }
    }

    createDiamond(x, y) {
            const diamond = new Diamond(x, y);
            this.container.addChild(diamond.sprite);
            diamond.createBody();
            this.diamonds.push(diamond);
    }
    createDonuts() {
        const y = App.config.donuts.offset.min + Math.random() * (App.config.donuts.offset.max - App.config.donuts.offset.min);

        for (let i = 0; i < 5; i++) {
            if (Math.random() < App.config.donuts.chance) {
                this.createDonut((Math.floor(Math.random() * 101)+ 350), this.height - 320);
            }
        }
    }

    createDonut(x, y) {
            const donut = new Donut(x, y);
            this.container.addChild(donut.sprite);
            donut.createBody();
            this.donuts.push(donut);
    }

    createCakes() {
        const y = App.config.cakes.offset.min + Math.random() * 
        (App.config.cakes.offset.max - App.config.cakes.offset.min);

        for (let i = 0; i < 5; i++) {
            if (Math.random() < App.config.cakes.chance) {
                this.createCake((Math.floor(Math.random() * 101)+ 350), this.height - 250);
                
            }
        }
    }

    createCake(x, y) {
        const cake = new Cake(x, y);
        this.container.addChild(cake.sprite);
        cake.createBody();
        this.cakes.push(cake);
}


    createContainer() {
        this.container = new PIXI.Container();
        this.container.x = 900;
        this.container.y = 730;
    }

    createBody() {
        this.body = Matter.Bodies.rectangle(this.width / 2 + this.container.x, this.height / 2 + this.container.y, this.width, this.height, {friction: 0, isStatic: true});
        Matter.World.add(App.physics.world, this.body);
        this.body.gamePlatform = this;
    }

    createSprite(x) {      
               
        const veh = App.sprite(x);
        this.container.addChild(veh);
        veh.x = 0
        veh.y = 0       
    }

    move() {
        if (this.body) {
            Matter.Body.setPosition(this.body, {x: this.body.position.x + this.dx, y: this.body.position.y});
            this.container.x = this.body.position.x - this.width / 2;
            this.container.y = this.body.position.y - this.height / 2;
            
        }
    }
    
    destroy() {
        Matter.World.remove(App.physics.world, this.body);
        this.diamonds.forEach(diamond => diamond.destroy());
        this.cakes.forEach(cake => cake.destroy());
        this.donuts.forEach(donut => donut.destroy());
        this.container.destroy();
    }
    
    
}