import { Component, OnInit } from '@angular/core';
import { PlayService } from './play/play.service';
import { ActScene } from './play/actscene';
import { Play } from './play/play';

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
	highlight: boolean;
	countSyllables: boolean;
	displayScansion: boolean;
	prevCharacter: string;
	play: string;
	errorMessage: string;
	actScenes: ActScene[];
	currentActScene: ActScene;
	plays: Play[];
	currentPlay: Play;
	highlightWhat: string;

	// Inject PlayService
	constructor(private playService: PlayService) {}

	ngOnInit() {
		this.initPlays();
		this.getPlay(this.currentPlay.fileName);
		this.actScenes = [];

		// When the user selects highlight vowels/consonants, have vowels be default
		this.highlightWhat = "vowels";
  	}

	// Used for when a user selects a new play from the dropdown
	loadNewPlay() {
		this.getPlay(this.currentPlay.fileName);
	}

	// Hardcode list of plays and arbitrary select first for view
	initPlays() {
		this.plays = [];
		this.plays.push(new Play("Macbeth", "macbeth"));
		this.plays.push(new Play("Hamlet", "by-william-shakespeare"));
		this.currentPlay = this.plays[0];
	}

	getPlay(play: string) {
		this.playService.getPlay(play)
						.subscribe(
						play => this.initPlay(play),
				error =>  this.errorMessage = <any>error);
	}

	// Populate ActScene objects for the dropdown
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
	}

	// Feature Checkbox variables //////////////////////////////////////
	toggleCountSyllables(): void {
		this.countSyllables = !this.countSyllables;
	}

	toggleDisplayScansion(): void {
		this.displayScansion = !this.displayScansion;
	}

	toggleHighlight(): void {
		this.highlight = !this.highlight;
	}
	///////////////////////////////////////////////////////////////////

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

	// Currently a naive implementation
	isVowel(char: string): boolean {
		let c = char.toLowerCase();
		return (c == "a") || (c == "e") || (c == "i") || (c == "o") || (c == "u");
	}

	// Currently a naive implementation
	isConsonant(char: string): boolean {
		let c = char.toLowerCase();
		return (c == "b") ||
			   (c == "c") ||
			   (c == "d") ||
			   (c == "f") ||
			   (c == "g") ||
			   (c == "h") ||
			   (c == "j") ||
			   (c == "k") ||
			   (c == "l") ||
			   (c == "m") ||
			   (c == "n") ||
			   (c == "p") ||
			   (c == "q") ||
			   (c == "r") ||
			   (c == "s") ||
			   (c == "t") ||
			   (c == "v") ||
			   (c == "w") ||
			   (c == "x") ||
			   (c == "y") ||
			   (c == "z");
	}

	// Converts numerals from 1-10 into Roman numerals
	roman(num: number): string {
		let conversions = {1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X"};
		return conversions[num];
	}
}
