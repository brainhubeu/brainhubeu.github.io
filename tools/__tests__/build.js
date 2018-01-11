const parseJsonMLFactory = require('../build').parseJsonMLFactory;

describe('jsonMLFactory', () => {
  it('should create a function', () => {
    const config = {
      username: 'testUser',
    };
    expect(typeof parseJsonMLFactory(config)).toBe('function');
  });
});

describe('jsonML parser', () => {
  let parseJsonML;

  beforeEach(() => {
    const config = {
      username: 'brainhubeu',
    };
    parseJsonML = parseJsonMLFactory(config);
  });

  it('should return empty intial state when run on empty array', () => {
    expect(parseJsonML([])).toEqual({ external: [], internal: [] });
  });

  it('should correctly find external and internal projects from links', () => {
    const jsonML = ['article',
      [
        'p',
        'Open source projects developed by our team:',
      ],
      [
        'ul',
        [
          'li',
          [
            'p',
            [
              'a',
              {
                title: null,
                href: 'https://github.com/brainhubeu/react-permissible',
              },
              'react-permissible',
            ],
            ' - Making the permission management for React components easier.',
          ],
        ],
      ],
      [
        'p',
        'You can check other open-source projects supported/developed by our teammates:',
      ],
      [
        'ul',
        [
          'li',
          [
            'p',
            [
              'a',
              {
                title: null,
                href: 'https://github.com/Lukasz-pluszczewski/mi18n',
              },
              'mi18n',
            ],
            ' - MINTernationalization - i18n made easy',
          ],
        ],
      ],
      [
        'li',
        [
          'p',
          [
            'a',
            {
              title: null,
              href: 'https://github.com/Lukasz-pluszczewski/redux-better-promise',
            },
            'redux-better-promise',
          ],
          ' - Simple and powerful redux middleware that supports async side-effects',
        ],
      ],
    ];

    expect(parseJsonML(jsonML)).toEqual({
      external: [
        'https://github.com/Lukasz-pluszczewski/mi18n',
        'https://github.com/Lukasz-pluszczewski/redux-better-promise'
      ],
      internal: ['https://github.com/brainhubeu/react-permissible'],
    });
  });
});
