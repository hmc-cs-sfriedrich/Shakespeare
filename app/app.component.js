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
var core_1 = require("@angular/core");
var play_service_1 = require("./play/play.service");
var actscene_1 = require("./play/objects/actscene");
var play_1 = require("./play/objects/play");
var core_2 = require("@angular/core");
var AppComponent = (function () {
    // Inject PlayService
    function AppComponent(playService) {
        this.playService = playService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.initPlays();
        this.getPlay(this.currentPlay.fileName);
        this.actScenes = [];
        // When the user selects highlight vowels/consonants, have vowels be default
        this.highlightWhat = "vowels";
    };
    // Used for when a user selects a new play from the dropdown
    AppComponent.prototype.loadNewPlay = function () {
        this.getPlay(this.currentPlay.fileName);
    };
    // Hardcode list of plays and arbitrary select first for view
    AppComponent.prototype.initPlays = function () {
        this.plays = [];
        this.plays.push(new play_1.Play("Macbeth", "macbeth"));
        this.plays.push(new play_1.Play("Hamlet", "by-william-shakespeare"));
        this.currentPlay = this.plays[0];
    };
    AppComponent.prototype.getPlay = function (play) {
        var _this = this;
        this.playService.getPlay(play)
            .subscribe(function (play) { return _this.initPlay(play); }, function (error) { return _this.errorMessage = error; });
    };
    // Populate ActScene objects for the dropdown
    AppComponent.prototype.initPlay = function (play) {
        this.play = play;
        var sceneIndex = 0;
        for (var _i = 0, _a = play[0].play.acts; _i < _a.length; _i++) {
            var act = _a[_i];
            for (var _b = 0, _c = act.scenes; _b < _c.length; _b++) {
                var scene = _c[_b];
                this.actScenes.push(new actscene_1.ActScene(act.actNumber, scene.sceneNumber, sceneIndex));
                sceneIndex++;
            }
        }
        this.currentActScene = this.actScenes[0];
    };
    // Feature Checkbox variables //////////////////////////////////////
    AppComponent.prototype.toggleCountSyllables = function () {
        this.countSyllables = !this.countSyllables;
    };
    AppComponent.prototype.toggleDisplayScansion = function () {
        this.displayScansion = !this.displayScansion;
    };
    AppComponent.prototype.toggleHighlight = function () {
        this.highlight = !this.highlight;
    };
    ///////////////////////////////////////////////////////////////////
    AppComponent.prototype.toPreviousScene = function () {
        // Only attempt to navigate back a scene if NOT at first scene in first act
        if (this.currentActScene.sceneIndex != 0) {
            this.currentActScene = this.actScenes[this.currentActScene.sceneIndex - 1];
        }
    };
    AppComponent.prototype.toNextScene = function () {
        // Only attempt to navigate forward a scene if NOT at last scene in last act
        if (this.currentActScene.sceneIndex < this.actScenes.length - 1) {
            this.currentActScene = this.actScenes[this.currentActScene.sceneIndex + 1];
        }
    };
    // Currently a naive implementation
    AppComponent.prototype.isVowel = function (char) {
        var c = char.toLowerCase();
        return (c == "a") || (c == "e") || (c == "i") || (c == "o") || (c == "u");
    };
    // Currently a naive implementation
    AppComponent.prototype.isConsonant = function (char) {
        var c = char.toLowerCase();
        return (c == "b") ||
            (c == "c") ||
            (c == "d") ||
            (c == "f") ||
            (c == "g") ||
            (c == "h") ||
            (c == "j") ||
            (c == "k") ||
            (c == "l") ||
            (c == "m") ||
            (c == "n") ||
            (c == "p") ||
            (c == "q") ||
            (c == "r") ||
            (c == "s") ||
            (c == "t") ||
            (c == "v") ||
            (c == "w") ||
            (c == "x") ||
            (c == "y") ||
            (c == "z");
    };
    // Converts numerals from 1-10 into Roman numerals
    AppComponent.prototype.roman = function (num) {
        var conversions = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X" };
        return conversions[num];
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
        styleUrls: ['app/app.component.css'],
        providers: [play_service_1.PlayService]
    }),
    core_2.Injectable(),
    __metadata("design:paramtypes", [play_service_1.PlayService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map