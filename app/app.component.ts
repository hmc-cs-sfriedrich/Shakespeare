import { Component, OnInit } from '@angular/core';
import { PlayService } from './play/play.service';
import { ActScene } from './play/actscene';

import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [ PlayService ]
})

@Injectable()
export class AppComponent implements OnInit {
	highlightVowels: boolean;
	countSyllables: boolean;
	displayScansion: boolean;
	prevCharacter: string;
	play: string;
	errorMessage: string;
	act: number;
	scene: number;
	actScenes: ActScene[];
	currentActScene: ActScene;

	constructor(private playService: PlayService) {}

	ngOnInit() {
		this.getPlay("macbeth");
		this.actScenes = [];
		this.act = 0;
		this.scene = 0;
  	}

	getPlay(play: string) {
		this.playService.getPlay(play)
						.subscribe(
						play => this.initPlay(play),
				error =>  this.errorMessage = <any>error);
	}

	initPlay(play: string) {
		this.play = play;
		var sceneIndex: number = 0;
		for (let act of play[0].play.acts) {
			for (let scene of act.scenes) {
				this.actScenes.push(new ActScene(act.actNumber, scene.sceneNumber, sceneIndex));
				sceneIndex++;
			}
		}
		this.currentActScene = this.actScenes[0];
		console.log(this.actScenes.length);
	}

	toggleCountSyllables(): void {
		this.countSyllables = !this.countSyllables;
	}

	toggleDisplayScansion(): void {
		this.displayScansion = !this.displayScansion;
	}

	toPreviousScene(): void {
		// Only attempt to navigate back a scene if NOT at first scene in first act
		if (this.currentActScene.sceneIndex != 0) {
			this.currentActScene = this.actScenes[this.currentActScene.sceneIndex - 1];
		}
	}

	toNextScene(): void {
		// Only attempt to navigate forward a scene if NOT at last scene in last act
		if (this.currentActScene.sceneIndex < this.actScenes.length - 1) {
			this.currentActScene = this.actScenes[this.currentActScene.sceneIndex + 1];
		}
	}
}
