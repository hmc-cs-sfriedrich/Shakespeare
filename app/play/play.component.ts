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
}