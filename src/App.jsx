// components
import SearchBar from "./components/SearchBar";

const App = () => {
	return (
		<div className="min-h-screen overflow-auto flex flex-col bg-gradient-to-r from-blue-300 via-green-200 to-pink-300">
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
				<SearchBar />

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
		</div>
	);
};

export default App;
