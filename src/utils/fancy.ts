
type Theme = {
  bg: string; // Background
  t: string; // Typography
};

const gold: Theme = {
  bg: '#F1D3A1',
  t: '#252b31'
};

const beige: Theme = {
  bg: '#E3DBD9',
  t: '#252b31'
}

const light: Theme = {
  bg: '#e6eff6',
  t: '#548999'
}

const teal: Theme = {
  bg: '#89b4c4',
  t: '#252b31'
}

const marine: Theme = {
  bg: '#548999',
  t: '#FFF'
}

const colors = [gold, beige, light, teal, marine];

export const getRandomColor = () => colors[generateRandom(0, colors.length - 1)];

export const generateRandom = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;