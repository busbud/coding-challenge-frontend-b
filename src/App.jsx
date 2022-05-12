import { useState } from "react";
import { toast } from "react-toastify";

// components
import SearchBar from "./components/SearchBar";
import DepartureCard from "./components/DepartureCard";

// api
import { getDepartures } from "./api";

// utility
import { processDepartures } from "./utility";

const App = () => {
	const [passengers, setPassengers] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [departures, setDepartures] = useState([]);

	const handleSearch = async (e, index = 0) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const res = await getDepartures({
				passengers,
				index,
			});

			if (res.error) {
				setIsLoading(false);
				toast.error(
					`${res.error.action_type.toUpperCase()}: ${
						res.error.type
					} - ${res.error.details}`
				);
				return;
			}

			if (res.index) {
				setDepartures([...departures, ...processDepartures(res)]);
			} else setDepartures(processDepartures(res));

			if (!res.complete)
				setTimeout(
					() => handleSearch(e, index + res.departures.length),
					3000
				);
			else setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error(error.message);
		}
	};

	return (
		<div className="min-h-screen overflow-auto flex flex-col bg-gradient-to-r from-blue-300 via-green-200 to-pink-300">
			{/* Progress bar */}
			{isLoading && (
				<progress className="progress progress-accent w-full" />
			)}
			{/* Osheaga logo */}
			<div className="mt-20">
				<a
					href="https://www.osheaga.com"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
						alt="Osheaga logo"
						className="w-2/3 lg:w-1/3 mx-auto"
					/>
				</a>
			</div>
			<div className="flex flex-col mx-auto max-w-8xl mt-20">
				{/* Search */}
				<SearchBar
					origin={"Québec"}
					destination={"Montréal"}
					date={"2022-08-02"}
					passengers={passengers}
					setPassengers={setPassengers}
					handleSearch={handleSearch}
					isUpdate={departures.length}
				/>

				{/* Busbud logo */}
				<div className="self-end">
					<span className="text-xs md:text-sm">Powered by</span>
					<a
						href="https://busbud.com"
						target="_blank"
						rel="noreferrer"
					>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Busbud_logo.svg/1280px-Busbud_logo.svg.png"
							alt="Busbud logo"
							className="w-16 md:w-20"
						/>
					</a>
				</div>
			</div>

			{/* Departures */}
			<div className="flex flex-col space-y-7 w-2/3 min-w-lg max-w-8xl my-20 mx-auto">
				{departures.map((departure) => (
					<DepartureCard key={departure.id} departure={departure} />
				))}
			</div>
		</div>
	);
};

export default App;
