import { Component } from '@angular/core';
import { Line } from './line';
import { Speech } from './speech';

@Component({
  selector: 'page',
  template: '<h2>I AM BANANA</h2>'
})

export class Page {
    lines: Line[];
    speeches: Speech[];
    firstLineNumber: number;

    getLines(): Line[]{
        return this.lines;
    }

    getSpeeches(): Speech[]{
        return this.speeches;
    }
}