import { Act } from './act';

export class Play {
    acts: Act[];
    title: string;
    year: number;

    getActs(): Act[]{
        return this.acts;
    }

    getTitle(): string{
        return this.title;
    }

    getYear(): number{
        return this.year;
    }
}