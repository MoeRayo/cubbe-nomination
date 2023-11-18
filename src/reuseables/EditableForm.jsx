import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import editIcon from "../assets/edit-icon.svg";

const schema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	reason: Yup.string().required("Reason is required"),
	opinion: Yup.string().required("Please select an opinion"),
});

const EditableForm = ({ initialData, onSubmit, submitNominationData }) => {
	const { handleSubmit, control, setValue, formState } = useForm({
		resolver: yupResolver(schema),
		defaultValues: initialData,
	});

	const { errors } = formState;

	const handleEdit = (field) => {
		setValue(field, initialData[field]);
	};
	const handleNominationSubmit = async (data) => {
		try {
			await submitNominationData(data);
			onSubmit(data);
		} catch (error) {
			console.error("Error submitting nomination:", error);
		}
	};

	const capitalizeWords = (str) => {
		return str
			.split("_")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};
	return (
		<form onSubmit={handleSubmit(handleNominationSubmit)}>
			<div className="bg-gray-200 p-3 mb-2">
				<div className="flex justify-between">
					<label htmlFor="name" className="font-Poppins font-bold capitalize">
						cube&apos;s name
					</label>
					<Link
						to={{
							pathname: "/select-nominee",
							state: {
								nominationReason: initialData.reason,
							},
						}}>
						<img
							src={editIcon}
							alt="editicon"
							className="block"
							onClick={() => handleEdit("name")}
						/>
					</Link>
				</div>
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<div className="relative">
							{errors.name ? (
								<input
									{...field}
									id="name"
									type="text"
									readOnly
									className={`border p-1 ${
										errors.name ? "border-red-500" : ""
									}`}
								/>
							) : (
								<>
									<p className="font-AnonymousPro pt-1 text-gray-700">
										{initialData.name}
									</p>
								</>
							)}
						</div>
					)}
				/>
				{errors.name && (
					<p className="text-red-500 text-xs italic">{errors.name.message}</p>
				)}
			</div>

			<div className="bg-gray-200 p-3 mb-2">
				<div className="flex justify-between">
					<label className="font-Poppins font-bold capitalize" htmlFor="reason">
						Reasoning
					</label>
					<Link
						to={{
							pathname: "/nomination-reason",
							state: {
								nominationReason: initialData.reason,
								selectedNominee: initialData.name,
								selectedNomineeId: initialData.nominee_id,
							},
						}}>
						<img
							src={editIcon}
							alt="editicon"
							className="block"
							onClick={() => handleEdit("name")}
						/>
					</Link>
				</div>
				<Controller
					name="reason"
					control={control}
					render={({ field }) => (
						<div className="relative">
							{errors.reason ? (
								<textarea
									{...field}
									id="reason"
									readOnly
									className={`border p-1 ${
										errors.reason ? "border-red-500" : ""
									}`}
								/>
							) : (
								<>
									<p className="font-AnonymousPro pt-1 text-gray-700">
										{initialData.reason}
									</p>
								</>
							)}
						</div>
					)}
				/>
				{errors.reason && (
					<p className="text-red-500 text-xs italic">{errors.reason.message}</p>
				)}
			</div>

			<div className="bg-gray-200 p-3 mb-2">
				<div className="flex justify-between">
					<label
						className="font-Poppins font-bold capitalize"
						htmlFor="opinion">
						Thoughts on current process
					</label>
					<Link
						to={{
							pathname: "/nomination-opinion",
							state: {
								nominationReason: initialData.reason,
								selectedNominee: initialData.name,
								selectedNomineeId: initialData.nominee_id,
							},
						}}>
						<img
							src={editIcon}
							alt="editicon"
							className="block"
							onClick={() => handleEdit("name")}
						/>
					</Link>
				</div>
				<Controller
					name="opinion"
					control={control}
					render={({ field }) => (
						<div className="relative">
							{errors.opinion ? (
								<input
									{...field}
									id="opinion"
									type="text"
									readOnly
									className={`border p-1 ${
										errors.opinion ? "border-red-500" : ""
									}`}
								/>
							) : (
								<>
									<p>{initialData.nominee_id}</p>
									<p className="font-AnonymousPro pt-1 text-gray-700">
										{capitalizeWords(initialData.opinion)}
									</p>
								</>
							)}
						</div>
					)}
				/>
				{errors.opinion && (
					<p className="text-red-500 text-xs italic">
						{errors.opinion.message}
					</p>
				)}
			</div>
			<div className="flex md:flex-row flex-col md:justify-center my-6">
				<button
					type="submit"
					className={`${
						Object.keys(errors).length > 0
							? "bg-gray-300 text-gray-500 cursor-not-allowed font-bold uppercase py-2 px-4 font-Poppins text-xs"
							: "bg-black hover:bg-white hover:border hover:border-black hover:text-black text-white font-bold uppercase py-2 px-4 font-Poppins text-xs"
					}`}
					disabled={Object.keys(errors).length > 0}>
					Submit
				</button>
			</div>
		</form>
	);
};
EditableForm.propTypes = {
	initialData: PropTypes.shape({
		name: PropTypes.string,
		reason: PropTypes.string,
		opinion: PropTypes.string,
		nominee_id: PropTypes.string,
	}),
	onSubmit: PropTypes.func.isRequired,
	submitNominationData: PropTypes.func.isRequired,
};

export default EditableForm;
