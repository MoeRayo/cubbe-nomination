import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

const AuthForm = ({ onSubmit, fields, buttonText }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(
			Yup.object().shape({
				email: Yup.string()
					.email("Please enter a valid email address")
					.required("Please enter your email address"),
				password: Yup.string()
					.required("Password is required")
					.min(
						8,
						"Password should contain at least 8 characters, at least 1 uppercase and 1 number."
					)
					.matches(
						/^(?=.*[A-Z]).*/,
						"Password must contain at least one uppercase letter"
					)
					.matches(
						/^(?=.*[0-9]).*/,
						"Password must contain at least one number"
					),
			})
		),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="">
			{fields.map((field) => (
				<section key={field.name} className="mb-4">
					<label className="block text-sm font-bold font-Poppins">
						{field.label}
					</label>
					<input
						placeholder={`Please input ${field.label.toLowerCase()}`}
						className="mt-1 p-2 w-full border border-black font-AnonymousPro"
						type={field.type}
						{...register(field.name)}
					/>
					<span className="font-Poppins text-red-600 text-sm">
						{errors[field.name]?.message}
					</span>
				</section>
			))}
			<button
				className="sticky border-2 block m-auto bg-black my-5 text-white px-4 md:w-[60%] lg:w-[40%] py-3 text-sm font-bold uppercase font-Poppins hover:bg-white  hover:border-black hover:text-black transition-all"
				type="submit">
				{buttonText}
			</button>
		</form>
	);
};
AuthForm.propTypes = {
	buttonText: PropTypes.string,
	onSubmit: PropTypes.func,
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
		})
	),
};

export default AuthForm;
