import { useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Buttons = ({
	route,
	onSuccess,
	buttonAction = "button",
	buttonText = "Get started",
}) => {
	const [buttonTextState, setButtonTextState] = useState(buttonText);

	const handleClick = () => {
		const newText = "";

		setButtonTextState(newText);
		onSuccess();
	};
	const isSmallScreen = useMediaQuery({ maxWidth: 767 });

	return (
		<>
			{isSmallScreen && (
				<div className="sticky bottom-0 bg-white p-4 shadow-2xl shadow-black">
					<Link to={route}>
						<button
							className="bg-black text-white p-3 text-sm font-bold uppercase w-full font-Poppins hover:bg-white hover:border-2 hover:text-black hover:border-black transition-all"
							type={buttonAction}
							onClick={handleClick}>
							{buttonTextState}
						</button>
					</Link>
				</div>
			)}
		</>
	);
};

Buttons.propTypes = {
	route: PropTypes.string,
	buttonText: PropTypes.string,
	buttonAction: PropTypes.oneOf(["submit", "reset", "button"]),
	onSuccess: PropTypes.func,
};

export default Buttons;
