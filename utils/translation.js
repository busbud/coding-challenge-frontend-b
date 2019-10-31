import en from '../translations/en';
import fr from '../translations/fr';

export const getTransaltion = (key, language) => {
  return language ? 
            language.startsWith('fr') ?  
                fr[key] : en[key] : '';
}