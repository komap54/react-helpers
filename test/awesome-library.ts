import MainClass from '../src/awesome-library';

/**
 * Main test
 */
describe('Main test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('MainClass is instantiable', () => {
    expect(new MainClass()).toBeInstanceOf(MainClass);
  });
});
