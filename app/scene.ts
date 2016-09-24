import { Speech } from './speech'
import { StageDirections } from './stage-directions'

export class Scene {
    speeches: Speech[];
    characters: String[];
    directions: StageDirections[];
    actNumber: number;
    sceneNumber: number;
    text: string;

    constructor(act: number, scene: number, text: string){
        this.actNumber = act;
        this.sceneNumber = scene;
        this.text = text;
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