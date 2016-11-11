import { Component, OnInit } from '@angular/core';
import { PlayService }       from './play.service';
import { Play }				       from './play';

@Component({
  moduleId: module.id, //What is this?
  selector: 'play',
  templateUrl: 'play.component.html',
  providers: [ PlayService ]
})
export class PlayComponent implements OnInit {
  errorMessage: string;
  play: string;
  mode = 'Observable';

  constructor (private playService: PlayService) {}

  ngOnInit() {
	this.getPlay();
  }

  getPlay() {
    this.playService.getPlay()
                     .subscribe(
					   play => this.play = play,
             error =>  this.errorMessage = <any>error);
  }
}