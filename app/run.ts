export class Run {
	runNumber: number;
	accented: boolean;
	text: string;

	getRunNumber(): number {
		return this.runNumber;
	}
	
	getAccented(): boolean {
		return this.accented;
	}
	
	getText(): string {
		return this.text;
	}
}