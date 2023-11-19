import { Link, useHistory } from "react-router-dom";
import AuthForm from "../../reuseables/AuthForm";
import { fetchCubeAcademyRegister } from "../../api/nominationsComponents";
import { setAuthToken } from "../../utils/authHelper";
import toast, { Toaster } from "react-hot-toast";

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
			const authToken = response?.data?.authToken;

			setAuthToken(authToken);

			history.push("/select-nominee");
		} catch {
			toast.error("Login Invalid!", { duration: 2000, position: "top-right" });
		}
	};

	const fields = [
		{ name: "name", label: "Name", type: "text" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "password", label: "Password", type: "password" },
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
			<Toaster />
		</div>
	);
};

export default Signup;
