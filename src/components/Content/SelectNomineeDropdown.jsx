import { useState } from "react";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import * as Yup from "yup";

Modal.setAppElement("#root");

const schema = Yup.object().shape({
	nominee: Yup.string().required("Please select a nominee"),
});

const SelectNomineeDropdown = ({ nominees, onSubmit }) => {
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	const openConfirmation = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmation = () => {
		setIsConfirmationOpen(false);
	};

	const confirmLeave = () => {
		closeConfirmation();
	};

	const {
		handleSubmit,
		control,
		formState: { errors, isDirty },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="my-4 relative">
			<div className="mb-4">
				<label className="font-bold font-Poppins text-sm">
					<span className="text-red-500">*</span> Cube’s name
				</label>

				<Controller
					name="nominee"
					control={control}
					render={({ field }) => (
						<select
							{...field}
							className={`${
								errors.nominee ? "border-red-500" : "border-gray-300"
							} block w-full bg-white border mt-3 py-2 px-3 font-AnonymousPro`}>
							<option value="">Select Nominee</option>
							{nominees.map((nominee) => (
								<option
									className="bg-gray-200"
									key={nominee.nominee_id}
									value={JSON.stringify(nominee)}>
									{`${nominee.first_name} ${nominee.last_name}`}
								</option>
							))}
						</select>
					)}
				/>
				{errors.nominee && (
					<p className="text-red-500 text-xs italic font-AnonymousPro">
						{errors.nominee.message}
					</p>
				)}
			</div>
			<div className="flex md:flex-row flex-col justify-between my-6">
				<button
					type="button"
					onClick={openConfirmation}
					className="bg-white border block border-black hover:text-white hover:bg-black text-black font-bold px-4 py-2 uppercase font-Poppins text-xs">
					Back
				</button>
				<button
					type="submit"
					className={`${
						Object.keys(errors).length > 0
							? "bg-gray-300 text-gray-500 cursor-not-allowed font-bold uppercase py-2 px-4 font-Poppins text-xs"
							: "bg-black hover:bg-white hover:border hover:border-black hover:text-black text-white font-bold uppercase py-2 px-4 font-Poppins text-xs"
					}`}
					disabled={Object.keys(errors).length > 0}>
					Next
				</button>
			</div>

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
		</form>
	);
};

SelectNomineeDropdown.propTypes = {
	nominees: PropTypes.arrayOf(
		PropTypes.shape({
			nominee_id: PropTypes.string.isRequired,
			first_name: PropTypes.string.isRequired,
			last_name: PropTypes.string.isRequired,
		})
	).isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default SelectNomineeDropdown;
