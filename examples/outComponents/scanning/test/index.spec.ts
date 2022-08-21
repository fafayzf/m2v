import path from 'path';
import simulate from 'miniprogram-simulate';

describe('scanning', () => {
  let components = `Zmscanning`
  components = simulate.load(
    path.resolve(__dirname, '../../scanning/index'),
    'zm-scanning',
    {
      rootPath: path.resolve(__dirname, '../../'),
    }
  );

  test('should event', async () => {
    expect(components)
  });
});

