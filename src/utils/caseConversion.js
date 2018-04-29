const snakeToCamel = (str) => {
  return str.replace(/_\w/g, match => match[1].toUpperCase());
};

export default snakeToCamel;
