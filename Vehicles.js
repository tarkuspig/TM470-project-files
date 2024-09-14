import * as PIXI from "pixi.js";
import { App } from "../system/App";
import  { Vehicle } from "./Vehicle"

export class Vehicles {
    constructor() {
        this.vehicles = [];
        this.container = new PIXI.Container();
        this.createVehicle();
        

    }
    
    get randomData(){
        this.range = App.config.vehicles.offset
        let data = { space: 0 }

        const offset = this.range.min + Math.round(Math.random() * (this.range.max - this.range.min));
        data.space = this.current.container.x + this.current.container.width + offset;
        
        return data;
    }
    
    createVehicle(){
        const vehicle = new Vehicle();
        this.container.addChild(vehicle.container);
        this.vehicles.push(vehicle);
        this.current = vehicle;
    }

    update() {
        
        if (this.current.container.x + this.current.container.width < (window.innerWidth/(Math.floor(Math.random() * 201))))   
        {         
            this.createVehicle(this.randomData);           
        }

        this.vehicles.forEach(vehicle => vehicle.move());
        
        
        
    }

    destroy() {
        this.vehicles.forEach(vehicle => vehicle.destroy());
        this.container.destroy();
    }
}
        

    

