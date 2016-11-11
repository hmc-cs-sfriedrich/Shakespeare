import { Scene } from './scene';

export class Act{
    scenes: Scene[];
    actNumber: number;

    getScenes(): Scene[]{
        return this.scenes;
    }

    getActNumber(): number{
        return this.actNumber;
    }
}