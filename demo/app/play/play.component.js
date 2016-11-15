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
var play_service_1 = require('./play.service');
var PlayComponent = (function () {
    function PlayComponent(playService) {
        this.playService = playService;
        this.mode = 'Observable';
    }
    PlayComponent.prototype.ngOnInit = function () {
        this.getScene();
    };
    PlayComponent.prototype.getScene = function () {
        var _this = this;
        this.playService.getPlay(1, 1)
            .subscribe(function (play) { return _this.play = play; }, function (error) { return _this.errorMessage = error; });
    };
    PlayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'play',
            templateUrl: 'play.component.html',
            providers: [play_service_1.PlayService]
        }), 
        __metadata('design:paramtypes', [play_service_1.PlayService])
    ], PlayComponent);
    return PlayComponent;
}());
exports.PlayComponent = PlayComponent;
//# sourceMappingURL=play.component.js.map