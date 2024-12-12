import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import AutomobilesList from "./AutomobilesList"
import SalespeopleList from "./SalespeopleList";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="automobiles" element={<AutomobilesList />} />
					<Route path="salespeople" element={<SalespeopleList/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
