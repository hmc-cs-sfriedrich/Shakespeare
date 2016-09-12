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
var AppComponent = (function () {
    function AppComponent() {
        this.lines = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.lines.push("MALCOLM");
        this.lines.push("This is the sergeant");
        this.lines.push("Who, like a good and hardy soldier, fought");
        this.lines.push("'Gainst my captivity.--Hail, brave friend!");
        this.lines.push("Say to the King the knowledge of the broil");
        this.lines.push("As thou didst leave it.");
        this.lines.push("");
        this.lines.push("CAPTAIN");
        this.lines.push("Doubtful it stood,");
        this.lines.push("As two spent swimmers that do cling together");
        this.lines.push("And choke their art.The merciless Macdonwald");
        this.lines.push("(Worthy to be a rebel, for to that");
        this.lines.push("The multiplying villainies of nature");
        this.lines.push("Do swarm upon him) from the Western Isles");
        this.lines.push("Of kerns and gallowglasses is supplied;");
        this.lines.push("And Fortune, on his damned quarrel smiling,");
        this.lines.push("Showed like a rebel's whore. But all's too weak;");
        this.lines.push("For brave Macbeth(well he deserves that name),");
        this.lines.push("Disdaining Fortune, with his brandished steel,");
        this.lines.push("Which smoked with bloody execution,");
        this.lines.push("Like Valor's minion, carved out his passage");
        this.lines.push("Till he faced the slave;");
        this.lines.push("Which ne'er shook hands, nor bade farewell to him,");
        this.lines.push("Till he unseamed him from the nave to th' chops,");
        this.lines.push("And fixed his head upon our battlements.");
    };
    AppComponent.prototype.toggleHighlightVowels = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            styleUrls: ['app/app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map