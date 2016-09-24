import { Component, OnInit } from '@angular/core';
import { Line } from './line';
import { Dropdown } from './dropdown.component';

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
		let line = new Line("I eat feet", 1);
		line.countSyllables();
		this.lines.push(line);
	}
	
	toggleHighlightVowels(): void {
		
	}
}
