// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import './rxjs-operators';

@Injectable()
export class PlayService {
  
  private scene: number;
  private act: number;

  constructor (private http: Http) {}

  // Retrieves the json for a specific play
  getPlay (play: string): Observable<string> {
    let playUrl = "app/" + play + ".json";
    return this.http.get(playUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  // Returns a surface-level error message
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}