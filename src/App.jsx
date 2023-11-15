import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Content/Wrapper";

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<Wrapper />
			<Footer />
		</div>
	);
}

export default App;
