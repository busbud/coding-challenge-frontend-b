import { ChevronDownIcon, TranslateIcon } from "@heroicons/react/outline";

const LanguageSelector = ({ i18n, handleLanguageChange }) => {
	return (
		<div className="dropdown dropdown-end ml-auto mr-20 mt-6">
			<div
				className="btn btn-outline btn-sm flex space-x-2 text-sky-700 hover:border-sky-400 hover:bg-sky-400"
				tabIndex="0"
			>
				<TranslateIcon className="h- w-6 place-self-center" />
				<ChevronDownIcon className="h-4 w-4 place-self-center" />
			</div>

			<ul
				tabIndex="0"
				className="dropdown-content menu w-52 rounded-lg bg-base-100 p-2 shadow"
			>
				<li
					onClick={(e) => handleLanguageChange(e, "en")}
					className={i18n.language === "en" && "bg-sky-400"}
				>
					<span>English</span>
				</li>
				<li
					onClick={(e) => handleLanguageChange(e, "fr")}
					className={i18n.language === "fr" && "bg-sky-400"}
				>
					<span>Français</span>
				</li>
			</ul>
		</div>
	);
};

export default LanguageSelector;
