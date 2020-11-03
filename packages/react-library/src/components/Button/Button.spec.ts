import { ButtonVM } from "./ButtonVM";

describe("button logic test", () => {
	const vm = new ButtonVM();
	it("should increment the count", () => {
		const current = vm.clickCount;
		vm.handleClick();
		expect(vm.clickCount).toBe(current + 1);
	});
});
