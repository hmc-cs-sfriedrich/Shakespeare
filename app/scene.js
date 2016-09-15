"use strict";
var Scene = (function () {
    function Scene() {
    }
    Scene.prototype.getSpeeches = function () {
        return this.speeches;
    };
    Scene.prototype.getCharacters = function () {
        return this.characters;
    };
    Scene.prototype.getDirections = function () {
        return this.directions;
    };
    Scene.prototype.getSceneNumber = function () {
        return this.sceneNumber;
    };
    return Scene;
}());
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map