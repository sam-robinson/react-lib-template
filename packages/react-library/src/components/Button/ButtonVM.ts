import { action, observable } from "mobx";

export class ButtonVM {
	@observable clickCount = 0;

	@action.bound handleClick() {
		this.clickCount++;
	}

	// test compilation of loading .json modules
	async loadData() {
		return (await import("./api/data.json")).default;
	}
}
