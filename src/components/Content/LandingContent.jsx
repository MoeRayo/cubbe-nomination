import { useMediaQuery } from "react-responsive";
import lglandingImage from "../../assets/lg-landing-image.png";
import smlandingImage from "../../assets/sm-landing-image.png";
import LargeScreenButtons from "../../reuseables/LargeScreenButtons";

const LandingContent = () => {
	const isSmallScreen = useMediaQuery({ maxWidth: 370 });

	return (
		<div className="md:w-[42%] m-auto md:my-10  text-center flex flex-col">
			<img
				src={isSmallScreen ? smlandingImage : lglandingImage}
				alt="image of people busy"
				className="m-auto"
			/>
			<section className="py-7 px-6 bg-white flex-1 relative">
				<h2 className="uppercase font-Poppins font-bold text-2xl">
					CUBE OF THE MONTH NOMINATIONS
				</h2>
				<p className="font-AnonymousPro mt-4 mb-5 leading-6 text-base md:w-[80%] md:mx-auto">
					At cube we’re passionate about recognising the great work that our
					cubes do. Each month one of our cubes is crowned cube of the month
					👑⭐. Please nominate who you think deserves this months title.
				</p>
				<LargeScreenButtons />
			</section>
		</div>
	);
};

export default LandingContent;
