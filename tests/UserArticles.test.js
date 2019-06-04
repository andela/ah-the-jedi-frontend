import React from 'react';
import { shallow } from 'enzyme';
import UserArticles from '../src/components/articles/UserArticles';

describe.only('Unit tests for UserArticles Component', () => {
  const wrapper = shallow(<UserArticles />);

  it('renders with 6 cards', () => {
    const cards = wrapper.find('.card');
    expect(cards).toHaveLength(6);
  });
});
