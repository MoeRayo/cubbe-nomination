import { useState, useEffect } from "react";
import { fetchCubeAcademyGetAllNominations } from "../../api/nominationsComponents";
import { getAuthToken } from "../../utils/authHelper";
import ClosedNominations from "./ClosedNominations";
import CurrentNominations from "./CurrentNominations";
import EmptyNominations from "./EmptyNominations";
import toast, { Toaster } from "react-hot-toast";

const ViewNominations = () => {
	const [allNominations, setAllNominations] = useState([]);

	const retrieveData = async () => {
		try {
			const response = await fetchCubeAcademyGetAllNominations({
				headers: {
					Authorization: `Bearer ${getAuthToken()}`,
				},
			});

			setAllNominations(response.data);
		} catch (error) {
			toast.error(error.stack.error, {
				duration: 2000,
				position: "top-right",
			});
		}
	};

	useEffect(() => {
		retrieveData();
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

	const handleStatusChange = (status) => {
		setSelectedStatus(status);
	};
	const currentNominations = dataWithStatus.filter(
		(nomination) => !nomination.isClosed
	);

	const closedNominations = dataWithStatus.filter(
		(nomination) => nomination.isClosed
	);

	if (!nominations || nominations.length === 0) {
		return (
			<EmptyNominations
				size="w-[70%] my-10"
				text="once you submit a nomination, you will be able to view and edit it here."
			/>
		);
	}

	return (
		<div className="md:w-[60%] mx-auto pb-10">
			<div
				className="bg-gradient-to-r from-nomination-status to-color-gradient md:bg-none px-4
       md:px-0 pb-8 m py-10">
				<h2 className=" uppercase font-Poppins font-bold text-2xl mb-4">
					your nominations
				</h2>
				<div className="flex space-x-4 font-AnonymousPro text-xs font-bold">
					<button
						onClick={() => handleStatusChange(false)}
						className={`py-2 px-4 text-black shadow-md ${
							selectedStatus === false
								? "bg-white  shadow-md "
								: "bg-nomination-status opacity-75  shadow-nomination-status"
						}`}>
						Current
					</button>
					<button
						onClick={() => handleStatusChange(true)}
						className={`py-2 px-4 shadow-md text-black ${
							selectedStatus === true
								? "bg-white "
								: "bg-nomination-status shadow-nomination-status opacity-75 text-black"
						}`}>
						Closed
					</button>
				</div>
			</div>
			<div className="">
				{selectedStatus === false && (
					<CurrentNominations
						nominations={currentNominations}
						retrieveData={retrieveData}
					/>
				)}
				{selectedStatus === true && (
					<ClosedNominations nominations={closedNominations} />
				)}
			</div>
			<Toaster />
		</div>
	);
};

export default ViewNominations;
