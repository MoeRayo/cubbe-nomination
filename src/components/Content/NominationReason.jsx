import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-modal";
import * as Yup from "yup";
import lgNominationReason from "../../assets/lg-nomination-reason-image.png";
import smNominationReason from "../../assets/sm-nomination-reason-image.png";

const NominationReason = () => {
	const history = useHistory();

	const isSmallScreen = useMediaQuery({ maxWidth: 370 });

	const location = useLocation();

	const selectedNominee = location.state?.selectedNominee;
	const nominationReason = location.state?.nominationReason;
	const selectedNomineeId = location.state?.selectedNomineeId;

	const schema = Yup.object().shape({
		nominationReason: Yup.string().required("Nomination reason is required"),
	});
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	const openConfirmation = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmation = () => {
		setIsConfirmationOpen(false);
	};

	const confirmLeave = () => {
		closeConfirmation();
		history.push("/select-nominee");
	};

	const onSubmit = (data) => {
		history.push("/nomination-opinion", {
			selectedNominee,
			nominationReason: data.nominationReason,
			selectedNomineeId,
		});
	};

	return (
		<div className="md:w-[50%] m-auto md:my-10 relative">
			<div className="md:py-8 md:bg-white bg-black">
				<div className="bg-black md:bg-white">
					<img
						src={isSmallScreen ? smNominationReason : lgNominationReason}
						alt="image of people at work"
						className="m-auto"
					/>
				</div>
			</div>

			<section className="py-3 px-6 bg-white flex-1">
				<div className="w-[90%] mx-auto">
					<h2 className="uppercase font-Poppins font-bold text-2xl">
						I’d like to nominate{" "}
						<span className="text-pink-500">
							{selectedNominee?.first_name || selectedNominee}{" "}
						</span>
						because...
					</h2>
					<p className="font-AnonymousPro mt-4 mb-5 leading-6 text-base">
						Please let us know why you think this cube deserves the ‘cube of the
						month’ title 🏆⭐
					</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4">
							<label className="font-bold font-Poppins text-sm">
								<span className="text-red-500">*</span> Nomination Reason
							</label>
							<Controller
								name="nominationReason"
								control={control}
								defaultValue={nominationReason || ""}
								render={({ field }) => (
									<textarea
										rows="10"
										{...field}
										className={`${
											errors.nominationReason
												? "border-red-500"
												: "border-gray-300"
										} block w-full bg-white border mt-3 py-2 px-3 font-AnonymousPro`}
										placeholder="Enter your nomination reason..."
									/>
								)}
							/>
							{errors.nominationReason && (
								<p className="text-red-500 text-xs italic font-AnonymousPro">
									{errors.nominationReason.message}
								</p>
							)}
						</div>
						<div className="flex md:flex-row flex-col justify-between my-6">
							<button
								type="button"
								onClick={openConfirmation}
								className="bg-white border-2 md:block md:w-[25%] border-black hover:text-white hover:bg-black text-black font-bold px-4  py-2 uppercase font-Poppins text-xs">
								Back
							</button>
							<button
								type="submit"
								className={`${
									Object.keys(errors).length > 0
										? "bg-gray-300 text-gray-500 cursor-not-allowed font-bold uppercase py-2 px-4 md:ml-2 mt-3 md:mt-0 font-Poppins text-xs border-2 md:block grow"
										: "bg-black hover:bg-white hover:border-2 hover:border-black hover:text-black text-white font-bold uppercase py-2 px-4 md:ml-2 mt-3 border-2 border-black md:mt-0 font-Poppins md:block text-xs grow "
								}`}
								disabled={Object.keys(errors).length > 0}>
								Next
							</button>
						</div>
					</form>
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

export default NominationReason;
