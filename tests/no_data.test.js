import mergeOpenApiWatchgod from '../src/index.js'

test('all empty arrays should return an empty array', () => {
    expect(mergeOpenApiWatchgod([], [], [], [])).toMatchObject([]);
});
