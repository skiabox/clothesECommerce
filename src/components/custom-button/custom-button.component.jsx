import React from 'react';

//import './custom-button.styles.scss';

import { CustomButtonContainer } from './custom-button.styles';

//CustomButton with 3 possible states
const CustomButton = ({ children, ...props }) => <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;

export default CustomButton;
