import inboxIcon from "../../assets/inbox-icon.svg";
import { Link } from "react-router-dom";

const EmptyNominations = ({ text, size }) => {
	const containerClasses = `bg-white mx-auto text-center py-10 md:px-6 ${size}`;

	return (
		<div className={containerClasses}>
			<img src={inboxIcon} alt="inbox icon" className="block mx-auto mb-7" />
			<h3 className="uppercase text-gray-500 font-bold text-2xl mb-9">
				{text}
			</h3>
			<Link to="/select-nominee">
				<button
					type="button"
					className="bg-black uppercase px-4 py-3 font-Poppins text-xs font-bold text-white hover:text-black hover:bg-white border border-black block mb-7 mx-auto ">
					create new nomination
				</button>
			</Link>
		</div>
	);
};

export default EmptyNominations;
