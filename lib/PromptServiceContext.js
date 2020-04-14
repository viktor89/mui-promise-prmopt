function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { createContext, useReducer, useState, useEffect, useContext } from 'react';
import * as PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import PopupDialog from './PopupDialog';
import reducer from './reducer';
const Transition = React.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/React.createElement(Slide, _extends({
    direction: "up",
    ref: ref
  }, props));
});
const PromptServiceContext = createContext(); // Hook

export const usePrompt = options => {
  const context = useContext(PromptServiceContext);
  return context({ ...options
  });
}; // HOC

export const withPrompt = options => WrappedComponent => {
  const WithPrompt = ({ ...props
  }) => {
    const prompt = usePrompt(options);
    return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, props, {
      prompt: prompt
    }));
  };

  return WithPrompt;
}; // Provider

export const PromptServiceProvider = ({
  children,
  defaultOptions
}) => {
  const [queue, dispatch] = useReducer(reducer, []);
  const [isDialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    setDialogOpen(!!queue[0]);
  }, [queue]);

  const onPrompt = (options = {}) => {
    return (overrides = {}) => {
      const derivedOptions = { ...defaultOptions,
        ...options,
        ...overrides
      };
      setDialogOpen(true);

      if (derivedOptions.promise) {
        return new Promise((resolve, reject) => {
          dispatch({
            type: 'ADD_TO_QUEUE',
            payload: { ...derivedOptions,
              resolve,
              reject
            }
          });
        });
      }

      dispatch({
        type: 'ADD_TO_QUEUE',
        payload: { ...derivedOptions
        }
      });
      return true;
    };
  };

  const handleClose = (...values) => {
    setDialogOpen(false);

    if (queue[0]?.promise) {
      queue[0].reject(...values);
    }
  };

  const handleSubmit = (...values) => {
    setDialogOpen(false);

    if (queue[0]?.promise) {
      queue[0].resolve(...values);
    }
  };

  const [{
    Component,
    resolve,
    reject,
    dialogProps,
    ...props
  } = {}] = queue;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PromptServiceContext.Provider, {
    value: onPrompt
  }, children), Component && /*#__PURE__*/React.createElement(Dialog, _extends({}, dialogProps, {
    open: isDialogOpen,
    onExited: () => dispatch({
      type: 'RESOLVE_QUEUE_ITEM'
    }),
    onClose: handleClose
  }), /*#__PURE__*/React.createElement(Component, _extends({
    onSubmit: handleSubmit,
    onClose: handleClose
  }, props))));
};
PromptServiceProvider.defaultProps = {
  defaultOptions: {
    dialogProps: {
      size: 'xs',
      TransitionComponent: Transition,
      fullWidth: true
    },
    promise: false,
    priority: 'normal',
    Component: PopupDialog
  }
};
PromptServiceProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  defaultOptions: PropTypes.shape({
    dialogProps: PropTypes.shape({
      size: PropTypes.oneOf(['xs', 'md', 'lg', 'xl', 'sm']),
      TransitionComponent: PropTypes.object,
      fullWidth: PropTypes.bool
    }),
    promise: PropTypes.bool,
    priority: PropTypes.oneOf(['normal', 'high']),
    Component: PropTypes.func
  })
};