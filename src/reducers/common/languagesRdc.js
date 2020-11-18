const languages = [
  {
    code: 'en',
    title: 'English',
  },
  {
    code: 'fr',
    title: 'Français',
  }
];

export function getLanguagesReducer(state = languages, action) {
  return state;
}
