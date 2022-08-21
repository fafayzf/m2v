import path from 'path';
import simulate from 'miniprogram-simulate';

describe('nav-bar', () => {
  let components = `Zmnav-bar`
  components = simulate.load(
    path.resolve(__dirname, '../../nav-bar/index'),
    'zm-nav-bar',
    {
      rootPath: path.resolve(__dirname, '../../'),
    }
  );

  test('should event', async () => {
    expect(components)
  });
});

