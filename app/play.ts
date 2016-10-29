import { Act } from './act';

export class Play {
    acts: Act[];
    title: string;

    getActs(): Act[]{
        return this.acts;
    }

    getTitle(): string{
        return this.title;
    }
}