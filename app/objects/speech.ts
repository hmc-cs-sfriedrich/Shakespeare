import { Line } from './line'

export class Speech{
    lines: Line[];
	speechNumber: number;
    character: string;

    getLines(): Line[]{
        return this.lines;
    }

    getCharacter(): string{
        return this.character;
    }
	
	getSpeechNumber(): number {
		return this.speechNumber;
	}
}