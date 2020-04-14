import React from 'react';
import { Button, DialogActions, DialogTitle } from '@material-ui/core';
import * as PropTypes from 'prop-types';

const PopupDialog = ({
  onSubmit,
  onClose,
  title
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DialogTitle, null, title), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    onClick: onSubmit
  }, "YES"), /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    onClick: onClose,
    autoFocus: true
  }, "CANCEL")));
};

PopupDialog.defaultProps = {
  title: 'Are you sure?'
};
PopupDialog.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
export default PopupDialog;