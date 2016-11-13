import { Component, OnInit } from '@angular/core';
import { PlayService } from './play/play.service'

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
	numScenes: number[];

	constructor(private playService: PlayService) {}

	ngOnInit() {
		this.getPlay();
		this.numScenes = [7, 4, 6, 3, 11];
		this.act = 0;
		this.scene = 0;
  	}

	getPlay() {
		this.playService.getPlay()
						.subscribe(
						play => this.play = play,
				error =>  this.errorMessage = <any>error);
	}

	toggleCountSyllables(): void {
		this.countSyllables = !this.countSyllables;
	}

	toggleDisplayScansion(): void {
		this.displayScansion = !this.displayScansion;
	}

	toPreviousScene(): void {
		if (this.scene == 0) {
			if(this.act == 0) {
				return;
			}
			else {
				this.act--;
				this.scene = this.numScenes[this.act];
			}
		}
		else {
			this.scene--;
		}
	}

	toNextScene(): void {
		if(this.scene == this.numScenes[this.act] - 1) {
			if(this.act == this.numScenes.length - 1) {
				return;
			}
			else {
				this.act++;
				this.scene = 0;
			}
		}
		else {
			this.scene++;
		}
	}
}
