import { push } from 'connected-react-router';

export const goToLanguage = (languageId: string) => push(`/${languageId}`);
