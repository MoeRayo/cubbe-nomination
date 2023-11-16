import { Link, useHistory } from "react-router-dom";
import AuthForm from "../../reuseables/AuthForm";
import LargeScreenButtons from "../../reuseables/LargeScreenButtons";
import { fetchCubeAcademyRegister } from "../../api/nominationsComponents";

const Signup = () => {
	const history = useHistory();

	const onSubmit = async (data) => {
		try {
			const response = await fetchCubeAcademyRegister({
				body: {
					name: data.name,
					email: data.email,
					password: data.password,
				},
			});

			history.push("/select-nominee");

			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSuccess = () => {
		history.push("/select-nominee");
	};

	const fields = [
		{ name: "name", label: "Name", type: "text" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "password", label: "Password", type: "password" },
		{ name: "confirmPassword", label: "Confirm Password", type: "password" },
	];

	return (
		<div className="bg-white p-6 max-w-md mx-auto my-10">
			<AuthForm onSubmit={onSubmit} fields={fields} buttonText="Sign up" />
			<p className="font-Poppins font-bold text-sm">
				Account already exists?
				<Link to="/Signin">
					<span className="underline"> Sign in instead</span>
				</Link>
			</p>
		</div>
	);
};

export default Signup;
