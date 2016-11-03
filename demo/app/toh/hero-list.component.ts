import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';
import { Play }				 from './play';
import { Scene }             from './scene'

@Component({
  moduleId: module.id, //What is this?
  selector: 'hero-list',
  templateUrl: 'hero-list.component.html',
  providers: [ HeroService ]
})
export class HeroListComponent implements OnInit {
  errorMessage: string;
  plays: string;
  mode = 'Observable';

  constructor (private heroService: HeroService) {}

  ngOnInit() {
	this.getPlay();
  }

  getPlay() {
    this.heroService.getPlay()
                     .subscribe(
					   play => this.play = play,
             error =>  this.errorMessage = <any>error);
  }
}