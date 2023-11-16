import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Buttons = ({ initialRoute = "/Signup", initialText = "Get started" }) => {
	const [route, setRoute] = useState(initialRoute);
	const [buttonText, setButtonText] = useState(initialText);

	const handleClick = () => {
		const newRoute = "";
		const newText = "";

		setRoute(newRoute);
		setButtonText(newText);
	};

	return (
		<Link to={route}>
			<button
				className="hidden md:block m-auto bg-black my-5 text-white px-4 w-[40%] py-3 text-sm font-bold uppercase font-Poppins hover:bg-white hover:border-2 hover:border-black hover:text-black transition-all"
				onClick={handleClick}>
				{buttonText}
			</button>
		</Link>
	);
};

Buttons.propTypes = {
	initialRoute: PropTypes.string,
	initialText: PropTypes.string,
};

export default Buttons;
