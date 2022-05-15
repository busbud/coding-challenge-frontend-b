import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// components
import LanguageSelector from "./components/LanguageSelector";
import SearchBar from "./components/SearchBar";
import DepartureCard from "./components/DepartureCard";

// api
import { getDepartures } from "./api";

// utility
import { processDepartures } from "./utility";

const App = () => {
	const { i18n, t } = useTranslation([]);

	const [passengers, setPassengers] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [departures, setDepartures] = useState([]);

	const handleSearch = async ({
		e,
		lang = i18n.language,
		index = 0,
	} = {}) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const res = await getDepartures({
				passengers,
				lang,
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

			if (index)
				setDepartures([...departures, ...processDepartures(res)]);
			else setDepartures(processDepartures(res));

			if (!res.complete)
				setTimeout(
					() =>
						handleSearch({
							e,
							lang,
							index: index + res.departures.length,
						}),
					3000
				);
			else setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error(error.message);
		}
	};

	const handleLanguageChange = (e, lang) => {
		i18n.changeLanguage(lang);
		if (departures.length) {
			setDepartures([]);
			handleSearch({ e, lang });
		}
	};

	return (
		<div className="flex min-h-screen flex-col overflow-auto bg-gradient-to-r from-blue-300 via-green-200 to-pink-300">
			{/* Language Selector */}
			<LanguageSelector
				i18n={i18n}
				handleLanguageChange={handleLanguageChange}
			/>

			{/* Osheaga logo */}
			<div
				className={
					!!departures.length
						? "mx-auto mb-4 mt-20 w-36"
						: "mx-auto my-20 w-2/3 animate-pulse lg:w-1/3"
				}
			>
				<a
					href="https://www.osheaga.com"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
						alt="Osheaga logo"
					/>
				</a>
			</div>

			<div className="max-w-8xl mx-auto flex flex-col">
				{/* Search */}
				<SearchBar
					origin={t("quebec")}
					destination={t("montreal")}
					date={"2022-08-02"}
					passengers={passengers}
					setPassengers={setPassengers}
					handleSearch={handleSearch}
					isUpdate={!!departures.length}
					t={t}
				/>

				{/* Busbud logo */}
				<div className="self-end">
					<span className="text-xs md:text-sm">{t("poweredBy")}</span>
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

			{/* Loading */}
			{isLoading && (
				<img
					src="https://media.baamboozle.com/uploads/images/457198/1634627843_336127_gif-url.gif"
					alt="Loading..."
					className="mx-auto h-64"
				/>
			)}

			{/* Departures */}
			<div className="min-w-lg max-w-8xl my-20 mx-auto flex w-2/3 flex-col space-y-7">
				{departures.map((departure) => (
					<DepartureCard
						key={departure.id}
						departure={departure}
						t={t}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
