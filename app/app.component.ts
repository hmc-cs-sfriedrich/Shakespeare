import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <p>
	{{lines[0]}} <br>
	This is the sergeant <br>
    Who, like a good and hardy soldier, fought <br>
    'Gainst my captivity.--Hail, brave friend! <br>
    Say to the King the knowledge of the broil <br>
    As thou didst leave it. <br><br>

    CAPTAIN <br>
	Doubtful it stood, <br>
    As two spent swimmers that do cling together <br>
    And choke their art.The merciless Macdonwald <br>
    (Worthy to be a rebel, for to that <br>
    The multiplying villainies of nature <br>
    Do swarm upon him) from the Western Isles <br>
    Of kerns and gallowglasses is supplied; <br>
    And Fortune, on his damned quarrel smiling, <br>
    Showed like a rebel's whore. But all's too weak; <br>
    For brave Macbeth(well he deserves that name), <br>
    Disdaining Fortune, with his brandished steel, <br>
    Which smoked with bloody execution, <br>
    Like Valor's minion, carved out his passage <br>
    Till he faced the slave; <br>
    Which ne'er shook hands, nor bade farewell to him, <br>
    Till he unseamed him from the nave to th' chops, <br>
    And fixed his head upon our battlements. <br>
    </p>
    `
})

export class AppComponent implements OnInit {
	lines: string[];
	
	constructor() {
		this.lines = [];
	}

	ngOnInit(): void {
		this.lines.push("MALCOLM");
	}
}
