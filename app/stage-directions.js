"use strict";
var StageDirections = (function () {
    function StageDirections() {
    }
    StageDirections.prototype.getCharacters = function () {
        return this.characters;
    };
    StageDirections.prototype.getDirections = function () {
        return this.directions;
    };
    StageDirections.prototype.getLineNumBefore = function () {
        return this.lineNumBefore;
    };
    StageDirections.prototype.getLineNumAfter = function () {
        return this.lineNumAfter;
    };
    return StageDirections;
}());
exports.StageDirections = StageDirections;
//# sourceMappingURL=stage-directions.js.map