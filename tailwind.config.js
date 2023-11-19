/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				AnonymousPro: ["Anonymous Pro", "monospace"],
				Poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				"nomination-value": "#243c5a",
				"nomination-status": "#A0FF1F",
				"color-gradient": "#00ED71",
			},
			backgroundColor: {
				"nomination-status": "#A0FF1F",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
