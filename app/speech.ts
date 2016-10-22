import { Line } from './line'

export class Speech{
    lines: Line[];
    character: string;

    getLines(): Line[]{
        return this.lines;
    }

    getCharacter(): string{
        return this.character;
    }
}