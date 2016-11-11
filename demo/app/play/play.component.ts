import { Component, OnInit } from '@angular/core';
import { PlayService }       from './play.service';

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
	this.getScene();
  }

  getScene() {
    this.playService.getPlay(1, 1)
                     .subscribe(
					   play => this.play = play,
             error =>  this.errorMessage = <any>error);
  }
}