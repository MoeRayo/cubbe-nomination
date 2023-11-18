import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import lgselectNominee from "../../assets/lg-select-nominee.png";
import smselectNominee from "../../assets/sm-select-nominee.png";
import { useMediaQuery } from "react-responsive";
import SelectNomineeDropdown from "./SelectNomineeDropdown";
import { getAuthToken } from "../../utils/authHelper";
import { useHistory } from "react-router-dom";
import { fetchCubeAcademyRetrieveNomineeList } from "../../api/nominationsComponents";

const SelectNominee = () => {
	const isSmallScreen = useMediaQuery({ maxWidth: 370 });
	const [nominees, setNominees] = useState([]);
	const history = useHistory();
	const location = useLocation();
	const nominationReason = location.state?.nominationReason;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchCubeAcademyRetrieveNomineeList({
					headers: {
						Authorization: `Bearer ${getAuthToken()}`,
					},
				});

				setNominees(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const onSubmit = (data) => {
		const selectedNominee = JSON.parse(data.nominee);

		console.log("Selected Nominee:", selectedNominee);

		history.push("/nomination-reason", { selectedNominee, nominationReason });
	};

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

			<section className="py-3 px-6 bg-white flex-1 relative">
				<div className="w-[90%] mx-auto">
					<h2 className="uppercase font-Poppins font-bold text-2xl ">
						I’d like to nominate...
					</h2>
					<p className="font-AnonymousPro mt-4 mb-5 leading-6 text-base">
						Please select a cube who you feel has done something honourable this
						month or just all round has a great work ethic.
					</p>

					<SelectNomineeDropdown nominees={nominees} onSubmit={onSubmit} />
				</div>
			</section>
		</div>
	);
};

export default SelectNominee;
