import React from 'react';
import InlineEditable from 'react-inline-editable-field';

export const InlineField = (key, isProfOwner, placeHolder = '', content = '', field = '') => {
  const inline = (
    <InlineEditable
      content={content}
      inputType="textarea"
      displayPlaceholder={placeHolder}
      onBlur={(val, isChanged) => {
        this.updateListing(isChanged, key, val);
      }}
      style={{ width: '200px' }}
      inputStyle={{ width: '150px' }}
      className="customClassName"
    />
  );

  return isProfOwner ? inline : field(placeHolder);
};
