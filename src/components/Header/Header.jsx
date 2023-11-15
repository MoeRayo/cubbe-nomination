import cubelogo from "../../assets/3sc-logo.svg";
import folder from "../../assets/folder.svg";
import emblem from "../../assets/emblem.svg";
import plus from "../../assets/plus.svg";

const Header = () => {
	return (
		<header className="bg-black flex justify-between items-center px-5 py-4 md:py-0">
			<img src={cubelogo} alt="" className="hidden md:block" />
			<img src={emblem} alt="" className="block md:hidden" />
			<div>
				<img
					src={plus}
					alt=""
					className="inline-block md:hidden mr-3 cursor-pointer"
				/>
				<img
					src={folder}
					alt=""
					className="inline-block md:hidden cursor-pointer"
				/>
			</div>
			<p className="text-white underline text-xs font-AnonymousPro hidden md:block">
				Your nominations ()
			</p>
		</header>
	);
};

export default Header;
