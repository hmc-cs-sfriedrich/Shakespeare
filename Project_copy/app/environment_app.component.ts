import {Component} from "angular2/core";
import {Http, Response} from 'angular2/http';
import 'rxjs/add/operator/map';
@Component({
    selector: 'http',
    template: '<h2> Hello world!! {{result}}</h2>'//templateUrl: '../index.html'
})

export class HttpSample {
    public result: Object;
    constructor(http: Http) {
        this.result = {};
        http.get('./app/heroes.json').map((res: Response) => res.json()).subscribe(res => this.result = res, err => console.error(err));
    }
}
