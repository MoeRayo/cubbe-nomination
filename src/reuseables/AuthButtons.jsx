import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Buttons = ({
	route,
	onSuccess,
	buttonText = "Get started",
	buttonAction = "button",
}) => {
	const [buttonTextState, setButtonTextState] = useState(buttonText);

	const handleClick = () => {
		const newText = "";

		setButtonTextState(newText);
		onSuccess();
	};

	return (
		<Link to={route}>
			<button
				className="hidden md:block m-auto bg-black my-5 text-white px-4 w-[40%] py-3 text-sm font-bold uppercase font-Poppins hover:bg-white hover:border-2 hover:border-black hover:text-black transition-all"
				onClick={handleClick}
				type={buttonAction}>
				{buttonTextState}
			</button>
		</Link>
	);
};

Buttons.propTypes = {
	route: PropTypes.string,
	buttonText: PropTypes.string,
	buttonAction: PropTypes.oneOf(["submit", "reset", "button"]),
	onSuccess: PropTypes.func,
};

export default Buttons;
