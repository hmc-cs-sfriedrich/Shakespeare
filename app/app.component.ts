import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})

export class AppComponent implements OnInit {
	lines: string[];
	
	highlightVowels: boolean;
	
	constructor() {
		this.lines = [];
	}

	ngOnInit(): void {
		this.lines.push("MALCOLM");
		this.lines.push("This is the sergeant");
		this.lines.push("Who, like a good and hardy soldier, fought");
		this.lines.push("'Gainst my captivity.--Hail, brave friend!");
		this.lines.push("Say to the King the knowledge of the broil");
		this.lines.push("As thou didst leave it.");
		this.lines.push("");
		this.lines.push("CAPTAIN");
		this.lines.push("Doubtful it stood,");
		this.lines.push("As two spent swimmers that do cling together");
		this.lines.push("And choke their art.The merciless Macdonwald");
		this.lines.push("(Worthy to be a rebel, for to that");
		this.lines.push("The multiplying villainies of nature");
		this.lines.push("Do swarm upon him) from the Western Isles");
		this.lines.push("Of kerns and gallowglasses is supplied;");
		this.lines.push("And Fortune, on his damned quarrel smiling,");
		this.lines.push("Showed like a rebel's whore. But all's too weak;");
		this.lines.push("For brave Macbeth(well he deserves that name),");
		this.lines.push("Disdaining Fortune, with his brandished steel,");
		this.lines.push("Which smoked with bloody execution,");
		this.lines.push("Like Valor's minion, carved out his passage");
		this.lines.push("Till he faced the slave;");
		this.lines.push("Which ne'er shook hands, nor bade farewell to him,");
		this.lines.push("Till he unseamed him from the nave to th' chops,");
		this.lines.push("And fixed his head upon our battlements.");
	}
	
	toggleHighlightVowels(): void {
		
	}
}
