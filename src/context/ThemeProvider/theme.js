const dark = {
  primary: '#1C1C1C',
  primaryShade1: '#2b2b2b',
  primaryShade2: '#4C4C4C',
  secondary: '#FFFFFF',
  secondaryShade1: '#F4F4F4',
  secondaryShade2: '#E6E6E6',
  highlight: '#53fafc',
};

const light = {
  primary: '#FFFFFF',
  primaryShade1: '#F4F4F4',
  primaryShade2: '#E6E6E6',
  secondary: '#000000',
  secondaryShade1: '#1C1C1C',
  secondaryShade2: '#2B2B2B',
  highlight: '#2EC4B6',
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
  };
}

export default theme;
