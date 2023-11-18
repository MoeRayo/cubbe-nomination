import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import lgNominationSubmission from "../../assets/lg-nomination-submission-image.png";
import smNominationSubmission from "../../assets/sm-nomination-submission-image.png";

const NominationSubmission = () => {
	const isSmallScreen = useMediaQuery({ maxWidth: 370 });

	const location = useLocation();
	console.log("c", location);

	return (
		<div className="md:w-[50%] m-auto md:my-10 relative">
			<div className="bg-black md:bg-white">
				<img
					src={isSmallScreen ? smNominationSubmission : lgNominationSubmission}
					alt="image of people at work"
					className="m-auto"
				/>
			</div>

			<section className="py-3 px-6 bg-white flex-1">
				<div className="mx-auto text-center">
					<h2 className="uppercase font-Poppins font-bold my-4 text-2xl">
						NOMINATION SUBMITTED
					</h2>
					<p className="font-AnonymousPro mt-4 mb-5 leading-6 text-base">
						Thank you for taking the time to fill out this form! Why not
						nominate another cube?
					</p>
				</div>

				<div className="flex flex-col md:flex-row justify-center  space-x-3 my-7">
					<Link to="/view-nominations">
						<button className=" border-2 text-xs text-black hover:text-white hover:bg-black uppercase border-black font-Poppins font-bold py-3 px-2 block lg:w-56 md:w-28 w-full">
							view nomination
						</button>
					</Link>
					<Link to="/select-nominee">
						<button className=" border-2 text-xs text-black hover:text-white hover:bg-black  uppercase border-black font-Poppins font-bold py-3 px-2 block lg:w-56 md:w-28 w-full">
							create new nominations
						</button>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default NominationSubmission;
