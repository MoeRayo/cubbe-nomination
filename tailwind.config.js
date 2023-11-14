/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				AnonymousPro: ["Anonymous Pro", "monospace"],
				Poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
