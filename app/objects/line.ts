import { Run } from './run'

export class Line {
    words: string;
    character: string;
    syllableCount: number;
    lineText: string;
    syllables: number;
    lineNumber: number;

    constructor(words: string, character: string, syllableCount: number, lineNumber: number){
        this.words = words;
        this.character = character;
        this.syllableCount = syllableCount;
        this.lineNumber = lineNumber;
    }

    countSyllables(): void{
        // Basic syllable counting algorithm
        let words = this.words.toLowerCase(); 
        if(words.length <= 3) { 
            this.syllableCount = 1; 
        }
    }

    getSyllables(): number {
		return this.syllables;
	}


    getLineText(): string{
        return this.lineText;
    }

    getLineNumber(): number{
        return this.lineNumber;
    }
}