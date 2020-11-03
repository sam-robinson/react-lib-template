import { action, observable } from "mobx";

export class ButtonVM {
	@observable clickCount = 0;

	@action.bound handleClick() {
		this.clickCount++;
	}
}
