import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Content/Wrapper";
import Buttons from "./reuseables/MobileButtons";

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen relative">
				<Header />
				<Route path="/" component={Wrapper} />
				<Footer />
				<Buttons />
			</div>
		</Router>
	);
}

export default App;
