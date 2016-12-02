"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Observable Version
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('./rxjs-operators');
var PlayService = (function () {
    function PlayService(http) {
        this.http = http;
    }
    // Retrieves the json for a specific play
    PlayService.prototype.getPlay = function (play) {
        var playUrl = "app/" + play + ".json";
        return this.http.get(playUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PlayService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    // Returns a surface-level error message
    PlayService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    PlayService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlayService);
    return PlayService;
}());
exports.PlayService = PlayService;
//# sourceMappingURL=play.service.js.map