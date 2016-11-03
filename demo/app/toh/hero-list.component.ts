import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';
import { Play }				       from './play';
import { Scene }             from './scene'

@Component({
  moduleId: module.id, //What is this?
  selector: 'hero-list',
  templateUrl: 'hero-list.component.html',
  providers: [ HeroService ]
})
export class HeroListComponent implements OnInit {
  errorMessage: string;
  plays: Play;
  mode = 'Observable';
  scene: Scene;

  constructor (private heroService: HeroService) {}

  ngOnInit() {
    let ps: Play;
	this.getPlay();
	console.log("Plays is undefined?!");
	console.log(ps === this.plays); //test
  }

  getPlay() {
    this.heroService.getPlay()
                     .subscribe(
					 /*
                       function(plays) {
							this.plays = plays;
							console.log(this.plays)
							this.scene = plays[0].play.acts[0].scenes[0];
							console.log(this.scene);
							console.log(this.scene.sceneNumber);
					   },
					   */
					   plays => this.plays = plays,
             error =>  this.errorMessage = <any>error);
  }
}