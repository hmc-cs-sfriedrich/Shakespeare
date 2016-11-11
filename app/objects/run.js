"use strict";
var Run = (function () {
    function Run() {
    }
    Run.prototype.getRunNumber = function () {
        return this.runNumber;
    };
    Run.prototype.getAccented = function () {
        return this.accented;
    };
    Run.prototype.getText = function () {
        return this.text;
    };
    return Run;
}());
exports.Run = Run;
//# sourceMappingURL=run.js.map