import { useState, useEffect } from "react";
import disabledDeleteIcon from "../../assets/disabled-delete-icon.svg";
import { fetchCubeAcademyRetrieveNomineeList } from "../../api/nominationsComponents";
import { getAuthToken } from "../../utils/authHelper";
import EmptyNominations from "./EmptyNominations";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";

const ClosedNominations = ({ nominations }) => {
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
				toast.error(error.stack.error, {
					duration: 2000,
					position: "top-right",
				});
			}
		};

		fetchData();
	}, []);
	if (!nominations || nominations.length === 0) {
		return (
			<EmptyNominations text="once you have a closed nomination, you will be able to view it here." />
		);
	}

	return (
		<div>
			<table className=" w-[100%] border-collapse border">
				<thead>
					<tr className="bg-gray-200 text-left text-xs uppercase p-2 font-Poppins">
						<th className="border py-2 px-4 md:p-2">Nominee</th>
						<th className="border  md:table-cell hidden p-2">Date Submitted</th>
						<th className="border  md:table-cell hidden p-2">Closing date</th>
						<th className="border  md:table-cell hidden p-2">Reason</th>
						<th className="border  md:table-cell hidden p-2">Process</th>
						<th className="border p-2"></th>
					</tr>
				</thead>

				<tbody className=" bg-white text-gray-400 cursor-not-allowed">
					{nominations.map((nomination, index) => {
						const nominee = nomineeData.find(
							(data) => data.nominee_id === nomination.nominee_id
						);
						const nomineeName = nominee
							? `${nominee.first_name} ${nominee.last_name}`
							: "N/A";

						return (
							<tr
								key={`${nomination.id}-${index}`}
								className="p-2 font-AnonymousPro text-xs">
								<td className="border-0 md:border-b block md:table-cell border-l-0 border-r-0 border-gray-200 py-2 px-4 md:p-2 font-bold md:font-normal">
									{nomineeName}
									{/* <span className="md:hidden block mt-2 font-normal">
										{nomination.reason}{" "}
									</span> */}
								</td>
								<td className="border-l-0 border-r-0 border-b border md:table-cell hidden border-gray-200 p-2">
									{nomination.date_submitted}
								</td>
								<td className="border-l-0 border-r-0 border-b border md:table-cell hidden border-gray-200 p-2">
									{nomination.closing_date}
								</td>
								<td className="border-b border-l-0 block border-r-0 border md:table-cell py-2 px-4 border-gray-200 md:p-2 capitalize">
									{nomination.reason}
								</td>
								<td className="border-l-0 border-r-0 border-b border md:table-cell hidden border-gray-200 p-2">
									{nomination.process
										.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</td>
								<td className="border-l-0 border-r-0 border-b border-gray-200 p-2">
									<img
										src={disabledDeleteIcon}
										alt="disabled Delete Icon"
										className="block"
										width="30"
										height="30"
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Toaster />
		</div>
	);
};

ClosedNominations.propTypes = {
	nominations: PropTypes.arrayOf(
		PropTypes.shape({
			date_submitted: PropTypes.string.isRequired,
			closing_date: PropTypes.string.isRequired,
			reason: PropTypes.string.isRequired,
			process: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default ClosedNominations;
