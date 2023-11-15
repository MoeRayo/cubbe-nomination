import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
const Buttons = () => {
	const isSmallScreen = useMediaQuery({ maxWidth: 767 });

	return (
		<>
			{isSmallScreen && (
				<div className="sticky bottom-0 bg-white p-4 shadow-2xl shadow-black">
					<Link to="/nominations">
						<button className="bg-black text-white p-3 text-sm font-bold uppercase w-full font-Poppins hover:bg-white hover:border-2 hover:text-black hover:border-black transition-all">
							Get started
						</button>
					</Link>
				</div>
			)}
		</>
	);
};

export default Buttons;
