import { APIBase } from "@/core/api";

export interface ISomeData {
	name: string;
	id: number;
}

export interface ISampleAPI {
	getSomeData(): Promise<ISomeData[]>;
}

export class SampleAPI extends APIBase implements ISampleAPI {
	async getSomeData() {
		const response = (await this.httpGet("some/data/endpoint")) as ISomeData[];

		// do any post-processing necessary here

		return response;
	}
}
