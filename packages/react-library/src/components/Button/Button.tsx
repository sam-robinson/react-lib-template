import React, { useRef } from "react";
import { observer } from "mobx-react";
import { ButtonVM } from "./ButtonVM";
import "./button.scss";

const ButtonComponent = () => {
	// create a view-model that will persist for the lifetime of the component
	const vm = useRef(new ButtonVM()).current;

	return (
		<button className="test-button" onClick={vm.handleClick}>
			Clicked {vm.clickCount} Times
		</button>
	);
};

// export a ButtonComponent wrapped in observer - whenever the clickCount is changed, ButtonComponent will be re-rendered
export const Button = observer(ButtonComponent);
