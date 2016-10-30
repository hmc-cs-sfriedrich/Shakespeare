import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'play',
  templateUrl: '/app/toh/play.component.html',
})
export class PlayComponent implements OnInit {
  ngOnInit() { this.getPlay(); }
  
  let playUrl = 'app/macbethNew.json';

  getPlay() {
    console.log("getPlay()");
	let req = new XMLHttpRequest();
	req.open("GET", this.playUrl, false);
	req.send(null)
	// req.responseType = "text";
	console.log(req.responseText);
	let playJSON = JSON.parse(req.responseText);
	console.log("!!!!!")
	console.log(playJSON.play.acts[0].scenes[0].speeches[0].lines[0].runs[0].text)
  }
}