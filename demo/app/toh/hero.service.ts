// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Hero }           from './hero';
import { Observable }     from 'rxjs/Observable';
import { Play } from '../../../app/play';

@Injectable()
export class HeroService {
  private heroesUrl = '../macbeth.json';  // URL to web API

  constructor (private http: Http) {}

  getHeroes (): Observable<Hero[]> { //Will become list of Scenes instead 
    return this.http.get(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

/*
  getHeroes (): Observable<Play> {  
    return this.http.get(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
*/
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { }; // Change to parse our json (from .docx) file
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/