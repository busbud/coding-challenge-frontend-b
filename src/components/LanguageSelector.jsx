import { ChevronDownIcon, TranslateIcon } from "@heroicons/react/outline";

const LanguageSelector = ({ i18n, handleSearch, setDepartures }) => {
	const handleChange = (e, lang) => {
		i18n.changeLanguage(lang);
		setDepartures([]);
		handleSearch(e, lang);
	};

	return (
		<div className="ml-auto mr-20 mt-6 dropdown dropdown-end">
			<div
				className="flex space-x-2 btn btn-sm btn-outline text-sky-700 hover:bg-sky-700 hover:bg-transparent hover:border-sky-700"
				tabIndex="0"
			>
				<TranslateIcon className="w-6 h- place-self-center" />
				<ChevronDownIcon className="w-4 h-4 place-self-center" />
			</div>

			<ul
				tabIndex="0"
				className="dropdown-content menu p-2 shadow rounded-lg bg-base-100 w-52"
			>
				<li
					onClick={(e) => handleChange(e, "en")}
					className={i18n.language === "en" && "bg-sky-400"}
				>
					<span>English</span>
				</li>
				<li
					onClick={(e) => handleChange(e, "fr")}
					className={i18n.language === "fr" && "bg-sky-400"}
				>
					<span>Français</span>
				</li>
			</ul>
		</div>
	);
};

export default LanguageSelector;
