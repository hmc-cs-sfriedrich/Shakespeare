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
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <p>\n\t{{lines[0]}} <br>\n\tThis is the sergeant <br>\n    Who, like a good and hardy soldier, fought <br>\n    'Gainst my captivity.--Hail, brave friend! <br>\n    Say to the King the knowledge of the broil <br>\n    As thou didst leave it. <br><br>\n\n    CAPTAIN <br>\n\tDoubtful it stood, <br>\n    As two spent swimmers that do cling together <br>\n    And choke their art.The merciless Macdonwald <br>\n    (Worthy to be a rebel, for to that <br>\n    The multiplying villainies of nature <br>\n    Do swarm upon him) from the Western Isles <br>\n    Of kerns and gallowglasses is supplied; <br>\n    And Fortune, on his damned quarrel smiling, <br>\n    Showed like a rebel's whore. But all's too weak; <br>\n    For brave Macbeth(well he deserves that name), <br>\n    Disdaining Fortune, with his brandished steel, <br>\n    Which smoked with bloody execution, <br>\n    Like Valor's minion, carved out his passage <br>\n    Till he faced the slave; <br>\n    Which ne'er shook hands, nor bade farewell to him, <br>\n    Till he unseamed him from the nave to th' chops, <br>\n    And fixed his head upon our battlements. <br>\n    </p>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map