import { Component, OnInit } from '@angular/core';
import { Line } from './line';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})

export class AppComponent implements OnInit {
	lines: Line[];
	
	highlightVowels: boolean;
	
	constructor() {
		this.lines = [];
	}

	ngOnInit(): void {
		let line = new Line("This is the farewell", 1);
		line.countSyllables();
		this.lines.push(line);
	}
	
	toggleHighlightVowels(): void {
		
	}
}
