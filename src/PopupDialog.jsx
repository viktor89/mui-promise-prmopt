import React from 'react';
import { Button, DialogActions, DialogTitle } from '@material-ui/core';
import * as PropTypes from 'prop-types';

const PopupDialog = ({ onSubmit, onClose, title }) => {
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button color="primary" onClick={onSubmit}>
          YES
        </Button>
        <Button color="primary" onClick={onClose} autoFocus>
          CANCEL
        </Button>
      </DialogActions>
    </>
  );
};

PopupDialog.defaultProps = {
  title: 'Are you sure?',
};

PopupDialog.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopupDialog;
