import { useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
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
	const isSmallScreen = useMediaQuery({ maxWidth: 767 });

	return (
		<>
			{isSmallScreen && (
				<div className="sticky bottom-0 bg-white p-4 shadow-2xl shadow-black">
					<Link to={route}>
						<button
							className="bg-black text-white p-3 text-sm font-bold uppercase w-full font-Poppins hover:bg-white hover:border-2 hover:text-black hover:border-black transition-all"
							onClick={handleClick}>
							{buttonText}
						</button>
					</Link>
				</div>
			)}
		</>
	);
};

Buttons.propTypes = {
	initialRoute: PropTypes.string,
	initialText: PropTypes.string,
};

export default Buttons;
