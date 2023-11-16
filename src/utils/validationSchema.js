import * as Yup from "yup";

const validationSchema = Yup.object({
	selectedOption: Yup.string().required("Please select an option"),
});

export default validationSchema;
