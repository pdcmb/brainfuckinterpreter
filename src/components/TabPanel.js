import React from 'react'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types';

export default function TabPanel(props) {
    const { children, value, index, ...rest } = props;
    if(value === index)
        return (<Box {...rest}>{children}</Box>)
    else return ''
        
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
