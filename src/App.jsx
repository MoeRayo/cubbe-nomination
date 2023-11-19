import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Content/Wrapper";

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen relative">
				<Header />
				<Route path="/" component={Wrapper} />
				<Footer />
			</div>
		</Router>
	);
}

export default App;
