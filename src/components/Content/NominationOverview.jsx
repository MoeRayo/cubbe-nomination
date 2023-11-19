import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import lgNominationOverview from "../../assets/lg-nomination-overview-image.png";
import smNominationOverview from "../../assets/sm-nomination-overview-image.png";
import EditableForm from "../../reuseables/EditableForm";
import { getAuthToken } from "../../utils/authHelper";
import { fetchCubeAcademyCreateNomination } from "../../api/nominationsComponents";

const NominationOverview = () => {
	const history = useHistory();
	const isSmallScreen = useMediaQuery({ maxWidth: 370 });

	const location = useLocation();
	console.log(location);
	const selectedNominee = location.state?.selectedNominee;
	const selectedNomineeId =
		location.state?.selectedNominee?.nominee_id ||
		location.state?.selectedNomineeId;

	const nominationReason = location.state?.nominationReason;
	const nominationOpinion = location.state?.nominationOpinion;

	const onSubmit = (data) => {
		console.log("data", data);
	};
	const createNomination = async (data) => {
		try {
			await fetchCubeAcademyCreateNomination({
				headers: {
					Authorization: `Bearer ${getAuthToken()}`,
				},
				body: {
					nominee_id: data.nominee_id,
					reason: data.reason,
					process: data.opinion,
				},
			});
			history.push("/nomination-submission");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<div className="md:w-[50%] m-auto md:my-10 relative">
			<div className="md:py-8 md:bg-white bg-black">
				<div className="bg-black md:bg-white">
					<img
						src={isSmallScreen ? smNominationOverview : lgNominationOverview}
						alt="image of people at work"
						className="m-auto"
					/>
				</div>
			</div>

			<section className="py-3 px-6 bg-white flex-1">
				<div className="w-[90%] mx-auto">
					<h2 className="uppercase font-Poppins font-bold text-2xl text-center">
						nomination overview
					</h2>
					<p className="font-AnonymousPro mt-4 mb-5 leading-6 text-base text-center">
						Thank you for taking the time to nominate a fellow cube. Please
						check your answers before submitting.
					</p>
					<EditableForm
						initialData={{
							name: selectedNominee?.first_name || selectedNominee,
							reason: nominationReason,
							opinion: nominationOpinion,
							nominee_id: selectedNominee?.nominee_id || selectedNomineeId,
						}}
						onSubmit={onSubmit}
						submitNominationData={createNomination}
					/>
				</div>
			</section>
		</div>
	);
};

export default NominationOverview;
