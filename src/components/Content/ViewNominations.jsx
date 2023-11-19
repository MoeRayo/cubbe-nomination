import { useState, useEffect } from "react";
import {} from "react";
import { fetchCubeAcademyGetAllNominations } from "../../api/nominationsComponents";
import { getAuthToken } from "../../utils/authHelper";
import ClosedNominations from "./ClosedNominations";
import CurrentNominations from "./CurrentNominations";
import EmptyNominations from "./EmptyNominations";

const ViewNominations = () => {
	const [allNominations, setAllNominations] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchCubeAcademyGetAllNominations({
					headers: {
						Authorization: `Bearer ${getAuthToken()}`,
					},
				});

				setAllNominations(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const currentDate = new Date();

	const dataWithStatus = allNominations.map((nomination) => {
		const closingDate = new Date(nomination.closing_date);

		closingDate.setHours(23, 59, 59, 999);

		return {
			...nomination,
			isClosed: currentDate > closingDate,
		};
	});

	let nominations = dataWithStatus;

	const [selectedStatus, setSelectedStatus] = useState(false);

	console.log("nnn", nominations);

	const currentNominations = nominations.filter(
		(nomination) => nomination.isClosed === false
	);
	const closedNominations = nominations.filter(
		(nomination) => nomination.isClosed === true
	);

	const handleStatusChange = (status) => {
		setSelectedStatus(status);
	};
	if (!nominations || nominations.length === 0) {
		console.log("cucuc");

		return (
			<EmptyNominations
				size="w-[70%] my-10"
				text="once you submit a nomination, you will be able to view and edit it here."
			/>
		);
	}

	return (
		<div className="md:w-[50%] mx-auto  py-10 ">
			<div>
				<h2 className="uppercase font-Poppins font-bold text-2xl mb-4">
					your nominations
				</h2>
				<div className="flex space-x-4 font-AnonymousPro text-xs font-bold">
					<button
						onClick={() => handleStatusChange(false)}
						className={`py-2 px-4 ${
							selectedStatus === false
								? "bg-white text-black shadow-md "
								: "bg-green-500 opacity-75 text-white"
						}`}>
						Current
					</button>
					<button
						onClick={() => handleStatusChange(true)}
						className={`py-2 px-4 ${
							selectedStatus === true
								? "bg-white text-black"
								: "bg-green-500 opacity-75 text-white"
						}`}>
						Closed
					</button>
				</div>
			</div>
			<div className="mt-8">
				{selectedStatus === false && (
					<CurrentNominations nominations={currentNominations} />
				)}
				{selectedStatus === true && (
					<ClosedNominations nominations={closedNominations} />
				)}
			</div>
		</div>
	);
};

export default ViewNominations;
