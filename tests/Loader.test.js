import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../src/components/layout/Loader';

describe.only('Unit tests for Loader Component', () => {
  const wrapper = shallow(<Loader />);

  it('renders with', () => {
    const loaderAnchor = wrapper.find('.intro-banner-vdo-play-btn');
    expect(loaderAnchor).toHaveLength(1);
  });
});
