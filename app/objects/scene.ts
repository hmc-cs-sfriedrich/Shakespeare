import { Speech } from './speech'

export class Scene {
    speeches: Speech[];
    sceneNumber: number;

    getSpeeches(): Speech[]{
        return this.speeches;
    }

    getSceneNumber(): number{
        return this.sceneNumber;
    }
}