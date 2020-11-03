const dark = {
  primary: '#1C1C1C',
  primaryShade1: '#2b2b2b',
  primaryShade2: '#4C4C4C',
  secondary: '#FFFFFF',
  secondaryShade1: '#F4F4F4',
  secondaryShade2: '#E6E6E6',
  highlight: '#53fafc',
  mainGradient: 'linear-gradient(180deg, rgba(93,251,253,0.30) 14%, rgba(217,102,106,0.40) 39%, rgba(227,123,91,0.20) 65%, rgba(0,0,0,0.00) 100%)',
};

const light = {
  primary: '#FFFFFF',
  primaryShade1: '#F4F4F4',
  primaryShade2: '#E6E6E6',
  secondary: '#000000',
  secondaryShade1: '#1C1C1C',
  secondaryShade2: '#2B2B2B',
  highlight: '#2EC4B6',
  mainGradient: 'linear-gradient(180deg, rgba(93, 251, 253, 0.30) 14%, rgba(217, 102, 106, 0.40) 39%, rgba(227, 123, 91, 0.20) 65%, rgba(0, 0, 0, 0.00) 100%)',
};

export const themeValues = { dark, light };

function theme(themeStyle) {
  return {
    colors: {
      ...themeValues[themeStyle],
      transparent: 'transparent',
      danger: '#FF0000',
      warning: '#FFFF00',
      success: '#00FF00',
      info: '#0000FF',
    },
    mainBoxShadow: '0 16px 32px 0 rgba(0,0,0,0.10), 0 6px 13px 0 rgba(0,0,0,0.07), 0 3px 7px 0 rgba(0,0,0,0.06), 0 2px 4px 0 rgba(0,0,0,0.05), 0 1px 2px 0 rgba(0,0,0,0.04), 0 0 0 0 rgba(0,0,0,0.03)',
  };
}

export default theme;
