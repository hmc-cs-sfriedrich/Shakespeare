"use strict";
var Line = (function () {
    function Line(words, character, syllableCount, lineNumber) {
        this.words = words;
        this.character = character;
        this.syllableCount = syllableCount;
        this.lineNumber = lineNumber;
    }
    Line.prototype.countSyllables = function () {
        // Basic syllable counting algorithm
        var words = this.words.toLowerCase();
        if (words.length <= 3) {
            this.syllableCount = 1;
        }
    };
    Line.prototype.getSyllables = function () {
        return this.syllables;
    };
    Line.prototype.getLineText = function () {
        return this.lineText;
    };
    Line.prototype.getLineNumber = function () {
        return this.lineNumber;
    };
    return Line;
}());
exports.Line = Line;
//# sourceMappingURL=line.js.map