export class Line {
    words: string;
    syllableCount: number;
    lineNumber: number;

    constructor(words: string, syllableCount: number, lineNumber: number){
        this.words = words;
        this.syllableCount = syllableCount;
        this.lineNumber = lineNumber;
    }

    countSyllables(): void{
        // Basic syllable counting algorithm
        let words = this.words.toLowerCase(); 
        if(words.length <= 3) { 
            this.syllableCount = 1; 
        }

        words = words.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        words = words.replace(/^y/, '');
        
        this.syllableCount =  words.match(/[aeiouy]{1,2}/g).length;
    }

    getWords(): string{
        return this.words;
    }

    getSyllableCount(): number{
        return this.syllableCount;
    }

    getLineNumber(): number{
        return this.lineNumber;
    }
}