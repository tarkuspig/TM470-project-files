import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class TitleScreen { //attempt to feature title screen in the game, this was instead put in the react app
    constructor(){
        this.container = new PIXI.Container();
        this.createSprite();
    }

    createSprite() {
        const sprite = App.sprite("titleScreen.png");

        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        
    }

    update(){

    }

    destroy() {
        this.container.destroy();
    }
}