
/**
 * getTranslation(): get an object with the translations based on the param
 *  fallbacks to 'en' language
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
        case 'fr': 
            return {
                welcomeText: 'Bienvenue !'
            };
        default:
            return {
                welcomeText: 'Welcome !'
            };
    }
};

/**
 *  translater() is the reducer here, use it to init or 'load' proper translation
 **/
const translater = (state = {lang: 'en', translations: {}}, action) => {
    switch (action.type) {
        case 'TOGGLE_LANG':
            return {
                lang: action.lang,
                translations: getTranslation(action.lang)
            };
        default:

            //try to guess the default language based on the browser prefs
            if (typeof navigator !== 'undefined') {
                var userLang = navigator.language || navigator.userLanguage;
                if (userLang && 'string' === typeof userLang && userLang.length >= 2) {
                    //ensure we have the proper lang format
                    //and save the lang in the default state lang property
                    state.lang = userLang.substr(0, 2).toLowerCase(); 
                }
            }

            //init translations using the state 
            state.translations = getTranslation(state.lang);
            return state;
    }
};

export default translater;