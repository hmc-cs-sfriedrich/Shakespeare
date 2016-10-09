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
var core_1 = require('@angular/core');
var scene_1 = require('./scene');
var Dropdown = (function () {
    function Dropdown() {
        this.scenes = [];
        var act1scene1 = new scene_1.Scene(1, 1, "THIS IS ACT 1 SCENE 1");
        this.scenes.push(act1scene1);
        this.sceneToDisplay = act1scene1;
        var act1scene2 = new scene_1.Scene(1, 2, "THIS IS ACT 1 SCENE 2");
        this.scenes.push(act1scene2);
        var act2scene1 = new scene_1.Scene(2, 1, "THIS IS ACT 2 SCENE 1");
        this.scenes.push(act2scene1);
        var act2scene2 = new scene_1.Scene(2, 2, "THIS IS ACT 2 SCENE 2");
        this.scenes.push(act2scene2);
    }
    Dropdown.prototype.update = function (scene) {
        console.log('Hello????');
        this.displaySceneNumber = scene.sceneNumber;
    };
    Dropdown = __decorate([
        core_1.Component({
            selector: 'dropdown',
            templateUrl: 'app/dropdown.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], Dropdown);
    return Dropdown;
}());
exports.Dropdown = Dropdown;
//# sourceMappingURL=dropdown.component.js.map