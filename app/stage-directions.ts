export class StageDirections{
    characters: string[];
    directions: string;
    lineNumBefore: number;
    lineNumAfter: number;

    getCharacters(): string[]{
        return this.characters;
    }

    getDirections(): string{
        return this.directions;
    }

    getLineNumBefore(): number{
        return this.lineNumBefore;
    }

    getLineNumAfter(): number{
        return this.lineNumAfter;
    }
}