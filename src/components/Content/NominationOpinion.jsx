import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-modal";
import * as Yup from "yup";
import lgNominationOpinion from "../../assets/lg-nomination-opinion-image.png";
import smNominationOpinion from "../../assets/sm-nomination-opinion-image.png";
import fairEmoji from "../../assets/fair-emoji.svg";
import unfairEmoji from "../../assets/unfair-emoji.svg";
import notSureEmoji from "../../assets/not-sure-emoji.svg";
import veryUnfairEmoji from "../../assets/very-unfair-emoji.svg";
import veryFairEmoji from "../../assets/veryfair-emoji.svg";

const NominationOpinion = () => {
	const history = useHistory();
	const isSmallScreen = useMediaQuery({ maxWidth: 370 });
	const isMidScreen = useMediaQuery({ maxWidth: 767 });
	const [selectedOpinion, setSelectedOpinion] = useState(null);

	const location = useLocation();
	const selectedNominee = location.state?.selectedNominee;
	const nominationReason = location.state?.nominationReason;
	const selectedNomineeId =
		location.state?.selectedNomineeId ||
		location.state?.selectedNominee?.nominee_id;

	const schema = Yup.object().shape({
		opinion: Yup.string().required("Please select an opinion"),
	});

	const opinions = [
		{ value: "fair", imageSrc: fairEmoji },
		{ value: "unfair", imageSrc: unfairEmoji },
		{ value: "not_sure", imageSrc: notSureEmoji },
		{ value: "very_unfair", imageSrc: veryUnfairEmoji },
		{ value: "very_fair", imageSrc: veryFairEmoji },
	];
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			opinion: "",
		},
	});

	const handleOpinionClick = (value) => {
		setSelectedOpinion(value);
		setValue("opinion", value);
	};

	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	const openConfirmation = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmation = () => {
		setIsConfirmationOpen(false);
	};

	const confirmLeave = () => {
		closeConfirmation();
		history.push("/nomination-reason", { selectedNominee });
	};

	const onSubmit = (data) => {
		console.log(data);
		history.push("/nomination-overview", {
			selectedNominee,
			nominationReason,
			selectedNomineeId,
			nominationOpinion: data.opinion,
		});
	};

	return (
		<div className="md:w-[50%] m-auto md:my-10 relative">
			<div className="md:py-8 md:bg-white bg-black">
				<div className="bg-black md:bg-white">
					<img
						src={isSmallScreen ? smNominationOpinion : lgNominationOpinion}
						alt="image of people at work"
						className="m-auto"
					/>
				</div>
			</div>

			<section className="py-3 px-6 bg-white flex-1">
				<div className="w-[90%] mx-auto">
					<h2 className="uppercase font-Poppins font-bold text-2xl">
						IS HOW WE CURRENTLY RUN CUBE OF THE MONTH FAIR?
					</h2>
					<p className="font-AnonymousPro mt-4 mb-5 leading-6 text-base">
						As you know, out of the nominees chosen, we spin a wheel to pick the
						cube of the month. What’s your opinion on this method?
					</p>
					<div className="flex items-center my-7">
						{isMidScreen ? (
							opinions.map((opinion, index) => (
								<span
									key={index}
									className={`cursor-pointer mr-2 block border-2 border-white p-3 hover:border-pink-500 ${
										selectedOpinion === opinion.value ? "bg-gray-200" : ""
									}`}
									onClick={() => handleOpinionClick(opinion.value)}>
									<input
										type="radio"
										id={`opinion-${index}`}
										value={opinion.value}
										{...register("opinion")}
										onClick={() => handleOpinionClick(opinion.value)}
									/>
									<img
										src={opinion.imageSrc}
										alt={`Emoji ${index}`}
										width="35"
										height="35"
										className="block"
									/>
								</span>
							))
						) : (
							<div className="hidden md:flex md:justify-between w-full">
								{opinions.map((opinion, index) => (
									<span
										key={index}
										className={`cursor-pointer mr-2 block border-2 bg-gray-100 border-white p-3 hover:border-pink-500 ${
											selectedOpinion === opinion.value
												? " border-pink-500"
												: ""
										}`}
										onClick={() => handleOpinionClick(opinion.value)}>
										<input
											className="hidden"
											type="radio"
											id={`opinion-${index}`}
											value={opinion.value}
											{...register("opinion")}
											onClick={() => handleOpinionClick(opinion.value)}
										/>
										<img
											src={opinion.imageSrc}
											alt={`Emoji ${index}`}
											width="35"
											height="35"
											className="block"
										/>
									</span>
								))}
							</div>
						)}
					</div>

					{errors.opinion && (
						<p className="text-red-500 text-xs italic">
							{errors.opinion.message}
						</p>
					)}
					<div className="flex md:flex-row flex-col justify-between my-6">
						<button
							type="button"
							onClick={openConfirmation}
							className="bg-white border block border-black hover:text-white hover:bg-black text-black font-bold px-4 py-2 uppercase font-Poppins text-xs">
							Back
						</button>
						<button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							className={`${
								Object.keys(errors).length > 0
									? "bg-gray-300 text-gray-500 cursor-not-allowed font-bold uppercase py-2 px-4 font-Poppins text-xs"
									: "bg-black hover:bg-white hover:border hover:border-black hover:text-black text-white font-bold uppercase py-2 px-4 font-Poppins text-xs"
							}`}
							disabled={Object.keys(errors).length > 0}>
							Next
						</button>
					</div>
				</div>
			</section>
			<Modal
				isOpen={isConfirmationOpen}
				onRequestClose={closeConfirmation}
				className="bg-white md:w-[25%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				overlayClassName="fixed inset-0 bg-black bg-opacity-75 text-blue flex items-center justify-center">
				<div className="p-6">
					<h2 className="font-bold font-Poppins uppercase">Are you sure?</h2>
					<p className="font-AnonymousPro my-4">
						If you leave this page, you will lose any progress made.
					</p>
				</div>
				<div className="bg-white py-5 px-6 shadow-2xl shadow-black mt-2">
					<button
						className="uppercase bg-white text-black border-2 border-black block py-2 px-3 text-sm font-bold mx-auto w-full mb-4 hover:bg-black hover:text-white"
						onClick={confirmLeave}>
						yes, leave page
					</button>
					<button
						className="uppercase bg-white text-black border-2 border-black block py-2 px-3 text-sm font-bold mx-auto w-full mb-3 hover:bg-black hover:text-white"
						onClick={closeConfirmation}>
						cancel
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default NominationOpinion;
