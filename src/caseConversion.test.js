import snakeToCamel from './caseConversion';

describe('snakeToCamel()', () => {
  it('converts a string from snake_case to camelCase', () => {
    expect(snakeToCamel('foo_bar_baz_quux')).toEqual('fooBarBazQuux');
  });

  it('ignores spaces', () => {
    expect(snakeToCamel('foo_bar baz_quux')).toEqual('fooBar bazQuux');
  });

  it('ignores dashes', () => {
    expect(snakeToCamel('foo_bar-baz_quux')).toEqual('fooBar-bazQuux');
  });
});
