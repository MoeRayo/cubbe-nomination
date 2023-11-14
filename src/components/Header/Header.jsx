import cubelogo from "../../assets/3sc-logo.svg";

const Header = () => {
	return (
		<header className="bg-black flex justify-between items-center px-4">
			<img src={cubelogo} alt="" className="block" />
			<p className="text-white underline body-font font-AnonymousPro">
				Your nominations ()
			</p>
		</header>
	);
};

export default Header;
