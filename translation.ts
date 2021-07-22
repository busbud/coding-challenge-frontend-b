type Translation = {
	FIND_DEPARTURES: string;
	SELECT_YOUR_PREFERENCES: string;
	NO_DATA_FOUND: string;
};
type TranslationType = { [key: string]: Translation };

const translation: TranslationType = {
	en: {
		FIND_DEPARTURES: 'Find Departures',
		SELECT_YOUR_PREFERENCES: 'Select your preferences',
		NO_DATA_FOUND: 'No Data Found',
	},
	tr: {
		FIND_DEPARTURES: 'Bilet Ara',
		SELECT_YOUR_PREFERENCES: 'Kriterlerinizi secin',
		NO_DATA_FOUND: 'Hiç sefer bulunamadı',
	},
};

export default translation;
