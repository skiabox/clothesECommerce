import React from 'react';

import './form-input.styles.scss';

// handleChange will bublle up the event (otherProps : name, type, value, required)
// otherProps.value.length starts with the value of zero (false), when the form first loads itself
// and it increases as we start typing into the fields
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
    {/*console.log(
      otherProps,
      typeof otherProps,
      otherProps.value,
      otherProps.value.length
    )*/}
    {label ? (
      <label
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
