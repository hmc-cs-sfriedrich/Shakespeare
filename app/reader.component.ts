import { Component } from '@angular/core';
import { Scene } from './scene';

@Component({
  selector: 'reader',
  templateUrl: 'app/reader.component.html'
})

export class Reader {
    activeScene: Scene;

    getScene(): Scene{
        return this.activeScene;
    }
}