import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NominationsPage from "./Nominations";
import Signup from "../auth/Signup";
import Signin from "../auth/Signin";
import SelectNominee from "./SelectNominee";
import NominationReason from "./NominationReason";
import NominationOpinion from "./NominationOpinion";
import NominationOverview from "./NominationOverview";
import NominationSubmission from "./NominationSubmission";
import ViewNominations from "./ViewNominations";
import LandingContent from "./LandingContent";

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
		<main className="grow relative" style={showGradient ? gradientStyle : {}}>
			<div
				className={showBackground ? "min-h-screen" : ""}
				style={showBackground ? backgroundImageStyle : {}}>
				<Switch>
					<Route exact path="/" component={LandingContent} />
					<Route path="/Signup" component={Signup} />
					<Route path="/Signin" component={Signin} />
					<Route path="/nominations" component={NominationsPage} />
					<Route path="/select-nominee" component={SelectNominee} />
					<Route path="/nomination-reason" component={NominationReason} />
					<Route path="/nomination-opinion" component={NominationOpinion} />
					<Route path="/nomination-overview" component={NominationOverview} />
					<Route
						path="/nomination-submission"
						component={NominationSubmission}
					/>
					<Route path="/view-nominations" component={ViewNominations} />
				</Switch>
			</div>
		</main>
	);
};

export default Wrapper;
