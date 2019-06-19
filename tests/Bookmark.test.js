import React from 'react';
import { shallow } from 'enzyme';

import { Bookmark } from '../src/components/articles/Bookmark';

describe('Tests for Profile Component with field update', () => {
  it('Should bookmark article successfully', () => {
    const props = {
      onClick: jest.fn(),
      bookmarkArticle: jest.fn(),
      unbookmarkArticle: jest.fn(),
      setBookmarked: jest.fn(),
    };
    const newComp = shallow(<Bookmark {...props} />);

    const bookmarkBtn = newComp.find('#bookmarkBtn');

    bookmarkBtn.simulate('click');
  });

  it('Should fail bookmark article if own article', () => {
    const props = {
      bookmarked: { error: 'You cannot bookmark your own article' },
      onClick: jest.fn(),
      bookmarkArticle: jest.fn(),
      unbookmarkArticle: jest.fn(),
      setBookmarked: jest.fn(),
    };
    const newComp = shallow(<Bookmark {...props} />);

    const bookmarkBtn = newComp.find('#bookmarkBtn');

    bookmarkBtn.simulate('click');
  });
});
