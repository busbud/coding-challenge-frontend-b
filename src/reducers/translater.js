
/**
 * getTranslation(): get an object with the translations based on the param
 *  fallbacks to 'EN' language
 *  
 *  The translations file should be fetched remotely only when needed to optimize 
 *  the app performance and reduce the js file size. Also, single translation files 
 *  would allow non-technical people to work on them, separately.
 *  However, since this microsite contains really few translatable labels, loading them
 *  from a remote server would lower the app performances.
 *  That is why we have the translations hardcoded here. 
 **/
const getTranslation = (lang) => {

    switch(lang) {
        case 'FR': 
            return {
                welcomeText: 'Rendez-vous au festival Osheaga cet été !',
                poweredBy: 'Propulsé par',
                select: 'Sélectionner',
                sortBy: 'Classer par',
                sortBydepartureDate: 'Heure de départ',
                sortByprice: 'Prix',
                sortBycompany: 'Compagnie de bus',
            };
        default:
            return {
                welcomeText: 'Let\'s go to the Osheaga festival this summer !',
                poweredBy: 'Powered by',
                select: 'Select',
                sortBy: 'Sort by',
                sortBydepartureDate: 'Departure time',
                sortByprice: 'Price',
                sortBycompany: 'Bus company',
            };
    }
};

/**
 *  translater() is the reducer here, use it to init or 'load' proper translation
 **/
const translater = (state = {lang: 'EN', translations: {}}, action) => {
    switch (action.type) {
        case 'TOGGLE_LANG':
            return {
                lang: action.lang,
                translations: getTranslation(action.lang)
            };
        default:

            if (!state.translations || Object.keys(state.translations).length == 0) {
                //try to guess the default language based on the browser prefs
                if (typeof navigator !== 'undefined') {
                    var userLang = navigator.language || navigator.userLanguage;
                    if (userLang && 'string' === typeof userLang && userLang.length >= 2) {
                        //ensure we have the proper lang format
                        //and save the lang in the default state lang property
                        state.lang = userLang.substr(0, 2).toUpperCase(); 
                    }
                }

                //init translations using the state 
                state.translations = getTranslation(state.lang);
            }

            return state;
    }
};

export default translater;