import {
	SwitchVerticalIcon,
	PlusIcon,
	MinusIcon,
	SearchIcon,
} from "@heroicons/react/outline";

const SearchBar = () => {
	return (
		<>
			<div className="flex flex-col lg:flex-row bg-white rounded-lg drop-shadow-lg">
				<div className="flex flex-col sm:flex-row p-3 gap-x-6">
					<div className="flex flex-col grow">
						{/* Origin */}
						<label className="label py-0 mb-1">
							<span className="text-xs uppercase text-sky-700 font-bold">
								Origin
							</span>
						</label>
						<input
							type="text"
							placeholder="Leaving from"
							className="input input-bordered w-full max-w-sm focus:outline-none"
						/>
					</div>

					{/* Switch  */}
					<div className="place-self-center sm:place-self-end mt-2">
						<button className="btn btn-circle bg-sky-700 hover:bg-sky-400 border-none">
							<SwitchVerticalIcon className="w-6 h-6 sm:rotate-90" />
						</button>
					</div>

					{/* Destination */}
					<div className="flex flex-col grow">
						<label className="label py-0 mb-1">
							<span className="text-xs uppercase text-sky-700 font-bold">
								Destination
							</span>
						</label>
						<input
							type="text"
							placeholder="Going to"
							className="input input-bordered w-full max-w-sm focus:outline-none"
						/>
					</div>
				</div>

				<div class="divider lg:divider-horizontal" />

				<div className="flex justify-evenly">
					{/* Date */}
					<div className="flex flex-col p-3 grow">
						<label className="label py-0 mb-1">
							<span className="text-xs uppercase text-sky-700 font-bold">
								Date
							</span>
						</label>
						<input
							type="date"
							className="input input-bordered w-full max-w-sm focus:outline-none"
						/>
					</div>

					<div className="divider divider-horizontal" />

					{/* Passengers */}
					<div className="flex flex-col p-3 grow md:items-center">
						<label className="label py-0 mb-3">
							<span className="text-xs uppercase text-sky-700 font-bold">
								Passengers
							</span>
						</label>
						<div className="flex gap-x-4">
							<button className="btn btn-xs btn-circle bg-sky-700 hover:bg-sky-400 border-none">
								<MinusIcon className="w-3 h-3" />
							</button>
							<span className="font-semibold">1</span>
							<button className="btn btn-circle btn-xs bg-sky-700 hover:bg-sky-400 border-none">
								<PlusIcon className="w-3 h-3" />
							</button>
						</div>
					</div>
				</div>

				{/* Button */}
				<div className="flex flex-col grow max-w-lg mt-8 p-2 lg:p-0 lg:ml-16 lg:mt-0">
					<button class="grow btn lg:rounded-l-none md:btn-lg min-h-max gap-2 lg:gap-5 bg-sky-700 hover:bg-sky-400 border-none">
						<SearchIcon className="w-6 h-6 lg:w-8 md:h-8" />
						<span className="lg:hidden xl:inline">Search</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default SearchBar;
