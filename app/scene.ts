import { Speech } from './speech'
import { StageDirections } from './stage-directions'
import { Line } from './line'

export class Scene {
    speeches: Speech[];
    characters: String[];
    directions: StageDirections[];
    actNumber: number;
    sceneNumber: number;
    lines: Line[];

    constructor(act: number, scene: number, lines: Line[]){
        this.actNumber = act;
        this.sceneNumber = scene;
        this.lines = lines;
    }

    getSpeeches(): Speech[]{
        return this.speeches;
    }

    getCharacters(): String[]{
        return this.characters;
    }

    getDirections(): StageDirections[]{
        return this.directions;
    }

    getSceneNumber(): number{
        return this.sceneNumber;
    }

    getActNumber(): number{
        return this.actNumber;
    }
}