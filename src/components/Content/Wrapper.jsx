import { useState, useEffect } from "react";

const Wrapper = () => {
	const windowWidth = window.innerWidth >= 768;
	const [showBackground, setShowBackground] = useState(windowWidth);
	const [showGradient, setShowGradient] = useState(windowWidth);

	const imagePath = "../../src/assets/green-blobs.svg";

	const backgroundImageStyle = {
		backgroundImage: `url(${imagePath})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		display: "block",
		height: "auto",
		maxWidth: "100%",
	};

	const gradientStyle = {
		background:
			"linear-gradient(90deg, hsla(85, 100%, 56%, 1) 0%, hsla(149, 100%, 46%, 1) 100%)",
	};

	useEffect(() => {
		const handleResize = () => {
			const newWindowWidth = window.innerWidth >= 768;
			setShowBackground(newWindowWidth);
			setShowGradient(newWindowWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<main
			className="grow min-h-screen"
			style={showGradient ? gradientStyle : {}}>
			<div
				className={showBackground ? "min-h-screen" : ""}
				style={showBackground ? backgroundImageStyle : {}}>
				<p>This is text content.</p>
			</div>
		</main>
	);
};

export default Wrapper;
