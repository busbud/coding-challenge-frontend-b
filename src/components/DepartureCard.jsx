import {
	DotsVerticalIcon,
	LocationMarkerIcon,
	UserCircleIcon,
	ClockIcon,
	ChevronRightIcon,
} from "@heroicons/react/outline";

const DepartureCard = ({ departure, t }) => {
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
		<div className="flex flex-col space-y-4 rounded-2xl bg-base-100 py-3 px-5 shadow-2xl">
			{/* Operator Logo/Name and Price */}
			<div className="flex justify-between">
				<img
					src={operatorLogo}
					alt={operatorName}
					className="w-40 md:w-60"
				/>

				<span className="mt-1 text-sm font-bold text-sky-700 md:text-xl">
					{price}
				</span>
			</div>

			{/* Departure and Arrival */}
			<div className="flex flex-col">
				<div className="ml-2 flex space-x-2">
					<UserCircleIcon className="h-10 w-10 text-sky-400 sm:h-6 sm:w-6" />
					<div className="flex space-x-3">
						<span className="text-sm font-semibold text-sky-700 md:text-lg">
							{departureTime}
						</span>
						<span className="text-sm font-semibold md:text-lg">
							{from}
						</span>
					</div>
				</div>
				<DotsVerticalIcon className="ml-2 h-6 w-6 text-gray-400" />
				<div className="ml-2 flex space-x-2">
					<LocationMarkerIcon className="h-10 w-10 text-slate-500 sm:h-6 sm:w-6" />
					<div className="flex space-x-3">
						<span className="text-sm font-semibold text-slate-500 md:text-lg">
							{arrivalTime}
						</span>
						<span className="text-sm font-semibold text-slate-500 md:text-lg">
							{to}
						</span>
					</div>
				</div>
			</div>

			{/* Duration and Select button */}
			<div className="flex justify-between">
				<div className="flex space-x-1 py-2 pt-4">
					<ClockIcon className="h-6 w-6 text-slate-500" />
					<span className="self-center text-sm font-semibold text-slate-500 md:text-lg">
						{duration}
					</span>
				</div>
				<button
					className="lg:bnt-lg btn border-none bg-gray-300 hover:bg-gray-400 md:btn-md md:bg-orange-600  md:hover:bg-orange-400"
					onClick={() => window.open(busbudUrl, "_blank")}
				>
					<span className="hidden md:inline">{t("select")}</span>
					<ChevronRightIcon className="h-6 w-7 text-white md:hidden" />
				</button>
			</div>
		</div>
	);
};

export default DepartureCard;
