"use strict";
var Play = (function () {
    function Play() {
    }
    Play.prototype.getActs = function () {
        return this.acts;
    };
    Play.prototype.getTitle = function () {
        return this.title;
    };
    Play.prototype.getYear = function () {
        return this.year;
    };
    return Play;
}());
exports.Play = Play;
//# sourceMappingURL=play.js.map