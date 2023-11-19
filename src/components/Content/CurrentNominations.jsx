import { useState, useEffect } from "react";
import trashIcon from "../../assets/trash-icon.svg";
import { fetchCubeAcademyRetrieveNomineeList } from "../../api/nominationsComponents";
import { getAuthToken } from "../../utils/authHelper";
import EmptyNominations from "./EmptyNominations";

const CurrentNominations = ({ nominations }) => {
	const [nomineeData, setNomineeData] = useState([]);

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
		console.log("cucuc");

		return (
			<EmptyNominations text="once you have a current nomination, you will be able to view and edit it here." />
		);
	}

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
								<img
									src={trashIcon}
									alt="editicon"
									className="block"
									width="15"
									height="15"
								/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default CurrentNominations;
