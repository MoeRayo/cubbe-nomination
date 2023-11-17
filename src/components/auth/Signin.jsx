import { Link, useHistory } from "react-router-dom";
import AuthForm from "../../reuseables/AuthForm";
import { fetchCubeAcademyLogin } from "../../api/nominationsComponents";
import { setAuthToken } from "../../utils/authHelper";
const Signin = () => {
	const history = useHistory();
	const onSubmit = async (data) => {
		try {
			const response = await fetchCubeAcademyLogin({
				body: {
					email: data.email,
					password: data.password,
				},
			});
			const authToken = response?.data?.authToken;

			setAuthToken(authToken);

			history.push("/select-nominee");
		} catch (error) {
			console.error(error);
		}
	};

	const fields = [
		{ name: "email", label: "Email", type: "email" },
		{ name: "password", label: "Password", type: "password" },
	];

	return (
		<div className="bg-white p-6 max-w-md mx-auto my-10">
			<AuthForm onSubmit={onSubmit} fields={fields} buttonText="Sign in" />
			<p className="font-Poppins font-bold text-sm">
				Do not have an account?
				<Link to="/Signup">
					<span className="underline"> Sign up here</span>
				</Link>
			</p>
		</div>
	);
};

export default Signin;
