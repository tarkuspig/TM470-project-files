import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { TitleScreen } from "./TitleScreen";

export class Title extends Scene {
    create() {
        
        this.createTitleScreen();
        this.start();
    }

    createTitleScreen() {
        this.title = new TitleScreen();
        this.container.addChild(this.title);
    }

    
    start() {
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.destroy();
            App.scenes.start("Game");

        });
    }
    

}