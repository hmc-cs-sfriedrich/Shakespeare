"use strict";
var Line = (function () {
    function Line(words, lineNumber) {
        this.words = words;
        this.syllableCount = -1;
        this.lineNumber = lineNumber;
    }
    Line.prototype.countSyllables = function () {
        // Basic syllable counting algorithm
        var words = this.words.toLowerCase();
        if (words.length <= 3) {
            this.syllableCount = 1;
        }
        words = words.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        words = words.replace(/^y/, '');
        this.syllableCount = words.match(/[aeiouy]{1,2}/g).length;
    };
    Line.prototype.getWords = function () {
        return this.words;
    };
    Line.prototype.getSyllableCount = function () {
        return this.syllableCount;
    };
    Line.prototype.getLineNumber = function () {
        return this.lineNumber;
    };
    return Line;
}());
exports.Line = Line;
//# sourceMappingURL=line.js.map