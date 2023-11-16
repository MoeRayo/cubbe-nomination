import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../../utils/validationSchema";

const SelectNomineeDropdown = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		// Handle form submission logic here
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* ... other form fields */}
			<div>
				<label htmlFor="selectedOption">Select an option:</label>
				<Controller
					name="selectedOption"
					control={control}
					render={({ field }) => (
						<select id="selectedOption" {...field}>
							<option value="" disabled>
								Select an option
							</option>
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
							<option value="option3">Option 3</option>
						</select>
					)}
				/>
				<span>{errors.selectedOption?.message}</span>
			</div>

			<button type="submit" disabled={Object.keys(errors).length > 0}>
				Submit
			</button>
		</form>
	);
};

export default SelectNomineeDropdown;
