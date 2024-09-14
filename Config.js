import { Game } from "./Game";
import { Title } from "./Title"
import { Tools } from "../system/Tools";


export const Config = {
    bgSpeed: 12,
    vSpeed: -5,
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "Game": Game,
        "Title": Title,
        
        
        // ...
    
    
    },
    hero: {
        jumpSpeed: 12,
        maxJumps: 1,
        position: {
            x: 400,
            y: 650
        }
        
    },
    platforms: {
        // ...
        moveSpeed: -12
    },
    vehicles:  {
        offset: {
            min: 60,
            max: 200
        }
    },
    
    cakes: {
        chance: 0.05,
        offset: {
            min: 100,
            max: 200
        }
    },
    
    diamonds: {
        chance: 0.3,
        offset: {
            min: 200,
            max: 300
        }
    },
    donuts: {
        chance: 0.05,
        offset: {
            min: 200,
            max: 300
        }
    },
    score: {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["black"]
        }
    },
    end: {
        x: 1024/4,
        y: 1024/4,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 60,
            fill: ["black"]
        }
    }


    
       
    
};