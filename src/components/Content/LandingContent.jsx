import { useMediaQuery } from "react-responsive";
import lglandingImage from "../../assets/lg-landing-image.png";
import smlandingImage from "../../assets/sm-landing-image.png";
import { Link } from "react-router-dom";

const LandingContent = () => {
	const isSmallScreen = useMediaQuery({ maxWidth: 370 });

	return (
		<div className="md:w-[42%] m-auto md:my-10 text-center flex flex-col">
			<img
				src={isSmallScreen ? smlandingImage : lglandingImage}
				alt="image of people at work"
				className="m-auto"
			/>
			<section className="pt-7 md:px-6 bg-white flex-1">
				<h2 className="uppercase font-Poppins font-bold text-2xl">
					CUBE OF THE MONTH NOMINATIONS
				</h2>
				<p className="font-AnonymousPro mt-4 mb-5 px-3 leading-6 text-base md:w-[80%] md:mx-auto">
					At cube we’re passionate about recognising the great work that our
					cubes do. Each month one of our cubes is crowned cube of the month
					👑⭐. Please nominate who you think deserves this months title.
				</p>

				<Link to="/Signin">
					<div
						className={`bg-white ${
							isSmallScreen
								? "shadow-2xl m-0 shadow-black sticky bottom-0 p-2"
								: ""
						}`}>
						<button className="border-2 md:block m-auto bg-black my-1 w-full text-white px-4 md:w-[40%] py-3 text-sm font-bold uppercase font-Poppins hover:bg-white hover:border-black hover:text-black transition-all">
							Get started
						</button>
					</div>
				</Link>
			</section>
		</div>
	);
};

export default LandingContent;
