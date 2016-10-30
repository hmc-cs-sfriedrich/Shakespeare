import { Run } from './run'

export class Line {
    lineText: string;
    syllables: number;
    lineNumber: number;
	runs: Run[];

    getSyllables(): number {
		return this.syllables;
	}

    getLineText(): string{
        return this.lineText;
    }

   getRuns(): Run[] {
		return this.runs;
   }

    getLineNumber(): number{
        return this.lineNumber;
    }
}