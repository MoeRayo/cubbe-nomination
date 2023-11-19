import { useState, useEffect } from "react";
import trashIcon from "../../assets/trash-icon.svg";
import { fetchCubeAcademyRetrieveNomineeList } from "../../api/nominationsComponents";
import { getAuthToken } from "../../utils/authHelper";
import EmptyNominations from "./EmptyNominations";
import Modal from "react-modal";
import { fetchCubeAcademyDeleteNomination } from "../../api/nominationsComponents";

const CurrentNominations = ({ nominations, retrieveData }) => {
	const [nomineeData, setNomineeData] = useState([]);
	const [selectedNomination, setSelectedNomination] = useState(null);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchCubeAcademyRetrieveNomineeList({
					headers: {
						Authorization: `Bearer ${getAuthToken()}`,
					},
				});

				setNomineeData(response.data);
			} catch (error) {
				console.error("Error fetching nominee data:", error);
			}
		};

		fetchData();
	}, []);

	if (!nominations || nominations.length === 0) {
		return (
			<EmptyNominations text="once you have a current nomination, you will be able to view and edit it here." />
		);
	}

	const openConfirmation = (nomination) => {
		setSelectedNomination(nomination);
		setIsConfirmationOpen(true);
	};

	const closeConfirmation = () => {
		setIsConfirmationOpen(false);
	};

	const confirmLeave = async () => {
		try {
			const response = await fetchCubeAcademyDeleteNomination({
				headers: {
					Authorization: `Bearer ${getAuthToken()}`,
				},
				pathParams: {
					nominationId: selectedNomination.nomination_id,
				},
			});
			retrieveData();
		} catch (error) {
			console.error(error);
		}

		const updatedNominations = nominations.filter(
			(nom) => nom.id !== selectedNomination.id
		);
		setNomineeData(updatedNominations);

		closeConfirmation();
	};

	return (
		<table className=" w-[100%] border-collapse border">
			<thead>
				<tr className="bg-gray-200 text-left text-xs uppercase p-2 font-Poppins">
					<th className="border p-2">Nominee</th>
					<th className="border p-2">Date Submitted</th>
					<th className="border p-2">Closing date</th>
					<th className="border p-2">Reason</th>
					<th className="border p-2">Process</th>
					<th className="border p-2"></th>
				</tr>
			</thead>
			<tbody className="bg-white">
				{nominations.map((nomination) => {
					const nominee = nomineeData.find(
						(data) => data.nominee_id === nomination.nominee_id
					);

					const nomineeName = nominee
						? `${nominee.first_name} ${nominee.last_name}`
						: "N/A";

					return (
						<tr
							key={nomination.id}
							className="border p-2 font-AnonymousPro text-xs">
							<td className="border-b border-gray-200 p-2">{nomineeName}</td>
							<td className="border-b border-gray-200 p-2">
								{nomination.date_submitted}
							</td>
							<td className="border-b border-gray-200 p-2">
								{nomination.closing_date}
							</td>
							<td className="border-b border-gray-200 p-2 capitalize">
								{nomination.reason}
							</td>
							<td className="border-b border-gray-200 p-2">
								{nomination.process
									.split("_")
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(" ")}
							</td>
							<td className="border-b border-gray-200 p-2">
								<button
									type="button"
									onClick={() => openConfirmation(nomination)}>
									<img
										src={trashIcon}
										alt="editicon"
										className="block"
										width="15"
										height="15"
									/>
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>

			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={isConfirmationOpen}
				onRequestClose={closeConfirmation}
				className="bg-white md:w-[25%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				overlayClassName="fixed inset-0 bg-black bg-opacity-75 text-blue flex items-center justify-center">
				{/* Modal content */}
				<div className="p-6">
					<h2 className="font-bold font-Poppins uppercase">
						delete this nomination?
					</h2>
					<p className="font-AnonymousPro my-4">
						If you delete this nomination, the nominee will no longer be put
						forward by you.
					</p>
				</div>
				<div className="bg-white py-5 px-6 shadow-2xl shadow-black mt-2">
					<button
						className="uppercase bg-white text-black border-2 border-black block py-2 px-3 text-sm font-bold mx-auto w-full mb-4 hover:bg-black hover:text-white"
						onClick={confirmLeave}>
						yes, delete
					</button>
					<button
						className="uppercase bg-white text-black border-2 border-black block py-2 px-3 text-sm font-bold mx-auto w-full mb-3 hover:bg-black hover:text-white"
						onClick={closeConfirmation}>
						cancel
					</button>
				</div>
			</Modal>
		</table>
	);
};

export default CurrentNominations;
