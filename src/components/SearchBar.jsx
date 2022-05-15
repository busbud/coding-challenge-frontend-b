import {
	SwitchVerticalIcon,
	PlusIcon,
	MinusIcon,
	SearchIcon,
	InformationCircleIcon,
} from "@heroicons/react/outline";

const SearchBar = ({
	origin,
	destination,
	date,
	passengers,
	setPassengers,
	handleSearch,
	isUpdate,
	t,
}) => {
	return (
		<>
			<div className="flex flex-col rounded-lg bg-white drop-shadow-lg lg:flex-row">
				<div className="flex flex-col gap-x-6 p-3 sm:flex-row">
					<div className="flex grow flex-col">
						{/* Origin */}
						<label className="label mb-1 py-0">
							<span className="text-xs font-bold uppercase text-sky-700">
								{t("origin")}
							</span>
						</label>
						<input
							type="text"
							placeholder="Leaving from"
							value={origin}
							className="input input-bordered w-full max-w-sm focus:outline-none"
						/>
					</div>

					{/* Switch  */}
					<div className="mt-2 place-self-center sm:place-self-center">
						<button className="btn btn-circle border-none bg-sky-700 hover:bg-sky-400">
							<SwitchVerticalIcon className="h-6 w-6 sm:rotate-90" />
						</button>
					</div>

					{/* Destination */}
					<div className="flex grow flex-col">
						<label className="label mb-1 py-0">
							<span className="text-xs font-bold uppercase text-sky-700">
								{t("destination")}
							</span>
						</label>
						<input
							type="text"
							placeholder="Going to"
							value={destination}
							className="input input-bordered w-full max-w-sm focus:outline-none"
						/>
					</div>
				</div>

				<div class="divider lg:divider-horizontal lg:py-3" />

				<div className="flex justify-evenly">
					{/* Date */}
					<div className="flex grow flex-col p-3">
						<label className="label mb-1 py-0">
							<span className="text-xs font-bold uppercase text-sky-700">
								{t("date")}
							</span>
						</label>
						<input
							type="date"
							value={date}
							className="input input-bordered w-full max-w-sm focus:outline-none"
						/>
					</div>

					<div className="divider divider-horizontal lg:py-3" />

					{/* Passengers */}
					<div className="flex flex-col space-y-3 p-3 md:items-center">
						<label className="label py-0">
							<span className="text-xs font-bold uppercase text-sky-700">
								{t("passengers")}
							</span>
						</label>
						<div className="flex space-x-4">
							<button
								className="btn btn-circle btn-xs border-none bg-sky-700 hover:bg-sky-400"
								disabled={passengers < 2}
								onClick={() =>
									setPassengers((prevState) => prevState - 1)
								}
							>
								<MinusIcon className="h-3 w-3" />
							</button>
							<span className="font-semibold">{passengers}</span>
							<button
								className="btn btn-circle btn-xs border-none bg-sky-700 hover:bg-sky-400"
								disabled={passengers > 4}
								onClick={() =>
									setPassengers((prevState) => prevState + 1)
								}
							>
								<PlusIcon className="h-3 w-3" />
							</button>
						</div>

						{/* Limit Alert */}
						{passengers > 4 && (
							<div className="flex w-28 space-x-1 md:w-full">
								<InformationCircleIcon className="hidden h-4 w-4 self-center text-sky-700 md:inline-flex" />
								<span className="text-xs text-sky-700">
									<small>{t("limit5Passengers")}</small>
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Button */}
				<div className="mt-8 flex max-w-lg grow flex-col p-2 lg:ml-16 lg:mt-0 lg:p-0">
					<button
						onClick={(e) => handleSearch({ e })}
						className="btn min-h-max grow gap-2 border-none bg-sky-700 hover:bg-sky-400 md:btn-lg lg:gap-5 lg:rounded-l-none"
					>
						<SearchIcon className="h-6 w-6 md:h-8 lg:w-8" />
						<span className="lg:hidden xl:inline">
							{isUpdate ? t("update") : t("search")}
						</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default SearchBar;
