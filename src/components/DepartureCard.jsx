import {
	DotsVerticalIcon,
	LocationMarkerIcon,
	UserCircleIcon,
	ClockIcon,
	ChevronRightIcon,
} from "@heroicons/react/outline";

const DepartureCard = ({ departure }) => {
	const {
		departureTime,
		arrivalTime,
		duration,
		from,
		to,
		price,
		operatorLogo,
		operatorName,
		busbudUrl,
	} = departure;

	return (
		<div className="flex flex-col space-y-4 bg-base-100 shadow-2xl rounded-2xl py-3 px-5">
			<div className="flex justify-between">
				<img
					src={operatorLogo}
					alt={operatorName}
					className="w-40 md:w-60"
				/>

				<span className="text-sm md:text-xl font-bold text-sky-700 mt-1">
					{price}
				</span>
			</div>

			<div className="flex flex-col">
				<div className="flex ml-2 space-x-2">
					<UserCircleIcon className="h-10 w-10 sm:h-6 sm:w-6 text-sky-400" />
					<div className="flex space-x-3">
						<span className="text-sm md:text-lg text-sky-700 font-semibold">
							{departureTime}
						</span>
						<span className="text-sm md:text-lg font-semibold">
							{from}
						</span>
					</div>
				</div>
				<DotsVerticalIcon className="h-6 w-6 text-gray-400 ml-2" />
				<div className="flex ml-2 space-x-2">
					<LocationMarkerIcon className="h-10 w-10 sm:h-6 sm:w-6 text-slate-500" />
					<div className="flex space-x-3">
						<span className="text-slate-500 text-sm md:text-lg font-semibold">
							{arrivalTime}
						</span>
						<span className="font-semibold text-sm md:text-lg text-slate-500">
							{to}
						</span>
					</div>
				</div>
			</div>

			<div className="flex justify-between">
				<div className="flex pt-4 py-2 space-x-1">
					<ClockIcon className="h-6 w-6 text-slate-500" />
					<span className="text-slate-500 font-semibold text-sm md:text-lg self-center">
						{duration}
					</span>
				</div>
				<button
					className="btn bg-gray-300 hover:bg-gray-400 md:btn-md md:bg-orange-600 md:hover:bg-orange-400 lg:bnt-lg  border-none"
					onClick={() => window.open(busbudUrl, "_blank")}
				>
					<span className="hidden md:inline">Select</span>
					<ChevronRightIcon className="md:hidden h-6 w-7 text-white" />
				</button>
			</div>
		</div>
	);
};

export default DepartureCard;
