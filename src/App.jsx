import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<Content />
			<Footer />
		</div>
	);
}

export default App;
