export class Line {
    words: string[];
    syllableCount: number;
    lineNumber: number;

    countSyllables(): void{
        //this.syllableCount = ;
    }

    getWords(): string[]{
        return this.words;
    }

    getSyllableCount(): number{
        return this.syllableCount;
    }

    getLineNumber(): number{
        return this.lineNumber;
    }
}