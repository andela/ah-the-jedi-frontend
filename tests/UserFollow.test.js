import React from 'react';
import { shallow } from 'enzyme';
import Follows from '../src/components/follows/Follows';

describe.only('Unit tests for Follows Component', () => {
  const wrapper = shallow(<Follows />);

  it('renders with', () => {
    const followsDiv = wrapper.find('.proile-rating');
    expect(followsDiv).toHaveLength(1);
  });
});
