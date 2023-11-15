import { Link } from "react-router-dom";

const Buttons = () => {
	return (
		<Link to="/nominations">
			<button className="hidden md:block m-auto bg-black my-5 text-white px-4 w-[40%] py-3 text-sm font-bold uppercase font-Poppins hover:bg-white hover:border-2 hover:border-black hover:text-black transition-all">
				Get started
			</button>
		</Link>
	);
};
370;

export default Buttons;
