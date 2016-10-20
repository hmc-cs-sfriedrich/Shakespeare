import { Component } from '@angular/core';
import { Scene } from './scene';
import { Line } from './line';

@Component({
    selector: 'dropdown',
    templateUrl: 'app/dropdown.component.html'
})

export class Dropdown{
    scenes: Scene[];
    sceneToDisplay: Scene;
    displaySceneNumber: Number;

    constructor () {
        this.scenes = [];
		
		let line = new Line("THIS IS ACT 1 SCENE 1", 6, 1);
		let lines = [line]
        let act1scene1 = new Scene(1,1, lines);
        this.scenes.push(act1scene1);
		
		let lines1_2 = [new Line("THIS IS ACT 1 SCENE 2", 6, 1)]
        let act1scene2 = new Scene(1,2, lines1_2);
        this.scenes.push(act1scene2);
		
		let lines2_1 = [new Line("THIS IS ACT 2 SCENE 1", 6, 1)];
        let act2scene1 = new Scene(2,1, lines2_1);
        this.scenes.push(act2scene1);
		
		let lines2_2 = [new Line("THIS IS ACT 2 SCENE 2", 6, 1)]
        let act2scene2 = new Scene(2,2, lines2_2);
        this.scenes.push(act2scene2);
		
		this.sceneToDisplay = act1scene1;
    }

    update(scene: Scene): void {
        console.log('Hello????');
        this.displaySceneNumber = scene.sceneNumber;
    }
}