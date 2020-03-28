import React from 'react';

//import './form-input.styles.scss';
import { GroupContainer, FormInputContainer, FormInputLabel } from './form-input.styles';

// handleChange will bublle up the event (otherProps : name, type, value, required)
// otherProps.value.length starts with the value of zero (false), when the form first loads itself
// and it increases as we start typing into the fields
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <GroupContainer>
    <FormInputContainer onChange={handleChange} {...otherProps} />
    {/*console.log(
      otherProps,
      typeof otherProps,
      otherProps.value,
      otherProps.value.length
    )*/}
    {label ? (
      <FormInputLabel className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
