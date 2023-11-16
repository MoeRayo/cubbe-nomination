import lgselectNominee from "../../assets/lg-select-nominee.png";
import smselectNominee from "../../assets/sm-select-nominee.png";
import { useMediaQuery } from "react-responsive";
import SelectNomineeDropdown from "./SelectNomineeDropdown";
// import { fetchCubeAcademyRetrieveNomineeList } from "../../api/nominationsComponents";
const SelectNominee = () => {
	const isSmallScreen = useMediaQuery({ maxWidth: 370 });
	// const { data } = fetchCubeAcademyRetrieveNomineeList();
	return (
		<div className="md:w-[50%] m-auto md:my-10">
			<div className="md:py-8 md:bg-white bg-black">
				<div className="bg-black md:bg-white">
					<img
						src={isSmallScreen ? smselectNominee : lgselectNominee}
						alt="image of people at work"
						className="m-auto"
					/>
				</div>
			</div>

			<section className="py-3 px-6 bg-white flex-1">
				<div className="w-[90%] mx-auto">
					<h2 className="uppercase font-Poppins font-bold text-2xl ">
						I’d like to nominate...
					</h2>
					<p className="font-AnonymousPro mt-4 mb-5 leading-6 text-base md:w-[80%]">
						Please select a cube who you feel has done something honourable this
						month or just all round has a great work ethic.
					</p>

					<h3 className="font-bold font-Poppins text-sm">
						<span className="text-red-500lo">*</span> Cube’s name
					</h3>
					<SelectNomineeDropdown />
				</div>
			</section>
		</div>
	);
};

export default SelectNominee;
